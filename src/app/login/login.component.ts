import { Component, OnInit } from '@angular/core';

import { HttpdataService } from '../service/httpdata.service';
import { Router, ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpdataService]
})
export class LoginComponent implements OnInit {
  login = {};
  loginForms: any[];
  errorMessage: string;
  constructor(private _httpDataService: HttpdataService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
  }

  /**
   * 
   * @param login 
   */
  authSubmit(login) {
    if (login) {
      this._httpDataService.authUserLogin(login).subscribe(
        data => {
          sessionStorage.setItem("user", JSON.stringify(data));
          let userId = data.data._id;
          this.route.navigate(["/hostel"], { queryParams: { "userId": userId } });
          console.log(data)
        },
        error => this.errorMessage = <any>error)
    }
  }
}
