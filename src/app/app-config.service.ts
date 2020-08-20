import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor() { }

  private urlBase = 'http://45.77.199.154:8080/cgc/';

  getUrlBase() {
    return this.urlBase;
  }
}
