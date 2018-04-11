import { Component, OnInit } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { DefaultsService } from '../services/defaults.service';
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
  isRating: boolean;
  isPrice: boolean;
  availability: boolean;
  priceRange: number[] = [2, 5];
  ratingRange: number[] = [2, 10];

  availabilities: Array<any> = [];
  countries: Array<any> = [];
  facilities: Array<any> = [];
  guests: Array<any> = [];
  locations: Array<any> = [];
  payments: Array<any> = [];
  prices: Array<any> = [];
  properties: Array<any> = [];
  ratings: Array<any> = [];
  roomTypes: Array<any> = [];
  constructor(private defaultsService: DefaultsService) {
  }

  ngOnInit() {
    console.log("filter Init called...");
    this.availability = false;
    this.isPrice = false;
    this.isRating = false;
    this.isProperty = true;
    this.isRoom = true;
    this.isFacilities = true;
    this.isLocation = true;
    this.isPayment = true;


    this.defaultsService.getFilters().subscribe(response => {

      this.availabilities = response.availability;
      this.countries = response.countries;
      this.facilities = response.facilities;
      this.guests = response.guests;
      this.locations = response.location;
      this.payments = response.payment;
      this.prices = response.price[0];
      this.priceRange = [this.prices['rangeFrom'], this.prices['rangeTo']];
      this.properties = response.property;
      this.ratings = response.rating[0];
      this.ratingRange = [this.ratings['ratingFrom'], this.ratings['ratingTo']];
      this.roomTypes = response.roomType;
      console.log("--->", this.roomTypes);
    });

  }

  priceChange(event) {
    console.log("event", event);
    this.prices['rangeFrom']=event[0];
    this.prices['rangeTo']=event[1];
  }
  ratingChange(event) {
    console.log("rating", event)
    this.ratings['ratingFrom']=event[0];
    this.ratings['ratingTo']=event[1];
  }

}
