import { Component, OnInit } from '@angular/core';

import { HttpdataService } from '../service/httpdata.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpdataService]
})
export class LoginComponent implements OnInit {
  login={};
  loginForms: any[];
  errorMessage: string;
  constructor(private _httpDataService: HttpdataService) { }

  ngOnInit() {
  }

  getData(): void {
    this._httpDataService.getAllLoginData().subscribe(
      data => this.loginForms = data,
      error => this.errorMessage = <any>error)
  }

  save(login) {
    if (login) {
      this._httpDataService.addLogindata(login).subscribe(
        data => {
          this.getData()
        },
        error => this.errorMessage = <any>error)

    }
  }
}
