import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpdataService } from '../service/httpdata.service';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailviewComponent implements OnInit {

  errorMessage: any;
  hostelViewObject: any;
  hostelId: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private activateRoute: ActivatedRoute,private _httpDataService:HttpdataService) { }

  ngOnInit() {
    this.getParams();
    this.defaultGallerySettings();
  }

  /**
   * Default Gallery Settings
   */
  defaultGallerySettings(){
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageArrows: true
      }
    ];

  }
  /**
   * Get Params From Url
   */
  getParams(){
    this.activateRoute.params.subscribe(res => {
      this.hostelId = res["hostelId"];
      this.getHostelObjectByHostelId(this.hostelId);
    })
  }


  /**
     * get hostel Rooms By hostelId
     */
  getHostelObjectByHostelId(hostelId) {
    this._httpDataService.getHostelRooms(hostelId).subscribe(
      data => {
        this.hostelViewObject = data;
        this.setHostelImage(data)
        console.log("data",data)
      },
      error => this.errorMessage = <any>error)
  }

   /**
   * Set Hostel Image
   */
  setHostelImage(hostel) {
    hostel.hostel_id.images.map(img => {
      return img//{small: img.imgBase64, medium: img.imgBase64, big: img.imgBase64}
    }).forEach(element => {
      console.log(element);
      element.small = element.imgBase64,
        element.medium = element.imgBase64,
        element.big = element.imgBase64
    });
  }
}
