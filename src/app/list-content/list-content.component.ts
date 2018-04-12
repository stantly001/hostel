import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})
export class ListContentComponent implements OnInit {
  @Input('hostelData') hostelObj;
  constructor() { }

  ngOnInit() {
    console.log(this.hostelObj)
  }

}
