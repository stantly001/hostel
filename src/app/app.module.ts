import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { Approute } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { BredcrumbComponent } from './bredcrumb/bredcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { HostelComponent } from './hostel/hostel.component';
import { AdminComponent } from './admin/admin.component';
// import {HttpdataService} from './service/httpdata.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderSearchComponent,
    HeaderNavigationComponent,
    BredcrumbComponent,
    FooterComponent,
    DashboardComponent,
    FilterComponent,
    HostelComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Approute),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
