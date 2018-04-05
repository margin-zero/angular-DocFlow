import { Injectable } from '@angular/core';

@Injectable()
export class GlobalFunctionsService {

  constructor() { }

  getCurrentDateStr(): string {
    const currentDate = new Date();
    let currentDateString: string ;

    currentDateString = '' + currentDate.getFullYear() + '-';
    if (currentDate.getMonth() + 1 > 9) {
      currentDateString += (currentDate.getMonth() + 1);
    } else {
      currentDateString += ('0' + (currentDate.getMonth() + 1));
    }

    if (currentDate.getDate() > 9) {
      currentDateString += '-' + currentDate.getDate();
    } else {
      currentDateString += '-0' + currentDate.getDate();
    }

    return currentDateString;
  }
}
