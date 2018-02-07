import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class DragDropEvents {
  constructor(){
    console.log('DragDropEvents...service started');
  }
//------------------------------
// DRAG FIELD EVENTS
  /**
   * Drag start event
   * published when user start dragging field
   */
  dragStartField = new Subject()
  dragStartField$ = this.dragStartField.asObservable();
  setDragStartField(f:any){
    this.dragStartField.next(f);
  }
  /**
   * Drag end event
   * published when user drops field somewhere
   * note! invalid drops are included too
  */
  dragEndField = new Subject()
  dragEndField$ = this.dragEndField.asObservable();
  setDragEndField(b){
    this.dragEndField.next(b);
  }
//--------------------
// DRAG ITEM EVENTS
  dragStartItem = new Subject()
  dragStartItem$ = this.dragStartItem.asObservable();
  setDragStartItem(f:any){
    this.dragStartItem.next(f);
  }

  /**
   * Drag end event
   * published when user drops Item somewhere
   * note! invalid drops are included too
  */
  dragEndItem = new Subject()
  dragEndItem$ = this.dragEndItem.asObservable();
  setDragEndItem(b){
    this.dragEndItem.next(b);
  }


}


@Injectable()
export class DragDropEventsGroup {
  constructor(){
    console.log('DragDropEventsGroup...started');
  }

  dragEnd = new Subject()
  dragEnd$ = this.dragEnd.asObservable();
  setDragEnd(b){
    this.dragEnd.next(b);
  }
}
