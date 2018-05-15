import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit {

  user: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    if (sessionStorage.getItem("user")) {
      let sessionDetails = JSON.parse(sessionStorage.getItem("user"));
      this.user = sessionDetails.data.user_name;
    }

    console.log(this.user)
  }

  ngOnInit() {

  }

  showHostel() {
    this.router.navigate(['addHostel'], { relativeTo: this.route })
  }

  showFilter() {
    this.router.navigate(['filter'], { relativeTo: this.route })
  }
  userLogout() {
    sessionStorage.setItem("user", "");
    this.user="";
    this.router.navigate(['hostel'], { relativeTo: this.route })
  }
}
