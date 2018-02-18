import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rule-item',
  templateUrl: './item.html',
  styleUrls: ['./item.scss']
})
export class RuleItem implements OnInit, OnDestroy{
  //group info
  @Input() parentPath=[];
  @Input() groupId:string;
  @Input() groupName:string;
  @Input() canDrop:boolean=false;
  //@Input() index:number;
  //main item data
  @Input() field:any;

  //showDrop:boolean=false;
  //dragOverItem$:Subscription;
  //dragEndItem$:Subscription;

  constructor(
    private store: DragDropStore,
    private dndSvc: DragDropEvents
  ){}


  ngOnInit(){
    //this.listenForDragEndItem();
    //this.listenForDragoverItem();
  }

  ngOnChanges(data){
    //console.log("OnChanges...item...", data);
    //path calculation need to be performed
    //on each data change/update (not to miss deletion)
    //at this point the data is already changed in props
    //so we can just use new prop values
    //this.setPath(data);
  }

  /**
   * Determine component position in tree structure
   * note! this information is used for crud operations

  setPath(data){
    //debugger
    if (this.parent){
      this.field.path =[
        ...this.parent,
        this.index
      ]
    }else{
      console.warn("item has no parent prop...",data)
    }
  }*/
  /* moved into group
  listenForDragoverItem(){
    this.dragOverItem$ = this.dndSvc.dragOverItem$
    .subscribe((d:any)=>{
      //debugger
      if (d.path == this.field.path){
        //debugger
        console.log("I received dragover request over me", d.path);
        //this.showDrop = true;
      }else{
        //console.log("I received dragover request over me", d);
        this.showDrop = false;
      }
    });
  }
   /** moved into group
   * Listen when user start draggin field
   * based on groupName we set canDrop flag
   * that indicats if field can be dropped in this group

  listenForDragEndItem(){
    this.dragEndItem$ = this.dndSvc.dragEndItem$
    .subscribe((d:any)=>{
      //reset to default
      //console.log("listenForDragEndItem...showDrop...set to false");
      this.showDrop = false;
    });
  }*/

  editMe(){
    //console.log("Edit...", this.field.id, this.group, this.index);
    //debugger
    this.dndSvc.setEditItem({
      action:"EDIT_ITEM",
      parent: this.parentPath,
      groupId: this.groupId,
      groupName: this.groupName,
      field:{
        ...this.field
      }
    });

  }

  deleteMe(){
    console.log("Delete...", this.field.path);
    //this.store.deletePath(this.path);
    let all = this.store.deleteItemAtPath({
      path: this.field.path,
    });
    //publish changes
    this.store.publish(all);
  }

  onDragStartItem(e){
    console.log("onDragStartItem...", this.field.path);
    //let group = this.store.getGrops()[this.group];
    //debugger
    let data = {
      action:"MOVE_ITEM",
      parent: this.parentPath,
      groupId: this.groupId,
      groupName: this.groupName,
      field: {
        ...this.field
      }
    }
    //debugger
    e.dataTransfer.setData("text",JSON.stringify(data));
    //debugger
    e.dataTransfer.dropEffect="grab";
    //set item dragstart event
    this.dndSvc.setDragStartItem(data);
  }
  /* fire dragover event over specific item */
  onDragOverItem(e){
    if (this.canDrop == true){
      e.preventDefault();
      let data={
        parent: this.parentPath,
        path: this.field.path,
        //index: this.index
      }
      //console.log("onDragOverItem...", data);
      //this.canDrop = true;
      this.dndSvc.setDragOverItem(data);
    }
  }
  /**
   * onDragEndItem does not trigger dragend event when drop is performed
   * therefore this event is executed from onDrop
   * @param e
   *
   */
  onDragEndItem(e){
    console.log("onDragEndItem...", this.field.path);
    this.dndSvc.setDragEndItem(true);
  }
  ngOnDestroy(){
    //this.dragEndItem$.unsubscribe();
    //this.dragOverItem$.unsubscribe();
  }
}
