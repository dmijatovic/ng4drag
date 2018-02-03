import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DragDropStore } from '../dragdrop.store';


@Component({
  selector: 'app-rule-card',
  templateUrl: './rule-card.html',
  styleUrls: ['./rule-card.scss']
})
export class RuleCard implements OnInit, OnDestroy {

  groups=[];
  Groups$:Subscription

  dropZoneGroup:boolean = true;

  constructor(
    private store:DragDropStore
  ){}
  ngOnInit(){
    this.Groups$ = this.store.Groups$
    .subscribe((g:any)=>{
      //debugger
      this.dataToProps(g);
    });
    /*
    if (this.groups.length == 0){
      this.dropZoneGroup = true;
    }*/
  }
  dataToProps(d:any){
    this.groups = d;

    /*
    //after first group is created
    //we hide dropZone. BUT if user
    //dragover we will show it again
    if (this.groups.length > 0){
      this.dropZoneGroup=false;
    }*/
  }

  ngOnDestroy(){
    this.Groups$.unsubscribe();
  }
}
