import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rule-item',
  templateUrl: './item.html',
  styleUrls: ['./item.scss']
})
export class RuleItem implements OnInit, OnDestroy{
  @Input() canDrop:boolean=false;
  @Input() group:number;
  @Input() groupId:string;
  @Input() groupName:string;
  @Input() index:number;
  @Input() field:any;

  showDrop:boolean=false;
  dragOverItem$:Subscription;
  dragEndItem$:Subscription;


  constructor(
    private store: DragDropStore,
    private dndSvc: DragDropEvents
  ){}

  ngOnInit(){
    this.listenForDragEndItem();
    this.listenForDragoverItem();
  }
  listenForDragoverItem(){
    this.dragOverItem$ = this.dndSvc.dragOverItem$
    .subscribe((d:any)=>{
      //filter out request for me
      if (d.index == this.index && d.group == this.group){
        //console.log("I received dragover request over me", d);
        this.showDrop = true;
      }else{
        this.showDrop = false;
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
      //console.log("listenForDragEndItem...showDrop...set to false");
      this.showDrop = false;
    });
  }

  editMe(){
    //console.log("Edit...", this.field.id, this.group, this.index);
    //debugger
    this.dndSvc.setEditItem({
      action:"EDIT_ITEM",
      group: this.group,
      groupId: this.groupId,
      groupName: this.groupName,
      field:{
        ...this.field,
        index: this.index
      }
    });

  }

  deleteMe(){
    console.log("Delete...", this.field.id, this.group, this.index);
    this.store.deleteItem(this.group, this.index);
  }

  onDragStartItem(e){
    console.log("dragstart item...", this.group,"...", this.index);
    //let group = this.store.getGrops()[this.group];
    //debugger
    let data = {
      action:"MOVE_ITEM",
      group: this.group,
      groupId: this.groupId,
      groupName: this.groupName,
      field: {
        ...this.field,
        index: this.index
      }
    }
    //debugger
    e.dataTransfer.setData("text",JSON.stringify(data));
    //set item dragstart event
    this.dndSvc.setDragStartItem(data);
  }
  /* fire dragover event over specific item */
  onDragOverItem(e){
    e.preventDefault();
    let data={
      group: this.group,
      index: this.index
    }
    //console.log("dragover item...", data);
    //this.canDrop = true;
    this.dndSvc.setDragOverItem(data);
  }
  /**
   * onDragEndItem does not trigger dragend event when drop is performed
   * therefore this event is executed from onDrop
   * @param e
   *
   */
  onDragEndItem(e){
    console.log("onDragEndItem...", this.group,"...", this.index);
    //this.dndSvc.setDragEndItem(true);
  }
  ngOnDestroy(){
    this.dragEndItem$.unsubscribe();
    this.dragOverItem$.unsubscribe();
  }
}
