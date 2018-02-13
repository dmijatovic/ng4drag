
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.html',
  styleUrls: ['./edit-item.scss']
})
export class EditItem implements OnInit, OnDestroy {
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Input()
  set item (d){
    //debugger
    if (d){
      //define options
      //debugger
      this.operators = d.operators;
      this.values = d.values;
      this.fieldType = d.fieldType;

      //define item form
      this.itemForm = new FormGroup({
        fieldId: new FormControl(d.id, Validators.required),
        field: new FormControl(d.name, Validators.required),
        operator: new FormControl(null,Validators.required),
        value: new FormControl(null,Validators.required)
      });

      this.data = d;
    }
  };
  //inital object
  itemForm = new FormGroup({
    fieldId: new FormControl(),
    field: new FormControl(),
    operator: new FormControl(),
    value: new FormControl()
  });
  operators=[];
  values=[];
  fieldType:string="";
  data:any;

  constructor(
  ){}

  ngOnInit(){
  }

  onCancel(){
    console.log("Cancel editing item...", this.itemForm.value.field);
    this.cancel.next(true);
  }
  onSave(){
    //console.log("Save item...", this.itemForm.value);
    //emit save request to parent
    this.save.next(this.itemForm.value);
  }

  ngOnDestroy(){

    this.itemForm = null;

  }

}
