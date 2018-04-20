import { Component, OnInit } from '@angular/core';
import Globals  from '../utils/globals';
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
  errorMessage: string;
  hostels: Hostel[];
  hostel = { images: [] };
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
  constructor(private _httpDataService: HttpdataService) {

  }

  ngOnInit() {
    this.getData()
    console.log(this.hostels)
    console.log(Globals.baseAppUrl)
  }


  getData(): void {
    this._httpDataService.getAllHostelData().subscribe(
      data => this.hostels = data,
      error => this.errorMessage = <any>error)
    console.log(this.hostels);
  }


  onFileSelected = (event) => {
    this.selectedFile = <File>event.target.files[0];
  }

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

  save = (hostel) => {
    this._httpDataService.addHosteldata(hostel).subscribe(
      data => {
        this.getData()
      },
      error => this.errorMessage = <any>error)
  }

  delete = (x, index) => {
    console.log(x);
    this._httpDataService.deleteHosteldata(x).subscribe(
      data => {
        this.hostels.splice(index, 1);
        // console.log(x)
      },
      error => this.errorMessage = <any>error)
    //  this.hostels.splice(i,1);
    //  console.log(i);
  }

//   update(x,index) {
//     this._httpDataService.updateHosteldata(x).subscribe(
//       data => {
//         this.hostel = index;
//       },
//       error => this.errorMessage = <any>error)
// }

}
