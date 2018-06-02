import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.css']
})
export class ListReviewsComponent implements OnInit {
  hostelPrice: any;
  queryParam: any;
  @Input('hostelData') hostelObj;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(queyParam => {
      this.queryParam = queyParam;
    });
  }

  ngOnInit() {
    this.setHotelPrice();
  }

  /**
   * Set Hostel Price
   */
  setHotelPrice() {
    this.hostelObj.hostel_services.forEach(element => {
      if (element.base_amount) {
        this.hostelPrice = element.base_amount;
      }
    });
  }

  viewHostel(hostelId) {
    this.router.navigate(['hostelDetailView/' + hostelId], { queryParams: this.queryParam });

  }
}
