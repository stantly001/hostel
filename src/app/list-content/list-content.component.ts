import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})
export class ListContentComponent implements OnInit {
  src: string;
  @Input('hostelData') hostelObj;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private domSanitizer: DomSanitizer) {

  }
  ngOnInit() {
    this.defaultGallerySettings();
    this.setHostelImage();

  }


  /**
   * Set Hostel Image
   */
  setHostelImage() {
    this.hostelObj.images.map(img => {
      return img//{small: img.imgBase64, medium: img.imgBase64, big: img.imgBase64}
    }).forEach(element => {
      element.small = element.imgBase64,
        element.medium = element.imgBase64,
        element.big = element.imgBase64
    });
  }

  /**
   * Default Gallery Settings
   */
  defaultGallerySettings() {
    this.galleryOptions = [
      {
        width: '257px',
        height: '200px',
        thumbnailsColumns: 4,
        imageArrows: true
      }
    ];

  }

}
