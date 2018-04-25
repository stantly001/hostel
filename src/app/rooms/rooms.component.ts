import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload/src/interfaces';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  newHostel: boolean = true;
  hostelsList: Array<any>;
  // hostels: Array<any>;
  hostel: any = {};
  floors: Array<number>;
  services: Array<any>;
  noOfBeds: Array<any>;
  viewTypes: Array<any>;
  selectedServices = [];
  dropdownSettings = {};


  /**
   * add Hostel
   */
  // addHostel() {
  //   this.hostel = {};
  //   this.newHostel = true;
  // }

  /**
   * 
   * @param value 
   * @param hostel
   * Generate Rooms for Hostel
   */
  createRooms(hostel) {
    hostel.rooms = [];
    if (hostel.noOfRooms != "") {
      let parsedValue = Number(hostel.noOfRooms);
      if (!isNaN(parsedValue)) {
        for (let i = 0; i < parsedValue; i++) {
          let roomNumber = this.pad(i,3);
          hostel.rooms.push({ services: [], isActive: true, roomNumber: roomNumber});
          this.selectedServices.forEach((service) => {
            hostel.rooms[i].services.push(service);
          });
          // hostel.rooms[i].services = this.selectedServices;
          // console.log("Rooms",hostel.rooms);
        }

      }
    }
  }

  onServiceSelect(service: any) {
    this.selectedServices.push(service);
  }

  onSelectAll(services: any) {
    this.selectedServices = [];
    this.selectedServices.push(services);
  }

  onRoomServiceSelect(service: any, room) {
    //this.selectedServices.push(service);
    room.services.push(service)
  }

  onRoomSelectAll(services: any, room) {
    room.services = [];
    room.services.push(services);
    console.log("Services", services);
  }

  /**
   * Save Hostel
   */
  saveHostel(hostel) {
    // this.hostels.push(hostel);
    this.newHostel = false;
    console.log("Hostel saved--->", hostel);
  }

  /**
   * @param index
   * Delete Hostel
   */
  deleteHostel(index) {

  }

  /**
   * 
   * @param hostel 
   * Edit Hostel
   */
  editHostel(hostel) {

  }

  /**
   * 
   * @param index 
   * @param hostel 
   * Cancels The Edit Operation
   */
  cancelEdit(index, hostel) {
    // if (hostel.id) {
    //   hostel.isEdit = false;
    // } else {
    //   this.hostels.splice(index, 1);
    // }
  }

  /**
   * 
   * @param viewType 
   * @param room 
   * Assigning selected view Type to room object
   */
  selectViewType(viewType, room) {
    room.viewTypeLabel = viewType.label;
    room.viewTypeImage = viewType.img;
  }

  pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  constructor() { }

  ngOnInit() {
    this.hostel = { rooms: [] };
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.viewTypes = [
      {
        id: 1,
        img: "assets/images/square.png",
        label: "square",

      }, {
        id: 2,
        img: "assets/images/rectangle.png",
        label: "rectangle",
      }, {
        id: 3,
        img: "assets/images/circle.png",
        label: "circle",
      }
    ];
    this.noOfBeds = [
      1, 2, 3, 4, 5
    ];
    this.services = [
      {
        id: 1,
        name: "Air Conditioning"
      }, {
        id: 2,
        name: "Fan"
      }, {
        id: 3,
        name: "Bed"
      }, {
        id: 4,
        name: "TV"
      }, {
        id: 5,
        name: "Washing Machine"
      }
    ];
    this.hostelsList = [
      {
        id: 1,
        name: "hostel1",
        floors: 5
      }, {
        id: 2,
        name: "hostel2",
        floors: 4
      }, {
        id: 3,
        name: "hostel3",
        floors: 6
      }
    ];
    this.floors = [
      1, 2, 3, 4, 5, 6
    ];
  }

}
