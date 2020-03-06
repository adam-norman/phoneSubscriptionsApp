import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private currentObj = new BehaviorSubject('default message');
  selectedObj = this.currentObj.asObservable();

  private currentSelectedNodeId = new BehaviorSubject('default message');
   nodeId = this.currentSelectedNodeId.asObservable();

  constructor() { }

  sendObj(obj: any) {
    this.currentObj.next(obj)
  }
  rememberNodeId(obj: any) {
    this.currentSelectedNodeId.next(obj)
  }
}
