import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DragDropStore {
  constructor(){
    console.log('DragDropStore...started');
  }

  private groups=[];
  Groups = new Subject();
  Groups$ = this.Groups.asObservable();
  /**
   * Create new group based on dropped field
   * @param f: field object
   */
  addGroup(f){
    //new group
    let g={
      id: f.groupId,
      name: f.groupName,
      fields:[
        f.field
      ]
    }
    //debugger
    //add to collection
    this.groups.push(g);
    //publish updated collection
    this.Groups.next(this.groups);
  }
  /**
   * Delete group based on index (position in array)
   * @param i: group index
   */
  deleteGroup(i:number){
    let all = [];
    //debugger
    if (this.groups.length > 1){
      all=[
        ...this.groups.slice(0, i),
        ...this.groups.slice(i + 1)
      ]
    }

    this.groups = all;
    this.Groups.next(this.groups);
  }

  /**
   * Add niew field item to existing group
   * @param i:group index,
   * @param f:field object
   */
  addItemToGroup(i:number, f:any){
    //debugger
    let all=[],
        g=this.groups[i];

    //add field to group
    g['fields'].push(f.field);

    if (this.groups.length==1){
      //only one group that needs to be updated
      all.push(g);
    }else{
      //now update array
      all=[
        ...this.groups.slice(0, i),
        g,
        ...this.groups.slice(i + 1)
      ]
    }

    this.groups = all;

    //publish update
    this.Groups.next(this.groups);
  }
  /**
   * Delete specific item from specific group
   * based on the index position
   * @param g: group index
   * @param i: field index
   */
  deleteItem(g:number, i:number){

    //debugger
    //copy group based on g position
    let group = {
      ...this.groups[g]
    };
    //remove field at position i
    group.fields = [
      ...group.fields.slice(0, i),
      ...group.fields.slice(i + 1)
    ];

    //overwrite old group
    this.groups[g] = group;

    //publish change
    this.Groups.next(this.groups);

  }

}
