import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropApi } from './dragdrop.api';
import { DragDropStore } from './dragdrop.store';
import { DragDropEvents } from './dragdrop.events';

import {
  EditCard,
  FieldsCard, FieldsGroup,
  RuleCard, RuleGroup, RuleItem, DropGroup, DropItem
} from './index';


@NgModule({
  declarations: [
    EditCard,
    FieldsCard, FieldsGroup,
    RuleCard, RuleGroup, RuleItem, DropGroup, DropItem
  ],
  imports: [
    CommonModule
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
