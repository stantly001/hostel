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
  priceByMinMax: any;
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
  priceRange: number[];
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
    this.getFilterData();

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

    // this.priceByMinMax.min=100;
    // this.priceByMinMax.max=1000;
    //   this.properties = response.property;
    //   this.ratings = response.rating[0];
    //   this.ratingRange = [this.ratings['ratingFrom'], this.ratings['ratingTo']];
    //   this.roomTypes = response.roomType;
    //   console.log("--->", this.roomTypes);
    // });

  }

  /**
   * 
   * @param filterType 
   * @param filterTitle
   * Select Filters 
   */
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


  /**
   * Get Filter Data
   */
  getFilterData() {
    this._httpDataService.getAllFilters().subscribe(
      data => {
        this.priceRange = [data.hostel.min, data.hostel.max];
        this.priceByMinMax = data.hostel;
        this.setFilters(data);
        this.filters = data.filterData
      },
      error => this.errorMessage = <any>error)
  }


  /**
   * 
   * @param price 
   * Price Filter
   */
  priceChange(price) {
    let searchPrice = { min: price[0], max: price[1] }
    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);

    if (searchPrice.min) {
      queryParams['priceMin'] = searchPrice.min
    } else {
      queryParams['priceMin'] = null
    }

    if (searchPrice.max) {
      queryParams['priceMax'] = searchPrice.max
    } else {
      queryParams['priceMax'] = null
    }
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
    // this.router.navigate(['hostel'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });

    // this.prices['rangeFrom']=event[0];
    // this.prices['rangeTo']=event[1];
  }


  /**
   * 
   * @param filter 
   * Set Filters
   */
  setFilters(filter) {
    this.activatedRoute.queryParams.subscribe(res => {
      if (res.priceMax && res.priceMin) {
        this.priceRange = [res.priceMin, res.priceMax];
      } else if (res.priceMax) {
        this.priceRange = [filter.hostel.min, res.priceMax];
      } else if (res.priceMin) {
        this.priceRange = [res.priceMin, filter.hostel.max];
      } else {
        this.priceRange = [filter.hostel.min, filter.hostel.max];
      }
      filter.filterData.forEach(element => {
        Object.keys(res).forEach(elem => {
          if (element.field_name == elem) {
            element.filter_types.forEach(filterElem => {
              let queryParamValue=res[elem];
              let queryArray = queryParamValue.replace(/(^"|"$)/g, '').split(',');
              queryArray.forEach(el => {
                if(filterElem.filter_name==el){
                  filterElem.selectedStatus=true;
              }
              });
              
            });
          }
        });
      });
    })
  }



  // ratingChange(event) {
  //   console.log("rating", event)
  //   this.ratings['ratingFrom']=event[0];
  //   this.ratings['ratingTo']=event[1];
  // }

}
