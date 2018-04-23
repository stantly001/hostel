import { Component, OnInit } from '@angular/core';


import { HttpdataService } from '../service/httpdata.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [HttpdataService]
})
export class RegisterComponent implements OnInit {
  registers: any[];
  errorMessage: string;
  register = {};
  constructor(private _httpDataService: HttpdataService) { }

  ngOnInit() {
  }

  getData(): void {
    this._httpDataService.getAllRegisterData().subscribe(
      data => this.registers = data,
      error => this.errorMessage = <any>error)
  }

  save(register) {
    if (register) {
      this._httpDataService.addRegisterdata(register).subscribe(
        data => {
          this.getData()
        },
        error => this.errorMessage = <any>error)
    }
  }
}
