import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.css']
})
export class ListReviewsComponent implements OnInit {
  @Input('hostelData') hostelObj;
  constructor() { }

  ngOnInit() {
    console.log(this.hostelObj)
  }

}
