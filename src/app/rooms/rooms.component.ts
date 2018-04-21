import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  hostels : Array<any>;
  constructor() { }

  ngOnInit() {
    this.hostels = [
      {
        id:1,
        name: "hostel1",
        floors: 5
      },{
        id:2,
        name: "hostel2",
        floors: 4
      },{
        id:3,
        name: "hostel3",
        floors: 6
      }
    ]
  }

}
