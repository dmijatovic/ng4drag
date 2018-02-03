import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEventsRule } from '../dragdrop.events';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rule-drop-item',
  templateUrl: './drop-item.html',
  styleUrls: ['./drop-item.scss']
})
export class DropItem {
  @Input() group:number;
  @Input() groupId:string;
  @Input() groupName:string;

  dragStart$:Subscription;
  canDrop:boolean=true;

  constructor(
    private store:DragDropStore,
    private drag:DragDropEventsRule
  ){}

  ngOnInit(){
    this.dragStart$ = this.drag.dragStart$
    .subscribe((d:any)=>{
      if (this.groupName == d.groupName){
        console.log("canDrop...true");
        this.canDrop = true;
      }else{
        console.log("canDrop...false");
        this.canDrop = false;
      }
    })
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
    //get data
    let data = JSON.parse(e.dataTransfer.getData("json"));
    //console.log("onDrop...drop-item", data);
    //create new group
    this.store.addItemToGroup(this.group, data);
    //remove active class
    e.target.classList.remove("active");
    e.target.classList.remove("no-drop");
  }
}
