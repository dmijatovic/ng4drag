import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';

@Component({
  selector: 'rule-drop-item',
  templateUrl: './drop-item.html',
  styleUrls: ['./drop-item.scss']
})
export class DropItem {
  @Input() group:number;
  @Input() groupId:string;
  @Input() groupName:string;

  constructor(
    private store:DragDropStore
  ){}

  onDragEnter(e){
    console.log("dragEnter...drop-item", e);
    //change background color
    //e.preventDefault();
    //debugger
    e.target.style.backgroundColor = 'rgba(175, 175, 175, 0.2)';
    //check if item from same group
  }

  onDragLeave(e){
    console.log("dragLeave...drop-item", e);
    //remove background color
    e.target.style.backgroundColor = '';
  }


  onDragOver(e){
    //we need to prevent default in order to allow drop
    e.preventDefault();
    //console.log("dragOver...drop-item");
  }

  onDrop(e){
    //we need to prevent default in order to allow drop
    e.preventDefault();
    //get data
    let data = JSON.parse(e.dataTransfer.getData("json"));
    console.log("onDrop...drop-item", data);
    //create new group
    this.store.addItemToGroup(this.group, data);
    //remove background color from drop
    e.target.style.backgroundColor = '';
  }

  canBeDropped(d){
    debugger
    if (this.groupId == d.groupId){
      return true;
    }else{
      return false;
    }
  }

}
