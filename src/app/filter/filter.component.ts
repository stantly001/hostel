import { Component, OnInit } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  someRange=[3,7];
  constructor() {
    
   }

  ngOnInit() {
    
  }

}
