import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NouisliderModule } from 'ng2-nouislider';
import { NgDatepickerModule } from 'ng2-datepicker';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { Approute } from './app.routes';

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { BredcrumbComponent } from './bredcrumb/bredcrumb.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailviewComponent } from './detailview/detailview.component';
import { FooterComponent } from './footer/footer.component';
import { FilterComponent } from './filter/filter.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { HeaderComponent } from './header/header.component';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { HomeSectionComponent } from './home-section/home-section.component';
import { HostelComponent } from './hostel/hostel.component';
import { ListComponent } from './list/list.component';
import { ListContentComponent } from './list-content/list-content.component';
import { ListReviewsComponent } from './list-reviews/list-reviews.component';
import { ViewComponent } from './view/view.component';

import {HttpdataService} from './service/httpdata.service';


import { NgxGalleryModule } from 'ngx-gallery';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component';
import { RoomsComponent } from './rooms/rooms.component'
import { HostelServiceComponent } from './hostel-service/hostel-service.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HostelViewComponent } from './hostel-view/hostel-view.component'

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    BredcrumbComponent,
    DashboardComponent,
    DetailviewComponent,
    FooterComponent,
    FilterComponent,
    FilterFormComponent,
    HeaderComponent,
    HeaderSearchComponent,
    HeaderNavigationComponent,
    HomeSectionComponent,
    HostelComponent,
    ListComponent,
    ListContentComponent,
    ListReviewsComponent,
    ViewComponent,
    ViewRoomsComponent,
    RoomsComponent,
    HostelServiceComponent,
    RegisterComponent,
    LoginComponent,
    HostelViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NouisliderModule,
    NgDatepickerModule,
    RouterModule.forRoot(Approute),
    NgMultiSelectDropDownModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [HttpdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
