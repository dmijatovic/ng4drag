import { Component, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';

@Component({
  selector: 'rule-item',
  templateUrl: './item.html',
  styleUrls: ['./item.scss']
})
export class RuleItem {
  @Input() group:number;
  @Input() groupId:string;
  @Input() groupName:string;
  @Input() index:number;
  @Input() id:string;
  @Input() name:string;
  @Input() fieldType:string;
  @Input() fieldDescription:string;
  @Input() operators=[];
  @Input() values=[];

  targetIndex:number;
  canDrop:boolean=false;

  constructor(
    private store: DragDropStore,
    private dndSvc: DragDropEvents
  ){}

  editMe(){
    console.log("Edit...", this.id, this.group, this.index);
  }

  deleteMe(){
    console.log("Delete...", this.id, this.group, this.index);

    this.store.deleteItem(this.group, this.index);
  }

  onDragStartItem(e){
    console.log("dragstart item...", this.index);
    //let group = this.store.getGrops()[this.group];
    //debugger
    let data = {
      action:"MOVE_ITEM",
      group: this.group,
      field: {
        id: this.id,
        index: this.index,
        name: this.name,
        fieldType: this.fieldType,
        fieldDescription: this.fieldDescription,
        operators: this.operators,
        values: this.values
      }
    }
    //debugger
    e.dataTransfer.setData("text",JSON.stringify(data));
    e.target.id = data.field.id;
    //set item dragstart event
    this.dndSvc.setDragStartItem(data);
  }
  /* not used
  onDragOverItem(e){
    e.preventDefault();
    console.log("dragover item", this.index, e);
    this.canDrop = true;
  }*/
  /* not used
  onDropItem(e){
    e.preventDefault();
    //get data
    let data = JSON.parse(e.dataTransfer.getData("text"));
    console.log("drop item...at", this.index, e);
    debugger
    if (this.index < data.field.index){
      console.log("insert...", data.field.index,"...before...", this.index, data);
      this.store.moveItemTo(this.group, this.index, data);
    }else{
      console.log("insert...", data.field.index,"...after...", this.index, data);
      this.store.moveItemTo(this.group, this.index, data);
    }
  }*/

  onDragEndItem(e){
    console.log("dragend item");
    this.dndSvc.setDragEndItem(true);
  }

}
