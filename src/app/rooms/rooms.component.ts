import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload/src/interfaces';
import { HttpdataService } from '../service/httpdata.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  hostelRooms: any;
  hostelLists: Array<any>;
  errorMessage: any;
  newHostel: boolean = true;
  // hostelsList: Array<any>;
  // hostels: Array<any>;
  hostel: any = {};
  floors: Array<number>;
  services: Array<any>;
  noOfBeds: Array<any>;
  viewTypes: Array<any>;
  selectedServices = [];
  dropdownSettings = {};

  constructor(private _httpDataService: HttpdataService) { }

  ngOnInit() {
    this.getServices();
    this.getAllHostels();
    this.getAllRooms();
    this.hostel = { rooms: [] };
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'service_name',
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
  }
  /**
    * Get All Services
    */
  getServices() {
    this._httpDataService.getAllServices().subscribe(
      data => this.services = data,
      error => this.errorMessage = <any>error)
  }

  /**
     * Get All Hostels
     */
  getAllHostels(): void {
    this._httpDataService.getAllHostelData().subscribe(
      data => this.hostelLists = data,
      error => this.errorMessage = <any>error)
  }

  /**
   * get All Rooms
   */
  getAllRooms(){
    this._httpDataService.getAllRooms().subscribe(
      data => this.hostelRooms = data,
      error => this.errorMessage = <any>error)
  }



  /**
   * 
   * @param hostel 
   * Set Floor
   */
  setFloor(hostel) {
    this.floors = [];
    let floorCount = hostel.hostel_list.floors;
    let parsedFloorCount = Number(floorCount);
    if(!isNaN(parsedFloorCount)) {
      for(let i=0; i<parsedFloorCount; i++) {
        this.floors.push(i+1);
      }
    }
    console.log("Hostel Obj", hostel);
  }




  /**
   * 
   * @param value 
   * @param hostel
   * Generate Rooms for Hostel
   */
  createRooms(hostel) {
    hostel.rooms = [];
    if (hostel.no_of_rooms != "") {
      let parsedValue = Number(hostel.no_of_rooms);
      if (!isNaN(parsedValue)) {
        for (let i = 0; i < parsedValue; i++) {
          let roomNumber = this.pad(i, 3);
          hostel.rooms.push({ services: [], is_active: true, room_number: roomNumber });
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
    this.newHostel = false;
    return this._httpDataService.saveRoom(hostel).subscribe(data => {
      this.getAllRooms();
      console.log(data);
    },
      error => this.errorMessage = <any>error)

    // console.log("Hostel saved--->", hostel);
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
    room.view_type = viewType;
  }

  pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }



}
