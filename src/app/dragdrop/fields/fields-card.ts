import { Component, OnInit, OnDestroy } from '@angular/core';

import { DragDropApi } from '../dragdrop.api';

@Component({
selector: 'app-fields-card',
templateUrl: './fields-card.html',
styleUrls: ['./fields-card.scss']
})
export class FieldsCard {
  filters=[];
  constructor(
    private apiFilter:DragDropApi
  ){}
  ngOnInit(){
    this.getFilters();
  }
  getFilters(){
    this.apiFilter.getSegmentFilterList()
    .subscribe((f:any)=>{
      //debugger
      this.filters = f;
    },(e)=>{
      console.error(e);
    });
  }

}
