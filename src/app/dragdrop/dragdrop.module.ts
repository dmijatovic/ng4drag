import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { DragDropApi } from './dragdrop.api';
import { DragDropStore } from './dragdrop.store';
import { DragDropEvents } from './dragdrop.events';

import {
  EditCard, EditItem,
  FieldsCard, FieldsGroup,
  RuleCard, RuleGroup, RuleItem, DropGroup, DropItem
} from './index';


@NgModule({
  declarations: [
    EditCard, EditItem,
    FieldsCard, FieldsGroup,
    RuleCard, RuleGroup, RuleItem, DropGroup, DropItem
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    EditCard,
    FieldsCard,
    RuleCard
  ],
  providers:[
    DragDropApi,
    DragDropStore,
    DragDropEvents
  ]
})
export class DragDropModule { }
