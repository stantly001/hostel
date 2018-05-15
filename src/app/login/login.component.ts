import { Component, OnInit, Output } from '@angular/core';

import { HttpdataService } from '../service/httpdata.service';
import { Router, ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpdataService]
})
export class LoginComponent implements OnInit {
  loginUsers=[];
  login={};
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
    console.log(login);
    if (login) {
      this._httpDataService.authUserLogin(login).subscribe(
        data => {
          if(data.data.isValid==true){
          sessionStorage.setItem("user", JSON.stringify(data));
          let userId = data.data._id;
          this.loginUsers = data;//.push(data});
          this.route.navigate(["admin/hostel/addHostel"]);
          }
          console.log(data)
        },
        
        error => this.errorMessage = <any>error)
    }
  }

}
