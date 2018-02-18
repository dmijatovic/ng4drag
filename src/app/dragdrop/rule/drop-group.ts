import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';

@Component({
  selector: 'rule-drop-group',
  templateUrl: './drop-group.html',
  styleUrls: ['./drop-group.scss']
})
export class DropGroup {
  @Input() index:number;
  //path=[];
  constructor(
    private store:DragDropStore,
    private dndSvc:DragDropEvents
  ){}

  ngOnInit(){
    //debugger
    //this.path.push(this.index);
  }

  onDragEnter(e){
    //console.log("dragEnter...drop-group", e);
    //change background color
    //debugger
    //e.target.style.backgroundColor = 'rgba(75, 75, 75, 0.2)';
    e.target.classList.add("active");
    //notify others
    this.dndSvc.setDragEnterGroup({
      id: null,
      index: this.index,
      name: null
    })
  }

  onDragLeave(e){
    //console.log("dragLeave...drop-group", e);
    //remove background color
    //e.target.style.backgroundColor = '';
    //debugger
    e.target.classList.remove("active");
  }

  onDragOver(e){
    //we need to prevent default in order to allow drop
    e.preventDefault();
  }

  onDrop(e){
    //we need to prevent default in order to allow drop
    e.preventDefault();
    //get data
    //debugger
    let data = JSON.parse(e.dataTransfer.getData("text"));
    //console.log("onDrop...drop-group", data);
    //decide on action
    this.reducer(data);
    //remove active class
    e.target.classList.remove("active");
  }
  /**
   * Decide on action to apply based on action type
   * provided in data
   * @param data
   */
  reducer(data){
    //debugger
    switch (data.action.toUpperCase()){
      case "ADD_ITEM":
        this.addItem(data);
        break;
      case "MOVE_ITEM":
        this.moveItem(data);
        break;
      case "MOVE_GROUP":
        this.moveGroup(data);
        break;
      default:
        console.warn(`drop-group.reducer...unknown action...${data.action}...defined in dropped data`);
    }
  }
  /**
   * Creates new group with empty fields collection
   * @param data
   */
  createNewGroup(data){
    //add group first without field
    let all = this.store.addItemToPath({
     path: [this.index],
     item: { //group item type
       id: data.groupId,
       name: data.groupName,
       parentPath: null,
       path: [this.index],
       fieldType: 'Group',
       fields: []
     }
   });
   return all;
  }
  addItem(data){
    //debugger
    let all = this.createNewGroup(data);
    //publish group to be visible & accessible
    this.store.publish(all);
    //activate edit item modal
    this.dndSvc.setEditItem({
      action:"ADD_ITEM",
      //group: this.index,
      parentPath: [ this.index ],
      groupId: data.groupId,
      groupName: data.groupName,
      field: {
        ...data.field,
        //only initial (first) item is edited from here
        index: 0,
        path: [ this.index, 0 ],
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
   * Move item and create group involves two actions
   * add new group and move item from its original group
   * @param data
   */
  moveItem(data){
   //debugger
   let all = this.createNewGroup(data);
   //publish group to be visible & accessible
   this.store.publish(all);
   //move item to new group at first position
   all = this.store.moveItemToPath({
     path: [this.index, 0],
     item: data.field
   });
   //publish
   this.store.publish(all);
   //set drag end
   this.dndSvc.setDragEndItem(true);
  }
  /**
   * Move group from item level to top level
   * or from top level position x to position y
   * @param data
   */
  moveGroup(data){
    //debugger
    //move item
    let all = this.store.moveItemToPath({
      path:[this.index],
      item: {
        id: data.groupId,
        name: data.groupName,
        parentPath: data.parentPath,
        path: data.path,
        fieldType: data.fieldType,
        fields: data.fields
      }
    })
    //publish
    this.store.publish(all);
    //set drag end
    this.dndSvc.setDragEndItem(true);
  }
}
