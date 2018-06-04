import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpdataService } from '../service/httpdata.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  @ViewChild("datePicker") datePicker: any;
  bookedHostels: any;
  errorMessage: any;
  checkInDate: Date
  constructor(private _httpDataService: HttpdataService) { }

  ngOnInit() {
    this.getBookingDataByUser();
    this.checkInDate = new Date();
  }


  getBookingDataByUser() {
    let user = JSON.parse(sessionStorage.getItem("user")).data;
    console.log("user>>>>>", user);
    this._httpDataService.getBookingDataByUser(user).subscribe(
      data => {
        this.bookedHostels = data;
      },
      error => this.errorMessage = <any>error)

  }


  vacateHostel(bookedRoom, bookedFloor, bookedHostel) {
    bookedHostel.to_date=this.datePicker.date;
// console.log("date",this.datePicker.date)
//     console.log("room>>>>", bookedRoom);
//     console.log("bookedFloor>>>>", bookedFloor);
    console.log("bookedHostel>>>>", bookedHostel)

    bookedHostel.floors.forEach(floor => {
      if (floor._id == bookedFloor._id) {
        floor.rooms.forEach(room => {
          if (room.room_number == bookedRoom.room_number) {
            room.status = false;
          }
        });
      }
console.log("DDDDD",bookedHostel)
    });


    this._httpDataService.updateBookedRoom(bookedHostel).subscribe(
      data => data,
      error => this.errorMessage = <any>error)
  }


}
