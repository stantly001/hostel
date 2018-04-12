import { Component, OnInit, Input } from '@angular/core';
import {NgxGalleryOptions, NgxGalleryImage} from 'ngx-gallery';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})
export class ListContentComponent implements OnInit {
  @Input('hostelData') hostelObj;
  galleryOptions : NgxGalleryOptions[];
  galleryImages : NgxGalleryImage[];
  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width : '257px',
        height : '200px',
        thumbnailsColumns : 4,
        imageArrows : true
      }
    ];
   
  }

}
