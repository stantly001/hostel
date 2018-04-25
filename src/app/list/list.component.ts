import { Component, OnInit } from '@angular/core';
import { HttpdataService } from '../service/httpdata.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  
  errorMessage: any;
  hostels: any;
  constructor(private _httpDataService:HttpdataService) { }

  ngOnInit() {
    // this.defaultsService.getHostels().subscribe(response => {
    //   console.log("Hostel",response)
    //   this.hostels=response;
    // })
    this._httpDataService.getAllHostelData().subscribe(
      data => this.hostels = data,
      error => this.errorMessage = <any>error)

  }

}
