import { Component, Input } from '@angular/core';

import { DragDropStore } from '../dragdrop.store';
import { DragDropEvents } from '../dragdrop.events';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Component({
  selector: 'rule-group',
  templateUrl: './group.html',
  styleUrls: ['./group.scss'],
  //providers: [ DragDropEventsGroup ]
})
export class RuleGroup {
  @Input() index:number;
  @Input() id:string;
  @Input() name:string="Group name";
  @Input() fields=[];

  open:boolean = true;
  dragStartItem$:Subscription;
  dragEndItem$:Subscription;
  dragEnterGroup$:Subscription;
  canDrop:boolean=true;
  showDrop:boolean=false;

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
      if (this.name == d.groupName){
        //console.log("canDrop...true", d);
        if (d.action=="MOVE_GROUP" && d.group == this.index){
          console.warn("listenForDragStartItem...cannot move group into itself...");
          this.canDrop = false;
        }else{
          //console.log("listenForDragStartItem...canDrop...into same group...true");
          this.canDrop = true;
        }
      }else{
        //console.log("listenForDragStartItem...canDrop...false");
        this.canDrop = false;
      }
    });
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
    });
  }
   /**
   * Listen when user start dragging field over group
   */
  listenForDragEnterGroup(){
    this.dragEnterGroup$ = this.dndSvc.dragEnterGroup$
    .subscribe((d:any)=>{
      if (this.index == d.index){
        this.showDrop = true;
      }else{
        this.showDrop = false;
      }
    });
  }

  toggleMe(){
    this.open = !this.open;
  }

  deleteMe(){
    console.log("Delete group...", this.id, this.index);
    this.store.deleteGroup(this.index);
  }

  onDragStartGroup(e){
    console.log("dragstart group...", this.index);
    let data = {
      action:"MOVE_GROUP",
      group: this.index,
      groupId: this.id,
      groupName: this.name,
      field: this.fields
    }
    //debugger
    e.dataTransfer.setData("text",JSON.stringify(data));
    //set item dragstart event
    this.dndSvc.setDragStartItem(data);
  }

  onDragEnterGroup(e){
    //console.log("dragenter group...", this.index);
    this.dndSvc.setDragEnterGroup({
      id: this.id,
      index: this.index,
      name: this.name
    });
  }

  onDragEndGroup(e){
    console.log("dragend group...", this.index);
    this.dndSvc.setDragEndItem(true);
  }

  ngOnDestroy(){
    this.dragEndItem$.unsubscribe();
    this.dragStartItem$.unsubscribe();
    this.dragEnterGroup$.unsubscribe();
  }
}
