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

}
