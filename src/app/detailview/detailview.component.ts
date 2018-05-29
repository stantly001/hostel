import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpdataService } from '../service/httpdata.service';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
// import { userInfo } from 'os';
@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})

export class DetailviewComponent implements OnInit {

  floorsByHostel: any;
  tempFloorArray: any[];
  roomsArray: any[];
  hostelFloors: any;
  hostelRooms: any;
  user: string;
  total: any;
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
  bookingObj = { floor: [] };
  @ViewChild("datePicker") datePicker: any;
  constructor(private activateRoute: ActivatedRoute, private _httpDataService: HttpdataService) { }

  ngOnInit() {
    this.selectedRooms = [];
    this.tempRooms = [];
    this.hostelRooms = [];
    this.hostelFloors = [];
    this.checkInDate = new Date();
    this.getParams();
    this.defaultGallerySettings();
    this.user = sessionStorage.getItem("user");
    this.roomsArray = []
    this.tempFloorArray = []

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
        // this.floorsByHostel = data
        console.log(data)
        this.floor = data.floors[0];
        if (this.floor) {
          this.selectFloor(this.floor, this.bookingObj);
        }
        this.setHostelImage(data);
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
  selectFloor(floor, bookingObj) {
    this.rooms = floor.rooms;
    bookingObj.select_floor = floor
    this.selectRoom(bookingObj, this.rooms[0]);
  }

  /**
   * 
   * @param room 
   * Select Room
   */
  selectRoom(bookingObj, room) {
    if (bookingObj.selectedRoom && bookingObj.selectedRoom._id == room._id) {
      return
    }

    bookingObj.selectedRoom = room;
    this.rooms.forEach(element => {
      if (room._id == element._id) {
        element.active = true;
      } else {
        element.active = false;
      }
    });
    if (room.room_type == "Single Room") {
      bookingObj.selectedRoom.guest = 1;
    } else if (room.room_type == "Double Room") {
      bookingObj.selectedRoom.guest = 2;
    } else {
      let roomBeds = bookingObj.selectedRoom.no_of_beds;
      if (!bookingObj.selectedRoom.guests) {
        bookingObj.selectedRoom.guests = [];
      }
      if (!isNaN(roomBeds)) {
        for (let i = 0; i < roomBeds; i++) {
          bookingObj.selectedRoom.guests.push(i + 1);
        }
      }

    }
    room.room_services.forEach(element => {
      if (element.service.service_name == "Base Service") {
        bookingObj.selectedRoom.price = element.base_amount;
      }
    });
  }


  /**
   * 
   * @param bookingObj 
   * @param floor 
   * Set Selected Room
   */
  setSelectedRoom(bookingObj, floor) {
    if (bookingObj.select_floor._id) {
      var tempRoom = {
        selectedRoom: bookingObj.selectedRoom,
        floor_id: bookingObj.select_floor._id,
      }

      let findIndexByFloorId = this.tempFloorArray.indexOf(tempRoom.floor_id)//this.roomsArray.findIndex(val => val.floor_id === bookingObj.select_floor._id);
      //let objByFloorIndex = this.roomsArray[findIndexByFloorId]

      if (findIndexByFloorId == -1) {
        let paid_services = [];

        tempRoom.selectedRoom.room_services.forEach(element => {
          if (element.paidService) {
            if (!tempRoom.selectedRoom.paid_service) {
              tempRoom.selectedRoom.paid_service = [];
            }
            tempRoom.selectedRoom.paid_service.push({
              service: element.service._id,
              service_price: element.amount_per_month
            })
          } if (element.free_service) {
            if (!tempRoom.selectedRoom.free_service) {
              tempRoom.selectedRoom.free_service = [];
            }
            tempRoom.selectedRoom.free_service.push({
              service: element.service._id,
              service_price: element.amount_per_month
            })
          }
        });

        this.tempFloorArray.push(tempRoom.floor_id)
        bookingObj.floor.push({ floor_id: tempRoom.floor_id, floor_no: bookingObj.select_floor.floor_no, rooms: [tempRoom.selectedRoom] })


      } else {
        findIndexByFloorId = bookingObj.floor.findIndex(val => val.floor_id === bookingObj.select_floor._id);
        console.log(findIndexByFloorId)
        let objByFloorIndex = bookingObj.floor[findIndexByFloorId]
        bookingObj.floor.forEach(val => {
          if (val.floor_id == bookingObj.select_floor._id) {
            tempRoom.selectedRoom.room_services.forEach(element => {
              if (element.paidService) {
                if (!tempRoom.selectedRoom.paid_service) {
                  tempRoom.selectedRoom.paid_service = [];
                }
                tempRoom.selectedRoom.paid_service.push({
                  service: element.service._id,
                  service_price: element.amount_per_month
                })
              } if (element.free_service) {
                if (!tempRoom.selectedRoom.free_service) {
                  tempRoom.selectedRoom.free_service = [];
                }
                tempRoom.selectedRoom.free_service.push({
                  service: element.service._id,
                  service_price: element.amount_per_month
                })
              }
            });
            val.rooms.push(tempRoom.selectedRoom)
          }
        })

      }
    }
  }

  /**
   * 
   * @param selectedRoom 
   * Select Booking Room
   */
  selectBookingRoom(bookingObj, floor) {
    let groupByRoomType = {};
    this.selectedRooms = [];
    bookingObj.floor.forEach(element => {
      element.rooms.forEach(function (room) {
        groupByRoomType[room.room_type] = groupByRoomType[room.room_type] || [];
        groupByRoomType[room.room_type].push({
          _id: room._id, active: room.active, guest: room.guest, is_active: room.is_active, no_of_beds: room.no_of_beds
          , room_number: room.room_number, room_type: room.room_type, room_services: room.room_services
        });
      });
    });

    Object.keys(groupByRoomType).forEach(function (key) {
      var replaced = key.replace(' ', '');
      if (key !== replaced) {
        groupByRoomType[replaced] = groupByRoomType[key];
        delete groupByRoomType[key];
      }
    });
    let bkroom = this.setBookingRoom(groupByRoomType);
    this.selectedRooms = bkroom;
  }

  /**
   * Total Price
   */
  totalRoomPrice() {
    this.total = this.selectedRooms.reduce((sum, val) => sum + val.total_price, 0);
    return this.total;
  }

  /**
   * 
   * @param room 
   * Set Booking Room
   */
  setBookingRoom(room) {
    let bookingRoom = [];
    let singleRoom;
    let doubleRoom;
    let total_room_price = 0;
    let paid_service = 0;
    let total_price = 0;
    let guest = 0;
    let no_of_rooms
    if (room.SingleRoom) {
      no_of_rooms = room.SingleRoom.length;

      room.SingleRoom.map(data => {
        data.room_services.map(res => {
          if (res.base_amount) {
            total_room_price += res.base_amount;
          }
          if (res.paidService) {
            paid_service += res.amount_per_month ? res.amount_per_month : 0;
          }
        })
        guest += data.guest;
        singleRoom = {
          room_type: data.room_type,
          no_of_rooms: no_of_rooms,
          guest: guest,
          total_room_price: total_room_price,
          paid_service: paid_service,
          total_price: total_room_price + paid_service
        }
      })
      bookingRoom.push(singleRoom);
    }
    if (room.DoubleRoom) {
      total_room_price = 0;
      paid_service = 0;
      total_price = 0;
      guest = 0;
      no_of_rooms = room.DoubleRoom.length;
      room.DoubleRoom.map(data => {
        data.room_services.map(res => {
          if (res.base_amount) {
            total_room_price += res.base_amount;
          }
          if (res.paidService) {
            paid_service += res.amount_per_month ? res.amount_per_month : 0;
          }
        })
        guest += data.guest;
        doubleRoom = {
          room_type: data.room_type,
          no_of_rooms: no_of_rooms,
          guest: guest,
          total_room_price: total_room_price,
          paid_service: paid_service,
          total_price: total_room_price + paid_service
        }
      })
      bookingRoom.push(doubleRoom);
    }
    return bookingRoom;
  }


  /**
   * 
   * @param floor 
   * @param bookingObj
   * Book Room 
   */
  bookRoom(floor, bookingObj) {


    // let hostelBookingObj = {
    //   hostel: this.hostelViewObject,
    //   floor: bookingObj.floor,
    // }

    // hostelBookingObj.floor.forEach(element => {
    //   let unCompleted = false;
    //   console.log(element)
    //   // element.forEach(elem => {
    //   //   if (elem.roomStatus != "completed") {
    //   //     unCompleted = true;
    //   //   }
    //   // });
    //   // if (unCompleted) {
    //   //   element.floorStatus = "completed"
    //   // } else {
    //   //   element.floorStatus = ""
    //   // }
    // });
console.log(this.floorsByHostel)
    var data = {
      // hostel_id: this.hostelViewObject.hostel_id._id,
      room: this.hostelViewObject,
      floors: this.removeKeyByBooking(bookingObj).floor,
      total_price: this.total,
      // created_by: this.user
    }

    // console.log(data)
    // this.setBookingFlag(bookingObj)
    this._httpDataService.bookRoom(data).subscribe(
      data => {
      },
      error => this.errorMessage = <any>error)

  }

  // setBookingFlag(bkObj) {
  //   var returnObj = {};
  //   console.log(bkObj)



  //   // this.hostelViewObject.hostel_id
  // }

  /**
   * 
   * @param bookingObj 
   * Remove by booking unwanted object key and value
   */
  removeKeyByBooking(bookingObj) {
    bookingObj.floor.forEach(bkObj => {
      delete bkObj.floor_id
      return bkObj.rooms.forEach(roomObj => {
        // if (elem.guest) {
        //   elem.remainingBeds = elem.no_of_beds - elem.guest;
        //   if (element.remainingBeds == 0) {
        //     element.roomStatus = "completed"
        //   }
        // }
        roomObj.room_id_by_floor = roomObj._id
        delete roomObj._id;
        delete roomObj.is_active;
        delete roomObj.active;
        delete roomObj.no_of_beds;
        delete roomObj.guest;
        delete roomObj.view_type;
        delete roomObj.room_services
        if (roomObj.paid_service && roomObj.paid_service.length == 0) {
          delete roomObj.paid_service
        }
        if (roomObj.free_service && roomObj.free_service.length == 0) {
          delete roomObj.free_service
        }
      });
    });
    return bookingObj
  }


}
