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
   * Dragover item event
   * published when user drags item over another item
  */
  dragOverItem = new Subject()
  dragOverItem$ = this.dragOverItem.asObservable();
  setDragOverItem(b){
    this.dragOverItem.next(b);
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

  //--------------------
  // DRAG ENTER GROUP
  dragEnterGroup = new Subject()
  dragEnterGroup$ = this.dragEnterGroup.asObservable();
  setDragEnterGroup(g:any){
    this.dragEnterGroup.next(g);
  }


}
