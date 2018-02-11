import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class DragDropEvents {
  constructor(){
    console.log('DragDropEvents...service started');
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
