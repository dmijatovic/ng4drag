import { Component, Input } from '@angular/core';

import { DragDropEvents } from '../dragdrop.events';

@Component({
selector: 'app-fields-group',
templateUrl: './fields-group.html',
styleUrls: ['./fields-group.scss']
})
export class FieldsGroup {
  @Input() groupId:string;
  @Input() groupName:string;
  @Input() items=[];

  open:boolean=true;

  constructor(
    //private apiFilter:CustomerSegmentApiService
    private dndSvc:DragDropEvents
  ){}
  ngOnInit(){
  }
  toggleMe(){
    this.open = !this.open;
  }
  /**
   * When user starts dragging field item this function is called
   * we set field information (groupId and field) into dataTransfer of dragged object
   * this data is used than at 'drop' area to add field to definitions
   * @param e
   */
  dragStart(e){
    //debugger
    if (e){
      //get field id from data attribute
      let fieldId = e.currentTarget.dataset.fieldId,
        //get field info
        field = this.items.filter(i => i.id === fieldId);

      if (field.length==1){
        //set drag data
        let data = {
          action:"ADD_ITEM",
          groupId: this.groupId,
          groupName: this.groupName,
          field: field[0]
        }
        //debugger
        //NOTE! type needs to be text to support EDGE data transfer
        e.dataTransfer.setData("text",JSON.stringify(data));
        e.target.id = data.field.id;
        e.target.style.color="black";
        //debugger
        e.dataTransfer.dropEffect="move";
        //console.log("dragStart...", data);
        //publish info
        this.dndSvc.setDragStartField(data);
      }else if(field.length > 1){
        console.error("rb.filter.group...dragStart...field id is not unique...", field);
      }else {
        console.error("rb.filter.group...dragStart...failed to load field definition...", fieldId, field);
      }
    }
  }
  /**
   * End of drag event for this item
   */
  dragEnd(e){
    //e.target.style.fontWeight=500;
    e.target.style.color="";
    console.log("dragEndField...", e);
    //publish
    this.dndSvc.setDragEndField(true);
  }
  ngOnDestroy(){}
}
