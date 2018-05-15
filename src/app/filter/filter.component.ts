import { Component, OnInit } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { HttpdataService } from '../service/httpdata.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  errorMessage: any;
  filters = [];
  filter = {};
  // isPayment: boolean;
  // isLocation: boolean;
  // isFacilities: boolean;
  // isRoom: boolean;
  // isProperty: boolean;
  isRating: boolean;
  isPrice: boolean;
  // availability: boolean;
  priceRange: number[] = [2, 5];
  ratingRange: number[] = [2, 10];

  // availabilities: Array<any> = [];
  // countries: Array<any> = [];
  // facilities: Array<any> = [];
  // guests: Array<any> = [];
  // locations: Array<any> = [];
  // payments: Array<any> = [];
  // prices: Array<any> = [];
  // properties: Array<any> = [];
  // ratings: Array<any> = [];
  // roomTypes: Array<any> = [];
  constructor(private _httpDataService: HttpdataService, private activatedRoute: ActivatedRoute,
    private router: Router) {


  }


  ngOnInit() {
    console.log("filter Init called...");

    this._httpDataService.getAllFilters().subscribe(
      data => this.filters = data,
      error => this.errorMessage = <any>error)
    // this.availability = false;
    // this.isPrice = false;
    // this.isRating = false;
    // this.isProperty = true;
    // this.isRoom = true;
    // this.isFacilities = true;
    // this.isLocation = true;
    // this.isPayment = true;


    // this.defaultsService.getFilters().subscribe(response => {

    //   this.availabilities = response.availability;
    //   this.countries = response.countries;
    //   this.facilities = response.facilities;
    //   this.guests = response.guests;
    //   this.locations = response.location;
    //   this.payments = response.payment;
    //   this.prices = response.price[0];
    this.priceRange = [20, 600];
    //   this.properties = response.property;
    //   this.ratings = response.rating[0];
    //   this.ratingRange = [this.ratings['ratingFrom'], this.ratings['ratingTo']];
    //   this.roomTypes = response.roomType;
    //   console.log("--->", this.roomTypes);
    // });

  }

  selectFilters(filterType: any, filterTitle: string) {
    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    if (!this.filter[filterTitle]) {
      this.filter[filterTitle] = []
    }
    if (filterType.selectedStatus == true) {
      this.filter[filterTitle].push(filterType.filter_name)
    } else {
      const index: number = this.filter[filterTitle].indexOf(filterType.filter_name)
      this.filter[filterTitle].splice(index, 1)
    }
    if (this.filter[filterTitle].length) {
      queryParams[filterTitle] = JSON.stringify(this.filter[filterTitle].join(","))
    } else {
      queryParams[filterTitle] = null
    }
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }


  // priceChange(event) {
  //   console.log("event", event);
  //   this.prices['rangeFrom']=event[0];
  //   this.prices['rangeTo']=event[1];
  // }
  // ratingChange(event) {
  //   console.log("rating", event)
  //   this.ratings['ratingFrom']=event[0];
  //   this.ratings['ratingTo']=event[1];
  // }

}
