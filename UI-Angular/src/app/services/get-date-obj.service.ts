import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDateObjService {

  constructor() { }
  getDateObj(mydate: Date) {
    if (mydate) {
      return { month: mydate.getUTCMonth() + 1,
  day : mydate.getUTCDate(),
  year : mydate.getUTCFullYear() };
    }
    }
}
