import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DefaultsService {

  constructor(private http:HttpClient) { }

  private BASE_URL="../assets/json/";

  getFilters():any {
    return this.http.get(this.BASE_URL+"filter.json").map((response:Response)=>response);
  }

  getHostels():any{
    let hostelUrl=""
    return this.http.get(this.BASE_URL+"hostels.json").map((response:Response)=>response);
  }
}
