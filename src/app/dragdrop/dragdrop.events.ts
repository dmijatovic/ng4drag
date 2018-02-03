import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class DragDropEventsRule {
  constructor(){
    console.log('DragDropEventsRule...started');
  }
  /**
   * Drag start event
   * published when user start dragging field
   */
  dragStart = new Subject()
  dragStart$ = this.dragStart.asObservable();
  setDragStart(f:any){
    this.dragStart.next(f);
  }

  /**
   * Drag end event
   * published when user drops field somewhere
   * note! invalid drops are included too
  */
  dragEnd = new Subject()
  dragEnd$ = this.dragEnd.asObservable();
  setDragEnd(b){
    this.dragEnd.next(b);
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
