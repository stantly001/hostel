import { Component, OnInit } from '@angular/core';
import { HttpdataService } from '../service/httpdata.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookedHostels: any;
  errorMessage: any;
  checkInDate:Date
  constructor(private _httpDataService: HttpdataService) { }

  ngOnInit() {
    this.getBookingDataByUser();
    this.checkInDate=new Date();
  }


  getBookingDataByUser(){
  let user = JSON.parse(sessionStorage.getItem("user")).data;
  console.log("user>>>>>",user);
  this._httpDataService.getBookingDataByUser(user).subscribe(
    data => {
      this.bookedHostels = data;
    },
    error => this.errorMessage = <any>error)

}


vacateHostel(room,bookedFloor,bookedHostel){




}


}
