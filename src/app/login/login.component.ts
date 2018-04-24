import { Component, OnInit } from '@angular/core';

import { HttpdataService } from '../service/httpdata.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpdataService]
})
export class LoginComponent implements OnInit {
  login:any;
  loginForms: any[];
  errorMessage: string;
  constructor(private _httpDataService: HttpdataService) { }

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
         console.log(data)
        },
        error => this.errorMessage = <any>error)
    }
  }
}
