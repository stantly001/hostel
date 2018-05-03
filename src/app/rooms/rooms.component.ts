import { Component, OnInit, NgZone } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload/src/interfaces';
import { HttpdataService } from '../service/httpdata.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  isRoom: boolean;
  hostelRooms: any;
  hostelLists: Array<any>;
  errorMessage: any;
  newHostel: boolean = true;
  floor: any;
  // hostelsList: Array<any>;
  // hostels: Array<any>;
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
    this.hostel = { floors: [] };
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
        console.log("selectedServices", this.selectedServices);
        console.log("service", this.services);
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
   * get All Rooms
   */
  // getAllRooms(){
  //   this._httpDataService.getAllRooms().subscribe(
  //     data => this.hostelRooms = data,
  //     error => this.errorMessage = <any>error)
  // }

  /**
   * 
   * @param id 
   * Get RoomDetails By HostelId
   */
  getRoomDetailsByHostelId(id) {
    this._httpDataService.getRoomDetailsByHostelId(id).subscribe(data => {
      if (Object.keys(data).length != 0) {
        console.log("DSFSFSFS", data)
        this.setFloor(data);
        this.hostel = data;
      }
      // this.floor = data.floors[0];
      console.log('hostel', data);
    }), error => {
      this.errorMessage = error;
    };
  }



  selectFloor(value) {
    this.floor = {};
    console.log("Floors", this.hostel.floors);
    let temp = this.hostel.floors.find((floor) => floor.floor_no == value);
    console.log("temp", temp);
    if (temp) {
      this.floor = Object.assign({}, temp);
      // this.floor = temp;
    } else {
      console.log("test")
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
    console.log("Hostel ID", hostel);
    this.floorsList = [];
    let floorCount = hostel.hostel_id.floors;
    let parsedFloorCount = Number(floorCount);
    if (!isNaN(parsedFloorCount)) {
      for (let i = 0; i < parsedFloorCount; i++) {
        this.floorsList.push(i + 1);
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
  createRooms(floor) {
    floor.rooms = [];
    if (floor.no_of_rooms != "") {
      let parsedValue = Number(floor.no_of_rooms);
      if (!isNaN(parsedValue)) {
        for (let i = 0; i < parsedValue; i++) {
          let roomNumber = this.pad(i, 3);
          floor.rooms.push({ room_services: [], is_active: true, room_number: roomNumber });
          this.hostel.hostel_id.hostel_services.forEach(element => {
            floor.rooms[i].room_services=this.hostel.hostel_id.hostel_services;
          });
          console.log("room Services",floor.rooms[i].room_services)
          // this.selectedServices.forEach((service) => {
          //   floor.rooms[i].services.push(service);
          // });
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
   * Apply changes to selected floor
   */
  applyFloor(hostel, newFloor) {
    let temp = this.hostel.floors.find((floor) => floor.floor_no == newFloor.floor_no);
    if (!temp) {
      hostel.floors.push(newFloor);
      this.floor = {};
    } else {
      temp = newFloor;
      this.floor = {};
    }
    console.log("hostel-->",hostel)
  }

  /**
   * Save Hostel
   */
  saveHostel(hostel, floor) {
    // this.applyFloor(hostel, floor);
    console.log("Hostel", hostel);
    let user = JSON.parse(sessionStorage.getItem("user"));
    hostel.created_by = user.data;
    this.newHostel = false;
    if (hostel._id) {
      return this._httpDataService.updateRoom(hostel).subscribe(data => {
        // this.getAllRooms();
        console.log(data);
        // this.router.navigate(["/"])
      },
        error => this.errorMessage = <any>error)

    } else {
      return this._httpDataService.saveRoom(hostel).subscribe(data => {
        // this.getAllRooms();
        console.log(data);
      },
        error => this.errorMessage = <any>error)
    }
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
    console.log("RoomType", room);
  }

  pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }



}
