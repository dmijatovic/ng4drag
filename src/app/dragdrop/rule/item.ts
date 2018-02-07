import { Component, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';

@Component({
  selector: 'rule-item',
  templateUrl: './item.html',
  styleUrls: ['./item.scss']
})
export class RuleItem {
  @Input() group:number;
  @Input() index:number;
  @Input() id:string;
  @Input() name:string;
  @Input() fieldType:string;
  @Input() fieldDescription:string;
  @Input() operators=[];
  @Input() values=[];

  targetIndex:number;

  constructor(
    private store: DragDropStore
  ){}

  editMe(){
    console.log("Edit...", this.id, this.group, this.index);
  }

  deleteMe(){
    console.log("Delete...", this.id, this.group, this.index);

    this.store.deleteItem(this.group, this.index);
  }

  dragStartItem(e){
    console.log("dragstart item...", this.index);
    let group = this.store.getGrops()[this.group];
    //debugger
    let data = {
      groupId: group.id,
      groupName: group.name,
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
    e.dataTransfer.setData("json",JSON.stringify(data));
    e.target.id = data.field.id;
  }

  dragOverItem(e){    
    //console.log("dragover item", this.index);
  }

  dragEndItem(e){
    console.log("dragend item");
  }

}
