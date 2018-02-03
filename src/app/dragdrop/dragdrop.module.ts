import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropApi } from './dragdrop.svc';
import { DragDropStore } from './dragdrop.store';

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
    DragDropStore
  ]
})
export class DragDropModule { }
