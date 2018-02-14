
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
  field:any;

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
    this.field = d.field;
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
    //notify that complete dnd process is completed
    this.event.setDragEndItem(true);
  }

  onSave(item){
    //console.log("Save item data...", item);
    let d = this.prepData(item);
    switch(this.data.action){
      case "ADD_ITEM":
        this.addItem(d);
        break;
      case "EDIT_ITEM":
        this.editItem(d);
        break;
      default:
        console.warn("Action not supported...", this.data.action)
    }
    this.toggleVisibility();
    //notify that complete dnd process is completed
    this.event.setDragEndItem(true);
  }

  prepData(d){
    let data={
      ...this.data,
      field:{
        ...this.data.field,
        condition: d
      }
    }
    //debugger
    return data;
  }

  addItem(d){
    //append condition
    console.log("Add new item...", d);
    this.store.addItemToGroup({
      group: d.group,
      index: d.field.index,
      field: d.field
    });
  }

  editItem(d){
    console.log("Edit item...", d);
    //first delete old item
    this.store.deleteItem(
      d.group,
      d.field.index,
      false //do not delete empty group
    );
    //then add edited item
    this.store.addItemToGroup({
      group: d.group,
      index: d.field.index,
      field: d.field
    });
  }


  ngOnDestroy(){
    this.editItem$.unsubscribe();
  }

}
