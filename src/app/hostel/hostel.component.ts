import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Globals from '../utils/globals';
import { Hostel } from '../model/hostel';
import { AgmCoreModule } from '@agm/core';
// import { HttpEventType } from '@angular/common/http';
import { HttpdataService } from '../service/httpdata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.component.html',
  styleUrls: ['./hostel.component.css'],
  providers: [HttpdataService]
})
export class HostelComponent implements OnInit {

  selectedItems: any;
  lat: number = 51.678418;
  lng: number = 7.809007;

  isService: boolean;
  //  hostel_services: Array<any>;
  dropdownSettings = {};
  dropdownList = [];
  services: any;
  errorMessage: string;
  hostels: Hostel[];
  clicked: boolean;
  hostel = { images: [], hostel_services: [] };
  uploadedPath = {}
  selectedFile: File = null;
  countries = [
    { dispName: 'India', fieldName: 'india' },
    { dispName: 'USA', fieldName: 'usa' },
    { dispName: 'UK', fieldName: 'uk' },
    { dispName: 'UAE', fieldName: 'uae' }
  ]
  cities = [
    { dispName: 'Chennai', fieldName: 'chennai' },
    { dispName: 'Mumbai', fieldName: 'mumbai' },
    { dispName: 'Delhi', fieldName: 'delhi' },
    { dispName: 'Bangalore', fieldName: 'bangalore' },
    { dispName: 'Hyderabad', fieldName: 'hyderabad' },
    { dispName: 'Pune', fieldName: 'pune' },
    { dispName: 'Surat', fieldName: 'surat' }
  ]
  states = [
    { dispName: 'Tamil Nadu', fieldName: 'tamilNadu' },
    { dispName: 'Maharashtra', fieldName: 'maharashtra' },
    { dispName: 'Delhi', fieldName: 'delhi' },
    { dispName: 'Karnataka', fieldName: 'karnataka' },
    { dispName: 'Telangana', fieldName: 'telangana' },
    { dispName: 'Gujarat', fieldName: 'gujarat' },
    { dispName: 'Rajasthan', fieldName: 'rajasthan' },
    { dispName: 'Bihar', fieldName: 'bihar' }
  ]
  @ViewChild('multiselect') multiselect: any;
  constructor(private _httpDataService: HttpdataService, private router: Router) {

  }

  ngOnInit() {
    this.isService = false;
    // this.hostelServices = []
    this.selectedItems = []
    this.getData()
    this.getAllServices()
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'service_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    console.log(this.hostels)
    console.log(Globals.baseAppUrl)
  }

  /**
   * Get Data
   */
  getData(): void {
    this._httpDataService.getAllHostelData().subscribe(
      data => this.hostels = data,
      error => this.errorMessage = <any>error)
    console.log(this.hostels);
  }


  /**
   * File Selection
   */
  onFileSelected = (event) => {
    this.selectedFile = <File>event.target.files[0];
  }

  /**
   * Upload File
   */
  onUploadFile = (hostel) => {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this._httpDataService.onUploadFile(fd).subscribe(
      data => {
        this.uploadedPath = data.data;
        hostel.images.push(this.uploadedPath);
      },
      error => this.errorMessage = <any>error)
  }


  /**
   * 
   * @param hostel 
   * Remove imgBase64
   */
  removeBase64(hostel) {
    hostel.images.forEach(element => {
      if (element.imgBase64) {
        delete element.imgBase64;
      }
    });
  }

  /**
   * Save Hostel
   */
  save = (hostel) => {
    this.removeBase64(hostel);
    if (hostel._id) {
      this._httpDataService.updateHosteldata(hostel).subscribe(
        data => {
          this.getData()
        },
        error => this.errorMessage = <any>error)
    } else {
      this._httpDataService.addHosteldata(hostel).subscribe(
        data => {
          this.getData()
        },
        error => this.errorMessage = <any>error)
    }
  }

  /**
   * Delete Hostel
   */
  delete = (user, index) => {
    console.log(user);
    console.log(index);
    this._httpDataService.deleteHosteldata(user).subscribe(
      data => {
        this.hostels.splice(index, 1);
        // console.log(x)
      },
      error => this.errorMessage = <any>error)
    //  this.hostels.splice(i,1);
    //  console.log(i);
  }

  /**
   * 
   * @param user 
   * @param index
   * Update Hostel 
   */
  update(user, index) {
    this.hostel = user;
    user.hostel_services.forEach(element => {
      this.selectedItems.push(element.service);
    });

    console.log("user", user);
  }

  /**
   * 
   * @param hostel 
   * Set Routing Params For Rooms
   */
  setParams(hostel) {
    // if(hostel) {
    //   this.router.navigate(['/viewRooms'], { queryParams: { id: hostel._id} });
    // } else {
    this.router.navigate(['../viewRooms']);
    // }

  }

  /**
   * Get All Services
   */
  getAllServices() {
    this._httpDataService.getAllServices().subscribe(
      data => this.services = data,
      error => this.errorMessage = <any>error)
  }

  //Multiselect Onslect and OnselectAll 
  onItemSelect(item: any) {
    this.isService = true;
    console.log(item)
    this.hostel.hostel_services.push({ service: item });
    console.log(this.hostel)
  }

  onSelectAll(items: any) {
    this.isService = true;
    items.map(item => {
      return { service: item }
    }).forEach(item => this.hostel.hostel_services.push(item))
  }

  onDeSelect(item: any) {
    this.hostel.hostel_services.forEach(element => {
      if (element.service._id == item._id) {
        var index = this.hostel.hostel_services.indexOf(element)
        this.hostel.hostel_services.splice(index, 1)
      }
    });

  }
  onDeSelectAll(items: any) {
    this.hostel.hostel_services = items;
  }
}
