import { Component, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import {
  DragDropEventsRule,
  DragDropEventsGroup } from '../dragdrop.events';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Component({
  selector: 'rule-group',
  templateUrl: './group.html',
  styleUrls: ['./group.scss'],
  providers: [ DragDropEventsGroup ]
})
export class RuleGroup {
  @Input() index:number;
  @Input() id:string;
  @Input() name:string="Group name";
  @Input() fields=[];

  open:boolean = true;
  drop:boolean = false;
  dragEnd$:Subscription;

  constructor(
    private store: DragDropStore,
    private ruleEnd: DragDropEventsRule,
    private groupEnd: DragDropEventsGroup
  ){}
  ngOnInit(){

    this.listenForDragEnd();

  }

  listenForDragEnd(){
    this.dragEnd$ = this.ruleEnd.dragEnd$
    .subscribe((d)=>{
      //debugger
      this.drop = !d;
    });
  }

  toggleMe(){
    this.open = !this.open;
  }

  deleteMe(){
    console.log("Delete group...", this.id, this.index);
    this.store.deleteGroup(this.index);
  }

  onDragEnter(e){
    //debugger
    this.drop = true;
  }

  onDragLeave(e){
    //debugger
    //this.drop = false;
  }

  ngOnDestroy(){
    this.dragEnd$.unsubscribe();
  }
}
