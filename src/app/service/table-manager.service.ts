import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableManagerService {

  constructor() { }

  public getChildElementValue(object: any, path: string) {
    let segments = path.split(".");
    let childObject = object;
    for (let s of segments) {
      childObject = childObject[s];
    }
    return childObject;
  }
}
