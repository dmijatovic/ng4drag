import { Component, OnInit, OnDestroy } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';

@Component({
  selector: 'rule-drop-group',
  templateUrl: './drop-group.html',
  styleUrls: ['./drop-group.scss']
})
export class DropGroup {
  constructor(
    private store:DragDropStore
  ){}

  onDragEnter(e){
    //console.log("dragEnter...drop-group", e);
    //change background color
    //debugger
    //e.target.style.backgroundColor = 'rgba(75, 75, 75, 0.2)';
    e.target.classList.add("active");
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
    //console.log("dragOver...drop-group");
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
        //create new group at the bottom
        this.store.addGroup(data);
        break;
      case "MOVE_ITEM":
        this.moveItem(data);
        break;
      default:
        console.warn(`drop-group.reducer...unknown action...${data.action}...defined in dropped data`);
    }
  }
  /**
   * Move item and create group involves two actions
   * add new group and remove item from its original group
   * @param data
   */
  moveItem(data){
    //create new group at the bottom
    this.store.addGroup(data);
    //delete item from its previous position
    this.store.deleteItem(data.group, data.field.index);
  }
}
