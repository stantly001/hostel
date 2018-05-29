import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.css']
})
export class ListReviewsComponent implements OnInit {
  hostelPrice: any;
  @Input('hostelData') hostelObj;
  constructor() { }

  ngOnInit() {
   this.setHotelPrice();
  }
  
  /**
   * Set Hostel Price
   */
  setHotelPrice(){
    this.hostelObj.hostel_services.forEach(element => {
      if(element.base_amount){
        this.hostelPrice=element.base_amount;
      }
    });
  }

}
