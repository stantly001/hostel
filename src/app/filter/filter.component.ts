import { Component, OnInit } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  isPayment: boolean;
  isLocation: boolean;
  isFacilities: boolean;
  isRoom: boolean;
  isProperty: boolean;
  isPrice: boolean;
  isRating: boolean;
  availability: boolean;
  priceRange:number[]=[3,7];
  ratingRange:number[]=[3,7];
  constructor() {
    
   }

  ngOnInit() {
    this.availability=false;
    this.isPrice=false;
    this.isRating=false;
    this.isProperty=true;
    this.isRoom=true;
    this.isFacilities=true;
    this.isLocation=true;
    this.isPayment=true;
  }
  priceChange(event){
    console.log("event",event);
  }
  ratingChange(event){
    console.log("rating",event)
  }

}
