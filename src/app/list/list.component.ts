import { Component, OnInit } from '@angular/core';
import { HttpdataService } from '../service/httpdata.service';
import { QueryService } from '../service/query.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [QueryService]
})
export class ListComponent implements OnInit {


  errorMessage: any;
  hostels: any;
  constructor(private _httpDataService: HttpdataService, private _queryService: QueryService, private activatedRoute: ActivatedRoute) {
    this.getFilterHostelData()
  }

  ngOnInit() {
  
  }

  /**
   * Get Filtered Hostel Data
   */
  getFilterHostelData() {
    this.activatedRoute.queryParams.subscribe(params => {
      this._queryService.getFilterData(params).subscribe(
        data => this.hostels = data,
        error => console.log(error)
      )
      // return params
    })
  }

}
