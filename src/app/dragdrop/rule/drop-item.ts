import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rule-drop-item',
  templateUrl: './drop-item.html',
  styleUrls: ['./drop-item.scss']
})
export class DropItem {
  //item index
  @Input() index:number;
  //group index
  @Input() group:number;
  @Input() groupId:string;
  @Input() groupName:string;

  dragStartItem$:Subscription;
  dragEndItem$:Subscription;
  canDrop:boolean=true;

  constructor(
    private store:DragDropStore,
    private dndSvc:DragDropEvents
  ){}

  ngOnInit(){
    this.listenForDragStartItem();
    this.listenForDragEndItem();
  }
  /**
   * Listen when user start draggin field
   * based on groupName we set canDrop flag
   * that indicats if field can be dropped in this group
   */
  listenForDragStartItem(){
    this.dragStartItem$ = this.dndSvc.dragStartItem$
    .subscribe((d:any)=>{
      if (this.groupName == d.groupName){
        //console.log("canDrop...true", d);
        if (d.action=="MOVE_GROUP" && d.group == this.group){
          console.warn("can move group into itself...", this.group);
          this.canDrop = false;
        }else{
          this.canDrop = true;
        }
      }else{
        //console.log("canDrop...false", d);
        this.canDrop = false;
      }
    });
  }
  /**
   * Listen when user start draggin field
   * based on groupName we set canDrop flag
   * that indicats if field can be dropped in this group
   */
  listenForDragEndItem(){
    this.dragEndItem$ = this.dndSvc.dragEndItem$
    .subscribe((d:any)=>{
      //reset to default
      this.canDrop = true;
    });
  }
  onDragEnter(e){
    //console.log("dragEnter...drop-item", e);
    //add class
    if (this.canDrop){
      e.target.classList.add("active");
    }else{
      e.target.classList.add("no-drop");
    }
    //check if item from same group
  }

  onDragLeave(e){
    //console.log("dragLeave...drop-item", e);
    //remove class
    e.target.classList.remove("active");
    e.target.classList.remove("no-drop");
  }

  onDragOver(e){
    //we need to prevent default in order to allow drop
    if (this.canDrop){
      e.preventDefault();
    }
    //console.log("dragOver...drop-item");
  }

  onDrop(e){
    //we need to prevent default in order to allow drop
    e.preventDefault();
    //debugger
    //get data
    let data = JSON.parse(e.dataTransfer.getData("text"));
    //console.log("onDrop...drop-item", data);
    //decide what action to apply to droppet data
    this.reducer(data);
    //remove active class
    e.target.classList.remove("active");
    e.target.classList.remove("no-drop");
  }

  reducer(data){
    //debugger
    switch (data.action.toUpperCase()){
      case "ADD_ITEM":
        //create new group
        this.store.addItemToGroup(this.group, this.index, data);
        break;
      case "MOVE_ITEM":
        //first delete item
        this.moveItem(data);
        break;
      default:
        console.warn(`drop-item.reducer...unknown action...${data.action}...defined in dropped data`);
    }
  }
  /**
   * Move item involves add item at one position
   * and deleting old item from its previous position
   * depending on 'move direction' the order of add/delete is important
   */
  moveItem(data){
    //moving items within same group
    if (data.group == this.group){
      //same group
      if (this.index > data.field.index){
        //add item
        this.store.addItemToGroup(this.group, this.index, data);
        //delete item
        this.store.deleteItem(data.group, data.field.index);
      }else{
        //delete item
        this.store.deleteItem(data.group, data.field.index);
        //add item
        this.store.addItemToGroup(this.group, this.index, data);
      }
    }else{
      //different groups
      //delete item
      this.store.deleteItem(data.group, data.field.index);
      //add item
      this.store.addItemToGroup(this.group, this.index, data);
    }
  }
}
