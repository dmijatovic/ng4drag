import { Component, Input } from '@angular/core';


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
          groupId: this.groupId,
          groupName: this.groupName,
          field: field[0]
        }
        debugger
        e.dataTransfer.setData("json",JSON.stringify(data));
        e.target.id = data.field.id;

        e.target.style.color="black";
        console.log("dragStart...", data);

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
    console.log("dragEnd...", e);
  }
  ngOnDestroy(){}
}
