import { Component, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Component({
  selector: 'rule-group',
  templateUrl: './group.html',
  styleUrls: ['./group.scss'],
  //providers: [ DragDropEventsGroup ]
})
export class RuleGroup {
  @Input() index:number;
  @Input() id:string;
  @Input() name:string="Group name";
  @Input() fields=[];

  open:boolean = true;
  //drop:boolean = false;
  dragEndField$:Subscription;

  constructor(
    private store: DragDropStore,
    private dndSvc: DragDropEvents
  ){}
  ngOnInit(){

  }
  toggleMe(){
    this.open = !this.open;
  }

  deleteMe(){
    console.log("Delete group...", this.id, this.index);
    this.store.deleteGroup(this.index);
  }

  onDragStartItem(e){
    console.log("dragstart group...", this.index);
    let data = {
      action:"MOVE_GROUP",
      group: this.index,
      groupId: this.id,
      groupName: this.name,
      field: this.fields
    }
    //debugger
    e.dataTransfer.setData("text",JSON.stringify(data));
    //set item dragstart event
    this.dndSvc.setDragStartItem(data);
  }

  onDragEndItem(e){
    console.log("dragend group...", this.index);
    this.dndSvc.setDragEndItem(true);
  }

  ngOnDestroy(){
    //this.dragEndField$.unsubscribe();
  }
}
