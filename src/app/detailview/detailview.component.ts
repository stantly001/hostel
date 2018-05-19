import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpdataService } from '../service/httpdata.service';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})

export class DetailviewComponent implements OnInit {

  tempRooms: any;
  selectedRooms: any;
  selectedRoom: any;
  room: any;
  hostelBooking: { rooms: any };
  rooms: any;
  floor: any;
  errorMessage: any;
  hostelViewObject: any;
  hostelId: any;
  checkInDate: Date;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  no_of_rooms = 0;
  guest = 0;
  roomGuest = 0;
  Double_no_of_rooms = 0;
  @ViewChild("datePicker") datePicker: any;
  constructor(private activateRoute: ActivatedRoute, private _httpDataService: HttpdataService) { }

  ngOnInit() {
    this.selectedRooms = [];
    this.tempRooms = [];
    this.checkInDate = new Date();
    this.getParams();
    this.defaultGallerySettings();

  }

  /**
   * Default Gallery Settings
   */
  defaultGallerySettings() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageArrows: true
      }
    ];

  }
  /**
   * Get Params From Url
   */
  getParams() {
    this.activateRoute.params.subscribe(res => {
      this.hostelId = res["hostelId"];
      this.getHostelObjectByHostelId(this.hostelId);
    })
  }


  /**
     * get hostel Rooms By hostelId
     */
  getHostelObjectByHostelId(hostelId) {
    this._httpDataService.getHostelRooms(hostelId).subscribe(
      data => {
        this.hostelViewObject = data;
        this.floor = data.floors[0];
        if (this.floor) {
          this.setHostelRooms(this.floor);
        }
        this.setHostelImage(data)
        console.log("data", data)
      },
      error => this.errorMessage = <any>error)
  }

  /**
  * Set Hostel Image
  */
  setHostelImage(hostel) {
    hostel.hostel_id.images.map(img => {
      return img//{small: img.imgBase64, medium: img.imgBase64, big: img.imgBase64}
    }).forEach(element => {
      console.log(element);
      element.small = element.imgBase64,
        element.medium = element.imgBase64,
        element.big = element.imgBase64
    });

  }


  /**
   * 
   * @param floor 
   * Set Hostel rooms
   */
  setHostelRooms(floor) {
    console.log("floor", floor)
    this.rooms = floor.rooms;
    this.selectRoom(this.rooms[0]);
  }

  /**
   * 
   * @param room 
   * Select Room
   */
  selectRoom(room) {
    console.log("room", room)
    this.selectedRoom = room;
    console.log("selected Room", this.selectedRoom)
    // console.log("services",room.room_services)
    this.rooms.forEach(element => {
      if (room._id == element._id) {
        element.active = true;
      } else {
        element.active = false;
      }
    });
    if (room.room_type == "Single Room") {
      this.selectedRoom.guest = 1;
    } else if (room.room_type == "Double Room") {
      this.selectedRoom.guest = 2;
    }
    room.room_services.forEach(element => {
      if (element.service.service_name == "Base Service") {
        this.selectedRoom.price = element.base_amount;
      }
    });
  }


  /**
   * 
   * @param selectedRoom 
   * Select Booking Room
   */
  selectBookingRoom(selectedRoom) {
    let groupByName = {};
    this.tempRooms.push(selectedRoom);
    this.selectedRooms = []
    // if (this.selectedRooms.length == 0) {
    // this.selectedRooms.push(bkroom);
    this.tempRooms.forEach(function (a) {
      groupByName[a.room_type] = groupByName[a.room_type] || [];
      groupByName[a.room_type].push({
        _id: a._id, active: a.active, guest: a.guest, is_active: a.is_active, no_of_beds: a.no_of_beds
        , room_number: a.room_number, room_type: a.room_type,room_services:a.room_services
      });
    });
    Object.keys(groupByName).forEach(function (key) {
      var replaced = key.replace(' ', '');
      if (key !== replaced) {
        groupByName[replaced] = groupByName[key];
        delete groupByName[key];
      }
    });
    console.log("groupByName", groupByName);
    let bkroom = this.setBookingRoom(groupByName);
    this.selectedRooms = bkroom;
    console.log("", this.selectedRooms)
    // } 
    // this.selectedRooms.map(data => {
    //   if (data.room_type == bkroom.room_type) {
    //     data.room_type = bkroom.room_type;
    //     data.no_of_rooms = bkroom.no_of_rooms;
    //     data.guest = bkroom.guest;
    //   } else {
    //     this.selectedRooms.push(bkroom);
    //   }
    // })
  }
  totalRoomPrice() {
    return this.selectedRooms.reduce((sum, val) => sum + val.total_price, 0);
  }
  setBookingRoom(room) {
    let bookingRoom = [];
    let singleRoom;
    let doubleRoom;
    if (room.SingleRoom) {
      let no_of_rooms = room.SingleRoom.length;
      let total_room_price = 0;
      let paid_service=0;
      let total_price=0;
      room.SingleRoom.map(data => {
        data.room_services.map(res => {
          if (res.base_amount) {
            total_room_price += res.base_amount;
          }
          if (res.amount_per_month) {
            paid_service += res.amount_per_month;
          }
        })
        let guest = 0;

        guest += data.guest;
        singleRoom = {
          room_type: data.room_type,
          no_of_rooms: no_of_rooms,
          guest: guest,
          total_room_price: total_room_price,
          paid_service:paid_service,
          total_price:total_room_price+paid_service
        }
      })
      bookingRoom.push(singleRoom);
      console.log("booking Room", bookingRoom)
      // return bookingRoom;
    } if (room.DoubleRoom) {
      let total_room_price = 0;
      let paid_service=0;
      let total_price=0;
      let no_of_rooms = room.DoubleRoom.length;
      room.DoubleRoom.map(data => {
        data.room_services.map(res => {
          if (res.base_amount) {
            total_room_price += res.base_amount;
          }
          if (res.amount_per_month) {
            paid_service += res.amount_per_month;
          }
        })
        let guest = 0;
        guest += data.guest;
        doubleRoom = {
          room_type: data.room_type,
          no_of_rooms: no_of_rooms,
          guest: guest,
          total_room_price: total_room_price,
          paid_service:paid_service,
          total_price:total_room_price+paid_service
        }
      })
      bookingRoom.push(doubleRoom);
      console.log("booking Room", bookingRoom)

    }
    return bookingRoom;



    // let total_room_price=0;
    // total_room_price+=room.room_services.map(data=>{
    //   return data.base_amount;
    // })
    // if (room.room_type == "Single Room") {
    //   this.guest += room.guest;
    //   this.no_of_rooms++;
    //   let bookingRoom = {
    //     room_type: room.room_type,
    //     no_of_rooms: this.no_of_rooms,
    //     guest: this.guest,
    //     total_room_price:total_room_price
    //   }
    //   return bookingRoom;
    // }
    // if (room.room_type == "Double Room") {
    //   this.roomGuest += room.guest;
    //   this.Double_no_of_rooms = this.Double_no_of_rooms + 2;
    //   let bookingRoom = {
    //     room_type: room.room_type,
    //     no_of_rooms: this.Double_no_of_rooms,
    //     guest: this.roomGuest
    //   }
    //   return bookingRoom;
    // }
    // console.log("guest",guest);
    // console.log("no_of_rooms",no_of_rooms)
    // console.log("booking Room",bookingRoom)
    // // this.selectedRooms.push(bookingRoom);
    // console.log("selectedRooms",this.selectedRooms)
  }

}
