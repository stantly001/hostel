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
  filters: any[];
  subtitle: boolean;
  errorMessage: string;
  filter={filter_types:[]};
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

  addFilter(){
    this.filter.filter_types.push({filter_name:''})
  }
  
filterOne=<any>[];
  
  save = (filter) => {
    console.log(filter);
    
    this._httpDataService.addFilterdata(filter).subscribe(
      data => {
        this.getData()
      },
      error => this.errorMessage = <any>error)
  }
  
}
