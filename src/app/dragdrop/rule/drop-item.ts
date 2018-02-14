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
  @Input() canDrop:boolean=true;

  constructor(
    private store:DragDropStore,
    private dndSvc:DragDropEvents
  ){}

  ngOnInit(){

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
      e.target.classList.add("active");
    }else{
      e.target.classList.add("no-drop");
    }
    //e.preventDefault();
    let data={
      group: this.group,
      index: this.index,
      item: e
    }
    //console.log("dragover drop-item...", data);
    //this.canDrop = true;
    this.dndSvc.setDragOverItem(data);
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
    //e.target.classList.remove("active");
    //e.target.classList.remove("no-drop");
    //publish dragEnd
    //this.dndSvc.setDragEndItem(true);
  }

  reducer(data){
    //debugger
    switch (data.action.toUpperCase()){
      case "ADD_ITEM":
        //create new group
        this.addItem(data);
        break;
      case "MOVE_ITEM":
        //first delete item
        this.moveItem(data);
        break;
      default:
        console.warn(`drop-item.reducer...unknown action...${data.action}...defined in dropped data`);
    }
  }
  addItem(data){
    //this.store.addItemToGroup(this.group, this.index, data);
    //debugger
    this.dndSvc.setEditItem({
      action:"ADD_ITEM",
      group: this.group,
      groupId: this.groupId,
      groupName: this.groupName,
      field: {
        ...data.field,
        index: this.index,
        //new condition
        condition:{
          field:null,
          fieldId:null,
          operator:null,
          value:null
        }
      }
    });
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
        this.store.addItemToGroup({
          group: this.group,
          index: this.index,
          field: data.field
        });
        //delete item
        this.store.deleteItem(data.group, data.field.index);
      }else{
        //delete item
        this.store.deleteItem(data.group, data.field.index);
        //add item
        this.store.addItemToGroup({
          group:this.group,
          index: this.index,
          field: data.field
        });
      }
    }else{
      //different groups
      //delete item
      this.store.deleteItem(data.group, data.field.index);
      //add item
      this.store.addItemToGroup({
        group:this.group,
        index: this.index,
        field: data.field
      });
    }

    //notify that complete dnd process is completed
    //when moving items this the last action to be
    //performed in drag&drop action chain
    this.dndSvc.setDragEndItem(true);
  }

  ngOnDestroy(){

  }
}
