import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import Globals from '../utils/globals';
import { HttpdataService } from '../service/httpdata.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
  providers: [HttpdataService]
})
export class FilterFormComponent implements OnInit {
  filters: any[];
  subtitle: boolean;
  errorMessage: string;
  clicked: boolean;
  filter = { filter_types: [] };
  services: Array<any>;
  constructor(private _httpDataService: HttpdataService) { }

  ngOnInit() {
    this.getServices();
    this.getData();
  }

  getData(): void {
    this._httpDataService.getAllFilters().subscribe(
      data => this.filters = data,
      error => this.errorMessage = <any>error)
  }

  addFilter() {
    this.filter.filter_types.push({})
  }
  
  getServices() {
    this._httpDataService.getAllServices().subscribe(
      data => {
        this.services = data;
        console.log("service", this.services);
      }),
      error => { this.errorMessage = <any>error };
  }

  selectService(value, filter_type) {
    filter_type.filter_name = value.service_name;
  }

  save = (filter) => {
    console.log("filter",filter)
    this._httpDataService.addFilterdata(filter).subscribe(
      data => {
        this.getData()
      },
      error => this.errorMessage = <any>error)   
  }

  delete = (filter_type, index) => {
    console.log(filter_type);
    this._httpDataService.deleteFilterdata(filter_type).subscribe(
      data => {
        this.filters.splice(index, 1);
      },
      error => this.errorMessage = <any>error)
  }

  update(user, index) {
    this.filter = user;
    console.log(user);
  }

}
