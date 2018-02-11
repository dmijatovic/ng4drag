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
  //drop:boolean = false;
  dragEndField$:Subscription;

  constructor(
    private store: DragDropStore,
    private dndSvc: DragDropEvents
  ){}
  ngOnInit(){

    //this.listenForDragEndField();

  }
  /**
   * Listen when drag end event of field fires
   * then we hide drop area (onDragLeave does not produces desired result)

  listenForDragEndField(){
    this.dragEndField$ = this.dndSvc.dragEndField$
    .subscribe((d)=>{
      //debugger
      this.drop = !d;
    });
  }*/

  toggleMe(){
    this.open = !this.open;
  }

  deleteMe(){
    console.log("Delete group...", this.id, this.index);
    this.store.deleteGroup(this.index);
  }

  /**
   * Fires when drag enters group
   * NOTE! it fires also when drag enters from the child!!!
   * not usefull in current setup
   * @param e
   */
  onDragEnter(e){
    //debugger
    //this.drop = true;
    //console.log("drag enter event...drop=true", e);
  }
  /**
   * Fires when drag leaves item
   * NOTE! it fires also when drag enters child!!!
   * not usefull in current setup
   * @param e
   */
  onDragLeave(e){
    //debugger
    //this.drop = false;
    //console.log("drag leave event...", e);
  }
  /**
   * Event fires when mouse enters a group
   * NOTE! this event does not fires when
   * user drags item (drag event is fired)
   * @param e
   */
  onMouseEnter(e){
    //console.log("mouse enter event...", e);
  }
  /**
   * Event fires when mouse leaves a group
   * NOTE! this event does not fires when
   * user drags item (drag event is fired)
   * @param e
   */
  onMouseLeave(e){
    //console.log("mouse leave event...", e);
  }

  ngOnDestroy(){
    //this.dragEndField$.unsubscribe();
  }
}
