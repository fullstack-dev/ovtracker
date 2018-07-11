import { Injectable } from '@angular/core';

let uid = { uid: '' };

@Injectable()
export class DataService {

  constructor() {

  }

  setUid(obj) {
    uid = obj;
  }

  getUid() {
    return uid.uid;
  }
}
