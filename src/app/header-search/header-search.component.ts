import { Component, OnInit, AfterViewInit } from '@angular/core';

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

  constructor() {
    
    this.checkInDate = new Date();
    console.log(this.checkInDate)
  }

  ngOnInit() {
   
  }
  ngAfterViewInit() {
    
  }
 

}
