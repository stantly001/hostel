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


  /**
   * 
   * @param hostelId 
   * Get HostelDetail By HostelId
   */
  getRoomDetailsByHostelId(hostelId){
    return this.http.get(this.baseUrl + "/room/"+hostelId)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param hostel 
   * Delete Hostel By Hostel Id
   */
  deleteHosteldata(hostel: Hostel): Observable<Hostel> {
    return this.http.delete(this.baseUrl + "/hostel/removeHostel/" + hostel._id)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }


  /**
   * 
   * @param hostelId 
   * Get Hostel By Id
   */
  getHostelById(hostelId){
    return this.http.get(this.baseUrl + "/hostel/getHostelById/"+hostelId)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }


  /**
   * 
   * @param hostel 
   * Update Hostel By Hostel Id
   */
  updateHosteldata(hostel: Hostel): Observable<Hostel> {
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
    return this.http.get(this.baseUrl + "/filter")
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param filter 
   * Add Filter
   */
  addFilterdata(filter: any): Observable<any> {
    return this.http.post(this.baseUrl + "/filter/add", filter)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param filter 
   * Delete Filter By Filter id
   */
  deleteFilterdata(filter: any): Observable<Hostel> {
    return this.http.delete(this.baseUrl + "/filter/remove/" + filter._id)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param filter 
   * Update Filter By Filter Id
   */
  updateFilterdata(filter: any): Observable<any> {
    return this.http.put(this.baseUrl + "/filter/update/" + filter._id, filter)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * Get All Register Data
   */
  getAllRegisterData() {
    return this.http.get(this.baseUrl + "/user")
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param register
   * Add Register
   */
  addRegisterdata(register: any): Observable<any> {
    return this.http.post(this.baseUrl + "/user/registration", register)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }
  /**
   * Get Services
   */
  getAllServices() {
    return this.http.get(this.baseUrl + "/service")
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }
  /**
   * 
   * @param service 
   * Save Services
   */
  saveService(service: any): Observable<any> {
    return this.http.post(this.baseUrl + "/service/saveService", service)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param service 
   * Update Service
   */
  updateService(service: any): Observable<any> {
    return this.http.put(this.baseUrl + "/service/update/" + service._id, service)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param service 
   * Delete Service
   */
  deleteService(service) {
    return this.http.delete(this.baseUrl + "/service/remove/" + service._id)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

/**
   * Get Rooms
   */
  getAllRooms() {
    return this.http.get(this.baseUrl + "/room")
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param hostel 
   * Get Hostel Rooms By HostelId
   */
  getHostelRooms(id){
    return this.http.get(this.baseUrl + "/room/" + id)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }



  /**
   * 
   * @param room 
   * Save Room
   */
  saveRoom(room: any): Observable<any> {
    return this.http.post(this.baseUrl + "/room/saveRoom", room)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param room 
   * Update Room
   */
  updateRoom(room: any): Observable<any> {
    return this.http.put(this.baseUrl + "/room/update/" + room._id, room)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * 
   * @param room 
   * Book Room
   */
  bookRoom(room){
    return this.http.post(this.baseUrl + "/booking/saveBooking", room)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  
  /**
   * 
   * @param register 
   * Auth Login
   */
  authUserLogin(register: any): Observable<any> {
    return this.http.post(this.baseUrl + "/auth/user", register)
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

