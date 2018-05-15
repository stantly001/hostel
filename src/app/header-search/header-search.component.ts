import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit, AfterViewInit {
  datepickeroptions: { format: string; locale: string; };
  checkInDate: Date;
  // checkInDate= new Date(Date.now());
  checkOutDate = new Date(Date.now());
  search = {};
  filter = {};

  countries = [
    { dispName: 'India', fieldName: 'india' },
    { dispName: 'USA', fieldName: 'usa' },
    { dispName: 'UK', fieldName: 'uk' },
    { dispName: 'UAE', fieldName: 'uae' }
  ]
  cities = [
    { dispName: 'Chennai', fieldName: 'chennai' },
    { dispName: 'Mumbai', fieldName: 'mumbai' },
    { dispName: 'Delhi', fieldName: 'delhi' },
    { dispName: 'Bangalore', fieldName: 'bangalore' },
    { dispName: 'Hyderabad', fieldName: 'hyderabad' },
    { dispName: 'Pune', fieldName: 'pune' },
    { dispName: 'Surat', fieldName: 'surat' }
  ]

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {

    this.checkInDate = new Date();
  }

  ngOnInit() {

  }
  ngAfterViewInit() {

  }

  findHostel(search) {
    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);

    if (search.search_country) {
      queryParams['country'] = search.search_country
    } else {
      queryParams['country'] = null
    }

    if (search.search_city) {
      queryParams['city'] = search.search_city
    } else {
      queryParams['city'] = null
    }

    this.router.navigate(['hostel'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });

  }
}
