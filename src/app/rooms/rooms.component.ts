import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload/src/interfaces';
import { SelectItem } from 'primeng/primeng'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  newHostel: boolean = false;
  hostelsList: Array<any>;
  hostels: Array<any>;
  hostel: any = {};
  floors: Array<number>;
  services: Array<any>;
  noOfBeds: Array<any>;
  viewTypes: Array<any>;
  src: string = "";


  /**
   * add Hostel
   */
  addHostel() {
    this.hostel = {};
    this.newHostel = true;
  }

  /**
   * 
   * @param value 
   * @param hostel
   * Generate Rooms for Hostel
   */
  generateRooms(value, hostel) {
    hostel.rooms = [];
    if (value != "") {
      let parsedValue = Number(value);
      if (!isNaN(parsedValue)) {
        for (let i = 0; i < parsedValue; i++) {
          hostel.rooms.push({});
        }
      }
    }
  }

  /**
   * Save Hostel
   */
  saveHostel(hostel) {
    this.hostels.push(hostel);
    console.log("Hostel saved--->", this.hostels);
  }

  /**
   * @param index
   * Delete Hostel
   */
  deleteHostel(index) {
    this.hostels.splice(index, 1);
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

  constructor() { }

  ngOnInit() {
    this.hostels = [];
    this.hostel = {rooms: []};
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
        name: "service1"
      }, {
        id: 2,
        name: "service2"
      }, {
        id: 3,
        name: "Service3"
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
