import { Component, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';

import { Subscription } from 'rxjs/Subscription';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs';

@Component({
  selector: 'rule-group',
  templateUrl: './group.html',
  styleUrls: ['./group.scss'],
  //providers: [ DragDropEventsGroup ]
})
export class RuleGroup {
  //when child group
  @Input() parentPath:any=null;
  @Input() path=[];
  @Input() id:string;
  @Input() name:string="Group";
  //index of group or item
  @Input() index:number;
  @Input() fields=[];
  //optional
  @Input() fieldType:string="Group";

  //tree structure array indicating node position
  //path=[];
  open:boolean = true;

  canDrop:boolean=true;
  showDrop:boolean=false;
  //from which group dragged items comes from?
  //if same group we do not show drop-zone
  itemParentPath=[];

  dragStartItem$:Subscription;
  dragEndItem$:Subscription;
  dragEnterGroup$:Subscription;

  constructor(
    private store: DragDropStore,
    private dndSvc: DragDropEvents
  ){}

  ngOnInit(){
    this.listenForDragStartItem();
    this.listenForDragEndItem();
    this.listenForDragEnterGroup();
  }
  /**
   * Listen when user start draggin field
   * based on groupName we set canDrop flag
   * that indicats if field can be dropped in this group
   */
  listenForDragStartItem(){
    this.dragStartItem$ = this.dndSvc.dragStartItem$
    .subscribe((d:any)=>{
      this.updateCanDrop(d);
    });
  }
  /**
   * This function need to be improved!!!
   * @param d
   */
  updateCanDrop(d){
    //debugger
    if (this.name == d.groupName){
      //console.log("canDrop...true", d);
      switch(d.action){
        case "MOVE_GROUP":
          if (this.path == d.parentPath){
            this.canDrop = false;
            console.warn("cannot move group into itself", d);
          }else{
            this.canDrop = true;
          }
          break;
        case "MOVE_ITEM":
          //debugger
          if (this.path == d.parentPath){
            console.log("move item within group", d);
            this.canDrop = false;
            //this.showDrop = false;
          }else{
            //console.log("move item to DIFFERENT group", d);
            this.canDrop = true;
            //this.showDrop = true;
          }
          //save info from which group
          //we start draggin this item
          this.itemParentPath = d.parentPath;
          break;
        default:
          this.canDrop = true;
      }
    }else{
      //console.log("listenForDragStartItem...canDrop...false");
      this.canDrop = false;
    }
    //show drop item area
    this.showDrop = true;
  }
  /**
   * Listen when user start draggin field
   * based on groupName we set canDrop flag
   * that indicats if field can be dropped in this group
   */
  listenForDragEndItem(){
    this.dragEndItem$ = this.dndSvc.dragEndItem$
    .subscribe((d:any)=>{
      //reset to default
      //console.log("listenForDragEndItem...canDrop...set to true");
      this.canDrop = true;
      this.showDrop = false;
      //this.itemParentPath = [];
    });
  }
   /**
   * Listen when user start dragging field over group
   */
  listenForDragEnterGroup(){
    this.dragEnterGroup$ = this.dndSvc.dragEnterGroup$
    .subscribe((d:any)=>{
      //static display looks more clear
      //this.updateShowDrop(d)
    });
  }
  updateShowDrop(d){
    /*
    console.group("updateShowDrop");
    console.log("this.path=", this.path)
    console.log("d", d)
    if (this.index == d.index){
      if (this.path == this.itemParentPath){
        //debugger
        this.showDrop = false;
        console.log("showDrop..false");
      }else{
        this.showDrop = true;
        console.log("showDrop..true");
      }
    }else{
      console.log("showDrop..false");
      this.showDrop = false;
    }
    console.groupEnd();
    */
  }
  toggleMe(){
    this.open = !this.open;
  }

  deleteMe(){
    //debugger
    //remove group
    let all = this.store.deleteItemAtPath({
      path: this.path
    });
    //publish changes
    this.store.publish(all);
  }

  onDragStartGroup(e){
    console.log("dragstart group...", this.index);
    let data = {
      action:"MOVE_GROUP",
      parentPath: this.parentPath,
      path: this.path,
      groupId: this.id,
      groupName: this.name,
      fieldType: this.fieldType,
      fields: this.fields
    }
    //debugger
    e.dataTransfer.setData("text",JSON.stringify(data));
    //set item dragstart event
    this.dndSvc.setDragStartItem(data);
  }

  onDragEndGroup(e){
    console.log("dragend group...", this.index);
    this.dndSvc.setDragEndItem(true);
  }


  onDragEnterGroup(e){
    //console.log("dragenter group...", this.index);
    this.dndSvc.setDragEnterGroup({
      id: this.id,
      index: this.index,
      name: this.name
    });
  }

  ngOnDestroy(){
    this.dragEndItem$.unsubscribe();
    this.dragStartItem$.unsubscribe();
    this.dragEnterGroup$.unsubscribe();
  }
}
