import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DragDropStore {
  constructor(){
    console.log('DragDropStore...started');
  }
  /**
   * Groups
   */
  private groups=[];
  Groups = new Subject();
  Groups$ = this.Groups.asObservable();
  getGrops(){
    return this.groups;
  }
  /**
   * Create new group based on dropped field
   * @param f: field object
   */
  addGroup(f, addField=true){
    //new group
    let g={
      id: f.groupId,
      name: f.groupName,
      fields:[]
    }
    if (addField==true){
      g.fields.push(f.field);
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
   * Add new field item to existing group
   * at specific position
   * @param group:group index,
   * @param index:position to insert item
   * @param field:field object
   */
  addItemToGroup({group, index, field}){
    //debugger
    let all=[],
        fields=[],
        g=this.groups[group];

    //debugger
    //add field to group at specific position
    fields = [
      ...g['fields'].slice(0,index),
      field,
      ...g['fields'].slice(index),
    ]
    g['fields'] = fields;

    if (this.groups.length==1){
      //only one group that needs to be updated
      all.push(g);
    }else{
      //now update array
      all=[
        ...this.groups.slice(0, group),
        g,
        ...this.groups.slice(group + 1)
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
  deleteItem(g:number, i:number, delEmptyGroup=true){

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

    if (group.fields.length == 0 && delEmptyGroup==true){
      //if no items left then delete
      //complete group!
      this.deleteGroup(g);
    }else{
      //overwrite old group
      this.groups[g] = group;
      //publish change
      this.Groups.next(this.groups);
    }
  }


}
