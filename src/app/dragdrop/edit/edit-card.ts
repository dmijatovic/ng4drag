
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.html',
  styleUrls: ['./edit-card.scss']
})
export class EditCard implements OnInit, OnDestroy {
  //local vars
  show:boolean=false;
  cardTitle="Edit item";
  editItem$:Subscription;

  //all received data
  data:any;
  //item
  item:any;

  constructor(
    private store:DragDropStore,
    private event: DragDropEvents
  ){}

  ngOnInit(){
    this.editItem$ = this.event.editItem$
    .subscribe((d:any) =>{
      //debugger
      this.dataToProps(d);
      this.show = true;
    });
  }

  dataToProps(d){
    //debugger
    this.cardTitle = d.groupName;
    this.data = d;
    this.item = d.item;
  }

  toggleVisibility(){
    //show/hide toggle request
    this.show = !this.show;
    //debugger
    if (this.show==true){
      window.document.body.style.overflowY="hidden";
    }else{
      window.document.body.style.overflowY="";
    }
  }

  onCancel(){
    this.toggleVisibility();
  }

  onSave(data){
    console.log("Save item data...", data);
    this.toggleVisibility();
  }

  ngOnDestroy(){
    this.editItem$.unsubscribe();
  }

}
