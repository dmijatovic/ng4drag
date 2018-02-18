
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
    private store: DragDropStore,
    private event: DragDropEvents
  ){}

  ngOnInit(){
    this.editItem$ = this.event.editItem$
    .subscribe((d:any) =>{
      //debugger
      this.dataToProps(d);
      this.toggleVisibility();
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
    //debugger
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
    //console.log("Add new item...", d);
    //debugger
    if (d.field.path.length==0){
      console.error("edit-card.addItem...cannot add item...field.path=undefined");
      return
    }
    let data = this.store.addItemToPath({
      path: d.field.path,
      item: d.field
    });
    //publish changes
    this.store.publish(data);
  }

  editItem(d){
    //console.log("Edit item...", d);
    //debugger
    if (d.field.path.length==0){
      console.error("edit-card.addItem...cannot edit item...field.path=undefined");
      return
    }
    let data = this.store.updateItemAtPath({
      path: d.field.path,
      item: d.field
    });
    //publish changes
    this.store.publish(data);
  }


  ngOnDestroy(){
    this.editItem$.unsubscribe();
  }

}
