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
    console.log("dragEnter...drop-group", e);
    //change background color
    //debugger
    e.target.style.backgroundColor = 'rgba(75, 75, 75, 0.2)';
  }

  onDragLeave(e){
    console.log("dragLeave...drop-group", e);
    //remove background color
    e.target.style.backgroundColor = '';
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
    let data = JSON.parse(e.dataTransfer.getData("json"));
    console.log("onDrop...drop-group", data);
    //create new group
    this.store.addGroup(data);
    //remove background color from drop
    e.target.style.backgroundColor = '';
  }

}
