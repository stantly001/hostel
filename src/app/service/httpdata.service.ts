import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Globals from '../utils/globals';
// import Utils from './utils'
// import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Hostel } from '../model/hostel';


@Injectable()
export class HttpdataService {
  baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = Globals.baseAppUrl;
  }


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

  /**
 * get All Filters
 */
  getAllFilters() {
    console.log("getFilters----->")
    return this.http.get(this.baseUrl + "/filter")
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


  getAllRegisterData() {
    return this.http.get(this.baseUrl + "/user")
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addRegisterdata(register: any): Observable<any> {
    return this.http.post(this.baseUrl + "/user/registration", register)
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

