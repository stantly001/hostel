import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Globals from '../utils/globals';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Injectable()
export class QueryService {
  baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = Globals.baseAppUrl;
  }

  /**
   * 
   * @param query 
   */
  getFilterData(query) {
    return this.http.get(this.baseUrl + "/query/getFilterData?queryFilter=" + JSON.stringify(query))
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleErrorObservable(error: Response | any) {
    return IfObservable.throw(error.message || error);
  }

}
