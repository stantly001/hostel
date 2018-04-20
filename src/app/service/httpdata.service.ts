import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../utils/globals';
// import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Hostel } from '../model/hostel';

@Injectable()
export class HttpdataService {

  constructor(private http: HttpClient, private _globals: Globals) { }
  readonly baseUrl = this._globals.baseAppUrl;

  /**
   * @param 
   * Get All Hostel Details
   */
  getAllHostelData(): Observable<Hostel[]> {
    return this.http.get(this.baseUrl + "/hostel")
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param hostel 
   * Save New Hostel Details
   */
  addHosteldata(hostel: Hostel): Observable<Hostel> {
    return this.http.post(this.baseUrl + "/hostel/add", hostel)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  deleteHosteldata(hostel: Hostel): Observable<Hostel> {
    return this.http.delete(this.baseUrl + "/hostel/removeHostel/" + hostel._id)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  updateHosteldata(hostel: Hostel): Observable<Hostel> {
    console.log(hostel)
    return this.http.put(this.baseUrl + "/hostel/update/" + hostel._id, hostel)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param file 
   * Upload File to write file
   */
  onUploadFile(file): any {
    return this.http.post(this.baseUrl + "/hostel/writeByUploadFile", file)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  //Filters

  addFilterdata(filter: any): Observable<any> {
    return this.http.post(this.baseUrl + "/filter/add", filter)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  deleteFilterdata(filter: any): Observable<Hostel> {
    return this.http.delete(this.baseUrl + "/filter/remove/" + filter._id)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  updateFilterdata(filter: any): Observable<any> {
    console.log(filter)
    return this.http.put(this.baseUrl + "/filter/update/" + filter._id, filter)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }


  getAllRegisterData(): Observable<Hostel[]> {
    return this.http.get(this.baseUrl + "/register")
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addRegisterdata(register: any): Observable<any> {
    return this.http.post(this.baseUrl + "/register/add", register)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }



  private extractData(res: Response) {
    let body = res;
    console.log(body)
    return body || {};
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}

