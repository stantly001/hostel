import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Globals } from '../utils/globals';

@Injectable()
export class DefaultsService {

  constructor(private http:HttpClient, private _globals: Globals) { }
  readonly baseUrl = this._globals.baseAppUrl;

  private BASE_URL="../assets/json/";

  getFilters():any {
    return this.http.get(this.BASE_URL+"filter.json").map((response:Response)=>response);
  }

  getHostels():any{
    let hostelUrl=""
    return this.http.get(this.BASE_URL+"hostels.json").map((response:Response)=>response);
  }

  getAllHostelData(): Observable<any[]> {
    return this.http.get(this.baseUrl + "/hostel")
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleErrorObservable(error: Response | any) {
    return Observable.throw(error.message || error);
  }
}
