import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit {

  user: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    let sessionDetails = JSON.parse(sessionStorage.getItem("user"));
    console.log("sessionDetails",sessionDetails)
    if (sessionStorage.getItem("user")) {
      // 
      // this.user = sessionDetails.data.user_name;
    }

    console.log(this.user)
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
    sessionStorage.setItem("user", "");
    this.user="";
    this.router.navigate(['home'])
  }
}
