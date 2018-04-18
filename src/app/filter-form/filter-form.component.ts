import { Component, OnInit } from '@angular/core';

import { Globals } from '../utils/globals';

import { HttpdataService } from '../service/httpdata.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
  providers: [Globals, HttpdataService]
})
export class FilterFormComponent implements OnInit {
  subtitle: boolean;
  errorMessage: string;
  filter={};
  constructor(private _globals: Globals, private _httpDataService: HttpdataService) { }

  ngOnInit() {
    this.getData();
    console.log("Form --FIlter")
  }

  getData(): void {
    this._httpDataService.getAllHostelData().subscribe(
      data => this.filters = data,
      error => this.errorMessage = <any>error)
      console.log(this.filters);
  }

  filters=[];
  addFilter(){
    this.filters.push({name:"arun"})
  }
  
 
filterOne=<any>[];
  
  save = (filter) => {
    console.log(filter);
    this.filterOne.push({filter})
    console.log("filter-->",this.filterOne);
    this._httpDataService.addFilterdata(this.filterOne).subscribe(
      data => {
        this.getData()
      },
      error => this.errorMessage = <any>error)
  }
  
}
