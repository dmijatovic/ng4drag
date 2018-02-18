import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';
//import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rule-drop-item',
  templateUrl: './drop-item.html',
  styleUrls: ['./drop-item.scss']
})
export class DropItem {
  //item path
  @Input() parentPath=[];
  //item index
  @Input() index:number;
  //@Input() path=[];
  @Input() groupId:string;
  @Input() groupName:string;
  @Input() canDrop:boolean=true;

  constructor(
    private store:DragDropStore,
    private dndSvc:DragDropEvents
  ){}
  /*
  ngOnChanges(data){
    //console.log("OnChanges...item...", data);
    //path calculation need to be performed
    //on each data change/update (not to miss deletion)
    //at this point the data is already changed in props
    //so we can just use new prop values
    this.setPath();
    //console.log("drop-item...path...", this.path);
  }*/
  /**
   * Determine component position in tree structure
   * note! this information is used for crud operations
  setPath(){
    try{
      this.path = [
        ...this.parentPath,
        this.index
      ]
    }catch(e){
      debugger
      console.error(e);
    }
  }*/
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
    /* do we need this?
    //e.preventDefault();
    let data={
      path: [...this.parentPath, this.index],
      index: this.index
    }
    //console.log("dragover drop-item...", data);
    //this.canDrop = true;
    this.dndSvc.setDragOverItem(data);
    */
  }

  onDrop(e){
    //we need to prevent default in order to allow drop
    e.preventDefault();
    //debugger
    //get data
    let data = JSON.parse(e.dataTransfer.getData("text"));
    //console.log("onDrop...drop-item...", data, this.path);
    //decide what action to apply to droppet data
    this.reducer(data);
  }

  reducer(data){
    //debugger
    switch (data.action.toUpperCase()){
      case "ADD_ITEM":
        //create new group
        this.addItem(data);
        break;
      case "MOVE_ITEM":
        //move item
        this.moveItem(data);
        break;
      case "MOVE_GROUP":
        this.moveGroup(data);
        break;
      default:
        console.warn(`drop-item.reducer...unknown action...${data.action}...defined in dropped data`);
    }
  }
  addItem(data){
    //debugger
    this.dndSvc.setEditItem({
      action:"ADD_ITEM",
      //at this location
      parentPath: this.parentPath,
      groupId: this.groupId,
      groupName: this.groupName,
      field: {
        ...data.field,
        //add position and path
        index: this.index,
        path: [...this.parentPath, this.index],
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
   */
  moveItem(data){
    //debugger
    let all = this.store.moveItemToPath({
      path: [...this.parentPath, this.index],
      item: data.field
    });
    //publish changes
    this.store.publish(all);
    //notify that complete dnd process is completed
    //when moving items this the last action to be
    //performed in drag&drop action chain
    this.dndSvc.setDragEndItem(true);
  }
  /**
   * Move group into an item
   * @param data
   */
  moveGroup(data){
    //console.log("Move group...", data);
    //debugger
    let all = this.store.moveItemToPath({
      path: [...this.parentPath, this.index],
      item: {
        path: data.path,
        id: data.groupId,
        name: data.groupName,
        parentPath: data.parentPath,
        fieldType: data.fieldType,
        fields: data.fields
      }
    });
    //publish changes
    this.store.publish(all);
    //notify that complete dnd process is completed
    //when moving items this the last action to be
    //performed in drag&drop action chain
    this.dndSvc.setDragEndItem(true);
  }

  ngOnDestroy(){

  }
}
