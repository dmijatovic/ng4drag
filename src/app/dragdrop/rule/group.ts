import { Component, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';

@Component({
  selector: 'rule-group',
  templateUrl: './group.html',
  styleUrls: ['./group.scss']
})
export class RuleGroup {
  @Input() index:number;
  @Input() id:string;
  @Input() name:string="Group name";
  @Input() fields=[];

  open:boolean = true;

  constructor(
    private store: DragDropStore
  ){}
  ngOnInit(){}
  ngOnDestroy(){}

  toggleMe(){
    this.open = !this.open;
  }

  deleteMe(){

    console.log("Delete group...", this.id, this.index);
    this.store.deleteGroup(this.index);

  }
}
