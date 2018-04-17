import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit {

  constructor(private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  showHostel(){
    this.router.navigate(['addHostel'], {relativeTo: this.route})
  }

  showFilter(){alert(1)
    this.router.navigate(['filter'], {relativeTo: this.route})
  }

}
