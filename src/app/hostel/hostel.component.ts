import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import Globals from '../utils/globals';
import { Hostel } from '../model/hostel';
// import { HttpEventType } from '@angular/common/http';
import { HttpdataService } from '../service/httpdata.service';


@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.component.html',
  styleUrls: ['./hostel.component.css'],
  providers: [HttpdataService]
})
export class HostelComponent implements OnInit {
  isService: boolean;
  hostelServices: Array<any>;
  dropdownSettings = {};
  dropdownList = [];
  services: any;
  errorMessage: string;
  hostels: Hostel[];
  hostel = { images: [],hostelServices:[]};
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
  constructor(private _httpDataService: HttpdataService) {

  }

  ngOnInit() {
    this.isService = false;
    // this.hostelServices = []
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
   * Save Hostel
   */
  save = (hostel) => {
    console.log("hostel",hostel)
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
    console.log("user",user);
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
    console.log("item", item)
    console.log("Native Element", this.multiselect)
    this.isService = true;
    this.hostel.hostelServices.push(item);
    console.log("ss",this.hostel.hostelServices)
  }
  onSelectAll(items: any) {
    this.isService = true;
    this.hostel.hostelServices = items;
  }
  onDeSelect(item: any) {
    this.hostel.hostelServices.forEach(element => {
      if (element._id == item._id) {
        var index = this.hostel.hostelServices.indexOf(element._id)
        this.hostel.hostelServices.splice(index, 1)
      }
    });

  }
  onDeSelectAll(items: any) {
    this.hostel.hostelServices = items;
  }
}
