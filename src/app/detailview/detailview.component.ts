import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultsService } from '../services/defaults.service';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailviewComponent implements OnInit {

  hostelViewObject: {};
  hostelId: any;
  constructor(private activateRoute: ActivatedRoute, private defaultsService: DefaultsService) { }

  ngOnInit() {
    /**
     * get hostelId from url
     */
    this.activateRoute.params.subscribe(res => {
      this.hostelId = res["hostelId"];
      console.log(this.hostelId);
      console.log(res);
    })

    /**
     * Call Function
     */
    this.getHostelObjectByHostelId();

  }
  /**
     * get hostel object By hostelId
     */
  getHostelObjectByHostelId() {
    this.defaultsService.getHostels().subscribe(response => {
     this.hostelViewObject=response.filter(res=>res.id==this.hostelId)[0];
     console.log("hostelView",this.hostelViewObject);
     });

    


  }
}
