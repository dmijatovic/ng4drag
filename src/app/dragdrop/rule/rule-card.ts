import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEventsRule } from '../dragdrop.events';


@Component({
  selector: 'app-rule-card',
  templateUrl: './rule-card.html',
  styleUrls: ['./rule-card.scss']
})
export class RuleCard implements OnInit, OnDestroy {

  groups=[];
  Groups$:Subscription

  dragStart$:Subscription;
  dragEnd$:Subscription;
  dropZoneGroup:boolean = true;

  constructor(
    private store: DragDropStore,
    private drag: DragDropEventsRule
  ){}
  ngOnInit(){
    this.listenForGroups();
    this.listenForDragStart();
    this.listenForDragEnd();
  }
  listenForGroups(){
    this.Groups$ = this.store.Groups$
    .subscribe((g:any)=>{
      //debugger
      this.groups = g;
    });
  }
  listenForDragStart(){
    this.dragStart$ = this.drag.dragStart$
    .subscribe((d)=>{
      //debugger
      console.log("dragStart...", d);
    });
  }
  listenForDragEnd(){
    this.dragEnd$ = this.drag.dragEnd$
    .subscribe((d)=>{
      //debugger
      console.log("dragEnd...", d);
      //only if groups present
    });
  }

  onDragEnter(e){
    //console.log("dragEnter...rule-body");
    //this.dropZoneGroup=true;
  }

  ngOnDestroy(){
    this.Groups$.unsubscribe();
    this.dragEnd$.unsubscribe();
  }
}
