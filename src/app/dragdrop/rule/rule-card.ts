import { Component, OnInit, OnDestroy } from '@angular/core';

//import { FormBuilder, FormGroup } from '@angular/forms';

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
  Store$:Subscription

  dragStartItem$:Subscription;
  dragEndItem$:Subscription;

  dropZoneGroup:boolean = true;
  canSave:boolean = false;

  constructor(
    private store: DragDropStore,
    private dndSvc: DragDropEvents,
    //private fb: FormBuilder
  ){}
  ngOnInit(){
    this.listenForGroups();
    this.listenForDragStartItem();
    this.listenForDragEndItem();
  }
  listenForGroups(){
    this.Store$ = this.store.Store$
    .subscribe((g:any)=>{
      //debugger
      this.groups = g;
      this.setCanSave();
    });
  }
  setCanSave(){
    if (this.groups.length  > 0){
      this.canSave = true;
    }else{
      this.canSave = false;
    }
  }
   /**
   * Listen when user start draggin field
   * based on groupName we set canDrop flag
   * that indicats if field can be dropped in this group
   */
  listenForDragStartItem(){
    this.dragStartItem$ = this.dndSvc.dragStartItem$
    .subscribe((d:any)=>{
      //debugger
      this.dropZoneGroup = true;
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
      this.dropZoneGroup = false;
    });
  }
  saveSegment(){
    //debugger
    let x = this.store.extractConditions(this.groups);
    console.log("Save conditions...", x);
  }
  onDragEnter(e){
    //console.log("dragEnter...rule-body");
    //this.dropZoneGroup=true;
  }

  ngOnDestroy(){
    this.Store$.unsubscribe();
    this.dragStartItem$.unsubscribe();
    this.dragEndItem$.unsubscribe();
  }
}
