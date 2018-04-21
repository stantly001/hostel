import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Array<any>;
  constructor() { }
  addService() {
    this.services.push({isEdit:true,id:null});
    console.log("Services",this.services);
  }

  deleteService(index) {
    this.services.splice(index,1);
  }

  cancelEdit(index,service) {
    if(service.id) {
      service.isEdit = false;
    } else{
      this.services.splice(index,1);
      console.log(this.services);
    }
  }

  ngOnInit() {
    this.services = [];
  }

}
