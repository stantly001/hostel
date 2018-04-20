import { Component, OnInit } from '@angular/core';
import { DefaultsService } from '../services/defaults.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  
  hostels: any;
  constructor(private defaultsService:DefaultsService) { }

  ngOnInit() {
    this.defaultsService.getHostels().subscribe(response => {
      console.log("Hostel",response)
      this.hostels=response;
    })

  }

}
