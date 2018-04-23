import { Component, OnInit } from '@angular/core';
import { HttpdataService } from '../service/httpdata.service';

@Component({
  selector: 'app-hostel-service',
  templateUrl: './hostel-service.component.html',
  styleUrls: ['./hostel-service.component.css']
})
export class HostelServiceComponent implements OnInit {

  errorMessage: any;
  services:Array<any>;
  constructor(private _httpDataService: HttpdataService) { }
  ngOnInit() {
    this.getData();
  }

  /**
   * Get All Services
   */
  getData(){
    this._httpDataService.getAllServices().subscribe(
      data => this.services = data,
      error => this.errorMessage = <any>error)
  }

  /**
   * Add Service
   */
  addService() {
    this.services.push({ isEdit: true });
    console.log("Services", this.services);
  }

  /**
   *Save Service
   */
  saveService(service) {
    if(service._id){
      this._httpDataService.updateService(service).subscribe(
        data => {
          this.getData()
        },
        error => this.errorMessage = <any>error)
      
    }else{
    this._httpDataService.saveService(service).subscribe(
      data => {
        this.getData()
      },
      error => this.errorMessage = <any>error)
    }
  }

  /**
   * 
   * @param index 
   * Delete Service
   */
  deleteService(index,service) {
    this._httpDataService.deleteService(service).subscribe(
      data => {
        this.services.splice(index, 1);
      },
      error => this.errorMessage = <any>error)
  }

  /**
   * 
   * @param index 
   * @param service 
   * Cancel Service
   */
  cancelEdit(index, service) {
    if (service.id) {
      service.isEdit = false;
    } else {
      this.services.splice(index, 1);
      console.log(this.services);
    }
  }

}
