import { Component, OnInit, NgZone, Input, AfterViewInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload/src/interfaces';
import { HttpdataService } from '../service/httpdata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '@angular/core/src/view';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})

export class RoomsComponent implements OnInit {
  roomTypes: { id: number; name: string; }[];
  isRoom: boolean;
  hostelRooms: any;
  hostelLists: Array<any>;
  errorMessage: any;
  newHostel: boolean = true;
  floor: any;
  // hostelsList: Array<any>;
  hostels: Array<any>;
  hostel: any = { floors: [] };
  floorsList: Array<number>;
  services: Array<any>;
  noOfBeds: Array<any>;
  viewTypes: Array<any>;
  selectedServices = [];
  dropdownSettings = {};
  constructor(private zone: NgZone, private _httpDataService: HttpdataService, private activatedRoute: ActivatedRoute, public router: Router) {
    this.activatedRoute.queryParams.subscribe(res => {
      let hostelId = res.id;
      if (hostelId) {
        this.getRoomDetailsByHostelId(hostelId);
      }
    })
  }

  ngOnInit() {
    this.getServices();
    this.getAllHostels();
    this.hostel = { floors: [], hostel_id: [] };
    // this.getAllRooms();
    this.floor = {};

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
    this.roomTypes = [
      {
        id: 1,
        name: "Single Room",

      }, {
        id: 2,
        name: "Twin Room",
      }, {
        id: 3,
        name: "Double Room",
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
    this.selectedServices = [];
    this._httpDataService.getAllServices().subscribe(
      data => {
        this.services = data;
        this.selectedServices = data;
      }),
      error => { this.errorMessage = <any>error };
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
   * 
   * @param id 
   * Get RoomDetails By HostelId
   */
  getRoomDetailsByHostelId(id) {
    this._httpDataService.getRoomDetailsByHostelId(id).subscribe(data => {
      if (Object.keys(data).length != 0) {
        this.setFloor(data);
        this.hostel = data;
      } else {
        this._httpDataService.getHostelById(id).subscribe(data => {
          this.hostel.hostel_id = data;
          this.setFloor(this.hostel);
        })
      }
      // this.floor = data.floors[0];
    }), error => {
      this.errorMessage = error;
    };
  }


  /**
   * 
   * @param value 
   * Select Floor
   */
  selectFloor(value) {
    this.floor = {};
    let temp = this.hostel.floors.find((floor) => floor.floor_no == value);
    if (temp) {
      this.floor = Object.assign({}, temp);
      // this.floor = temp;
    } else {
      this.floor = { floor_no: value, rooms: [] };
    }
    //hostel.floors.push({floor_no: value,rooms:[]});
  }

  /**
   * 
   * @param hostel 
   * Set Floor
   */
  setFloor(hostel) {
    this.floorsList = [];
    let floorCount = hostel.hostel_id.floors;
    let parsedFloorCount = Number(floorCount);
    if (!isNaN(parsedFloorCount)) {
      for (let i = 0; i < parsedFloorCount; i++) {
        this.floorsList.push(i + 1);
      }
    }
  }

  /**
   * 
   * @param value 
   * @param hostel
   * Generate Rooms for Hostel
   */
  createRooms(floor) {
    floor.rooms = [];
    if (floor.no_of_rooms != "") {
      let parsedValue = Number(floor.no_of_rooms);
      if (!isNaN(parsedValue)) {
        for (let i = 0; i < parsedValue; i++) {
          let roomNumber = this.generateRoomNo(i, 3, floor);
          floor.rooms.push({ room_services: [], is_active: true, room_number: roomNumber });
          this.hostel.hostel_id.hostel_services.forEach(element => {
            let tempObj = Object.assign({}, element)
            floor.rooms[i].room_services.push(tempObj);
          });
          console.log("room Services", floor.rooms[i].room_services, "i--->", i)
          // this.selectedServices.forEach((service) => {
          //   floor.rooms[i].services.push(service);
          // });
          // hostel.rooms[i].services = this.selectedServices;
          // console.log("Rooms",hostel.rooms);
        }

      }
    }
  }

  /**
   * 
   * @param room 
   * @param roomIndex 
   * Delete Room Service
   */
  deleteService(room, roomIndex) {
    room.room_services.splice(roomIndex, 1)
  }

  /**
   * 
   * @param floor 
   * Add Additional Rooms
   */
  checkRoom(floor) {
    if (floor.rooms != "") {
      let no_of_rooms = parseInt(floor.no_of_rooms);
      let roomsLength = floor.rooms.length
      let newRooms = roomsLength - no_of_rooms;
      if (no_of_rooms < roomsLength) {
        this.createRooms(floor);
      } else {
        if (!isNaN(newRooms)) {
          for (let i = roomsLength; i < no_of_rooms; i++) {
            let roomNumber = this.generateRoomNo(i, 3, floor);
            floor.rooms.push({ room_services: [], is_active: true, room_number: roomNumber });
            this.hostel.hostel_id.hostel_services.forEach(element => {
              let tempObj = Object.assign({}, element)
              floor.rooms[i].room_services.push(tempObj);
            });
          }

        }
      }
    }
  }

  /**
   * Apply changes to selected floor
   */
  applyFloor(hostel, newFloor) {
    let temp = this.hostel.floors.find((floor) => floor.floor_no == newFloor.floor_no);
    if (!temp) {
      hostel.floors.push(newFloor);
      this.floor = {};
    } else {
      hostel.floors = newFloor;
      this.floor = {};
    }
  }

  /**
   * 
   * @param room 
   * Add Service
   */
  addService(room) {
    room.room_services.push({})
  }

  /**
   * 
   * @param hostel 
   * Remove Base64
   */
  removeBase64(hostel){
    hostel.images.forEach(element => {
      if(element.imgBase64){
      delete element.imgBase64; 
      }
    });
  }


  /**
   * 
   * @param room 
   * @param floor 
   * Save Hostel
   */
  saveHostel(room, floor) {
    // this.applyFloor(hostel, floor);
    let user = JSON.parse(sessionStorage.getItem("user"));
    room.created_by = user.data;
    this.newHostel = false;
    if (room._id) {
      this.removeBase64(room.hostel_id);
      return this._httpDataService.updateRoom(room).subscribe(data => {
        // this.getAllRooms();
        console.log(data);
        // this.router.navigate(["/"])
      },
        error => this.errorMessage = <any>error)

    } else {
      this.removeBase64(room.hostel_id);
      return this._httpDataService.saveRoom(room).subscribe(data => {
        // this.getAllRooms();
        console.log(data);
      },
        error => this.errorMessage = <any>error)
    }
  }

  /**
   * 
   * @param viewType 
   * @param room 
   * Assigning selected view Type to room
   */
  selectViewType(viewType, room) {
    room.view_type = viewType;
  }

  /**
   * 
   * @param number 
   * @param length 
   * Generate Room Number
   */
  generateRoomNo(number, length, floor) {
    var str = '' + floor.floor_no;
    while (str.length < length) {
      if (number < 10) {
        str = str + "0" + number;
      } else {
        str = str + number;
      }
    }
    return str;
  }




}
