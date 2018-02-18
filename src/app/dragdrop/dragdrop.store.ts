import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DragDropStore {
  constructor(){
    console.log('DragDropStore...started');
  }
  /**
   * Store data and messaging
   */
  private store=[];
  Store = new Subject();
  Store$ = this.Store.asObservable();
  getStore(){
    return this.store;
  }
  publish(data){
    //assign new group collection
    this.store = data;
    //publish update to all components
    //that listen to Store$ stream
    this.Store.next(this.store);
  }
  /**
   * Basic array manipulation (add, replace, remove)
   * used by more advanced functions of the store service
   * @param param{
   *  array: array object to manipulate
   *  item: item to insert or replace
   *  pos: position in the array where item should be inserted
   * }
   */
  addItemToArray({ array, item, pos }){
    let all = [
      ...array.slice(0, pos),
      item,
      ...array.slice(pos)
    ]
    return all;
  }
  replaceItemInArray({ array, item, pos }){
    let all = [
      ...array.slice(0, pos),
      item,
      ...array.slice(pos + 1)
    ]
    return all;
  }
  removeItemFromArray({ array, pos }){
    let all = [
      ...array.slice(0, pos),
      ...array.slice(pos + 1)
    ]
    return all;
  }
  /**
   * Add field into parent collection of fields at specific position
   * @params{
   *  parent: parent object having fields collection
   *  field: field object to add into collection
   *  pos: field position in collection
   * }
   */
  addFieldToParent({ parent, field, pos }){
    if (!parent){
      console.warn("addFieldToParent...parent undefined...field...", field);
    }
    //debugger
    let p = {
      //all other props except fields
      ...parent,
      //fields
      fields: this.addItemToArray({
        array: parent.fields,
        item: field,
        pos: pos
      })
    }
    return p;
  }
  /**
   * Replace field from the parent collection of fields at specific position
   * @params{
   *  parent: parent object having fields collection
   *  field: field object to add into collection
   *  pos: field position in collection
   * }
   */
  replaceFieldInParent({ parent, field, pos }){
    if (!parent){
      console.warn("replaceFieldInParent...parent undefined...field...", field);
    }
    //debugger
    let p = {
      //all other props except fields
      ...parent,
      //fields
      fields: this.replaceItemInArray({
        array: parent.fields,
        item: field,
        pos: pos
      })
    }
    return p;
  }
  /**
   * Remove field (by position) from parent collection of fields
   * @params{
   *  parent: parent object having fields collection
   *  pos: field position in collection
   * }
   */
  removeFieldFromParent({ parent, pos }){
    if (!parent){
      console.warn("replaceFieldInParent...parent undefined...pos...", pos);
    }
    //debugger
    let p = {
      //all other props except fields
      ...parent,
      //fields
      fields: this.removeItemFromArray({
        array: parent.fields,
        pos: pos
      })
    }
    return p;
  }
  /**
   * Add field to 'tree like' structure using path (array)
   * to find the position where item should be inserted
   * It returns 'top level' group object
   * note! the function is recursive
   */
  addField({ parent, item, path }){
    let p={}, g={};
    if (path.length==1){
      g = this.addFieldToParent({
        parent: parent,
        field: item,
        pos: path[0]
      });
      //return all data
      return g;
    }else{
      //debugger
      g = this.addField({
        parent: parent.fields[path[0]],
        item: item,
        path: path.slice(1)
      });
      p = this.replaceFieldInParent({
        parent: parent,
        field: g,
        pos: path[0]
      });
      //we return updated group
      return p;
    }
  }
  /**
   * Updates field to 'tree like' structure using path (array)
   * to find the position of item that needs to be replaced with new item
   * It returns 'top level' group object
   * note! the function is recursive
   */
  updateField({ parent, item, path }){
    let p={}, g={};
    if (path.length==1){
      g = this.replaceFieldInParent({
        parent: parent,
        field: item,
        pos: path[0]
      });
      //return all data
      return g;
    }else{
      //debugger
      g = this.updateField({
        parent: parent.fields[path[0]],
        item: item,
        path: path.slice(1)
      });
      p = this.replaceFieldInParent({
        parent: parent,
        field: g,
        pos: path[0]
      })
      //return all parent data
      return p;
    }
  }
  /**
   * Deletes field from 'tree like' structure using path (array)
   * to find the position of item that needs to be removed
   * It returns 'top level' group object
   * note! the function is recursive
   */
  deleteField({ parent, path }){
    //debugger
    let p={}, g={};
    if (path.length==1){
      g = this.removeFieldFromParent({
        parent: parent,
        pos: path[0]
      })
      return g;
    }else{
      g = this.deleteField({
        parent: parent.fields[path[0]],
        path: path.slice(1)
      });
      p = this.replaceFieldInParent({
        parent: parent,
        field: g,
        pos: path[0]
      })
      //return all parent data
      return p;
    }
  }
  /**
   * Add (any) item to specific location (path)
   * and return complete store object
   * @param {path: path array, item: object}
   */
  addItemToPath({ path, item }){
    let all=[];
    //debugger
    if (path.length==1){
      all = this.addItemToArray({
        array: this.store,
        item: item,
        pos: path[0]
      });
    }else if (path.length > 1){
      //add to group
      let g = this.addField({
        parent: this.store[path[0]],
        item: item,
        path: path.slice(1)
      });
      //debugger
      //replace in store collection
      all = this.replaceItemInArray({
        array: this.store,
        item: g,
        pos: path[0]
      });
    }
    //return new data collection
    //with updated path values
    let data = this.updatePath(all);
    return data;
  }
  /**
   * Update (any) item at specific location (path)
   * and return complete store object
   * @param {path: path array, item: object}
   */
  updateItemAtPath({ path, item }){
    let all=[], g={};
    if (path.length==1){
      //add to store collection
      all = this.replaceItemInArray({
        array: this.store,
        item: item,
        pos: path[0]
      });
    }else if ( path.length > 1 ){
      //update group
      g = this.updateField({
        parent: this.store[path[0]],
        item: item,
        path: path.slice(1)
      });
      //debugger
      //replace in store collection
      all = this.replaceItemInArray({
        array: this.store,
        item: g,
        pos: path[0]
      });
    }
    //return new data collection
    return all;
  }
  /**
   * Delete (any) item to specific location (path)
   * and return complete store object
   * @param {path: path array}
   */
  deleteItemAtPath({ path }){
    let all=[];

    if (path.length==1){
      //add to store collection
      all = this.removeItemFromArray({
        array: this.store,
        pos: path[0]
      });
    }else if (path.length > 1){
      //delete from group
      let g = this.deleteField({
        parent: this.store[path[0]],
        path: path.slice(1)
      });
      //debugger
      //replace in store collection
      all = this.replaceItemInArray({
        array: this.store,
        item: g,
        pos: path[0]
      });
    }
    //return new data collection
    //with updated path values
    let data = this.updatePath(all);
    return data;
  }
  /**
   * Move (any) item to specific location (path)
   * and return complete store object
   * note! to move from path is stored in the item
   * depending on 'move direction' the order of add/delete is important
   * @param {path: target path array, item: object}
   */
  moveItemToPath({ path, item }){
    let all=[];
    //debugger
    //note! depending on relative
    //item position removing original
    //is done before or after adding
    //the item at new position
    if (path[0] > item.path[0]){
      //add first
      //pas item as new object to preserve
      //original path information
      //used for delete action
      all = this.addItemToPath({
        path: path,
        item: {
          ...item
        }
      });
      //update local store
      this.store = all;
      //delete item from path
      all = this.deleteItemAtPath({
        path: item.path
      });

    }else{
      //delete item from path
      all = this.deleteItemAtPath({
        path: item.path
      });
      //update local store
      this.store = all;
      //pas item as new object to preserve
      //original path information
      all = this.addItemToPath({
        path: path,
        item: {
          ...item
        }
      });
    }
    return all;
  }
  /**
   * After item manipulation we update path values
   * to represent new position of items
   * @param data
   * @param path
   */
  updatePath(data,path=[]){
    //debugger
    if (path.length==0){
      //initial data
      data.map((item, i)=>{
        item.index = i;
        item.path = [i];
        item.parentPath = null;
        if (item.fields){
          item.fields = this.updatePath(item.fields, item.path);
        }
      })
      //here we return all
      return data;
    }else{
      //other depts
      data.map((item, i)=>{
        //if there is parent prop
        item.parentPath = path;
        item.index = i;
        item.path = [...path, i];
        //check fields
        if (item.fields){
          item.fields = this.updatePath(item.fields, item.path);
        }
      });
      //return this porition of data
      return data;
    }
  }
  /**
   * We extract conditions from all info
   * @param data
   * @param path
   */
  extractConditions(data, path=[]){
    //debugger
    let conditions = [], c=[];
    if (path.length==0){
      //initial data
      data.map((item)=>{
        //get condition
        c = this.extractConditions(item.fields, item.path);
        conditions.push({
          //id: item.id,
          name: item.name,
          conditions:c
        });
      });
      //return all conditions
      return conditions;
    }else{
      //let c=[];
      data.map((item, i)=>{
        if (item.fields){
          c = this.extractConditions(item.fields, item.path);
          conditions.push({
            //id: item.id,
            name: item.name,
            conditions:c
          });
        }else if (item.condition){
          conditions.push(
            item.condition
          )
        }
      });
      return conditions;
    }
  }


// --- OLD FUNCTIONS -- REPLACE WITH NEWONES ABOVE

  /**
   * Create new group based on dropped field
   * this function is only for top level groups
   * @param f: field object

  addGroup(f, addField=true){
    //new group
    let g={
      id: f.groupId,
      name: f.groupName,
      parent: null,
      path: [ this.groups.length ],
      fieldType: 'Group',
      fields:[]
    }
    //if complete fields array
    //is provided use it
    if (f.fields){
      g.fields = [
        ...f.fields
      ]
    }else if (addField==true && f.field){
      //only one field
      g.fields.push(f.field);
    }
    //debugger
    //add to collection
    this.groups.push(g);
    //publish updated collection
    this.Groups.next(this.groups);
  }*/
  /**
   * Delete group based on index (position in array)
   * @param i: group index

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
  }*/

  /**
   * Add new field item to existing group
   * at specific position
   * @param group:group index,
   * @param index:position to insert item
   * @param field:field object

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

  getFields(obj, pos){

    if (pos.length > 1){
      let o = obj[pos[0]],
          p = pos.slice(0);

      this.getFields(o,p);
    }else{
      return obj[pos];
    }

  }
  deletePath(path, delEmptyGroup=true){
    debugger
    //copy group based on g position
    let group = {
      ...this.groups[path[0]]
    };

    //remove field at position i
    group.fields = [
      ...group.fields.slice(0, path[1]),
      ...group.fields.slice(path[1] + 1)
    ];

    if (group.fields.length == 0 && delEmptyGroup==true){
      //if no items left then delete
      //complete group!
      this.deleteGroup(path[0]);
    }else{
      //overwrite old group
      this.groups[path[0]] = group;
      //publish change
      this.Groups.next(this.groups);
    }

  }
*/
  /**
   * Delete specific item from specific group
   * based on the index position
   * @param g: group index
   * @param i: field index

  deleteItem(g, i:number, delEmptyGroup=true){

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
  */



}
