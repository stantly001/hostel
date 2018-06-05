import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpdataService } from '../service/httpdata.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit {

  errorMessage: any;
  userDetail: Object;
  user: any;
  constructor(private router: Router, private route: ActivatedRoute, private _httpDataService: HttpdataService) {
    this._httpDataService.getUserDetails()
      .subscribe((user) => {
        console.log("user>>", user)
        this.userDetail = user;
      });
    if (Object.keys(this.userDetail).length != 0) {
      this.user = this.userDetail["data"].user_name;
    }
  }


  ngOnInit() {

  }

  /**
   * Show Hostel
   */
  showHostel() {
    this.router.navigate(['addHostel'], { relativeTo: this.route })
  }

  /**
   * Show Hostel
   */
  showFilter() {
    this.router.navigate(['filter'], { relativeTo: this.route })
  }

  /**
   * User Logout
   */
  userLogout() {
    this._httpDataService.logOut(this.userDetail).subscribe(data=>{
      sessionStorage.setItem("user", "");
      this.user = "";
      this.router.navigate(['home'])
  
    },
    error => this.errorMessage = <any>error);
    // this.router.navigate(['home'])
  }
}
