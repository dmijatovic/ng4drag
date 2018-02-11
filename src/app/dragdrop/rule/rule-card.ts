import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';


@Component({
  selector: 'app-rule-card',
  templateUrl: './rule-card.html',
  styleUrls: ['./rule-card.scss']
})
export class RuleCard implements OnInit, OnDestroy {

  groups=[];
  Groups$:Subscription

  dragStartField$:Subscription;
  dragEndField$:Subscription;
  dropZoneGroup:boolean = true;

  constructor(
    private store: DragDropStore,
    private dndSvc: DragDropEvents
  ){}
  ngOnInit(){
    this.listenForGroups();
  }
  listenForGroups(){
    this.Groups$ = this.store.Groups$
    .subscribe((g:any)=>{
      //debugger
      this.groups = g;
    });
  }
  onDragEnter(e){
    //console.log("dragEnter...rule-body");
    //this.dropZoneGroup=true;
  }

  ngOnDestroy(){
    this.Groups$.unsubscribe();
  }
}
