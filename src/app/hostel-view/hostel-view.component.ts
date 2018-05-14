import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hostel-view',
  templateUrl: './hostel-view.component.html',
  styleUrls: ['./hostel-view.component.css']
})
export class HostelViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    alert("hostel search")
  }

}
