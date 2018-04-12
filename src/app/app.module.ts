import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NouisliderModule } from 'ng2-nouislider';

import { Approute } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { BredcrumbComponent } from './bredcrumb/bredcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { HomeSectionComponent } from './home-section/home-section.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { ListContentComponent } from './list-content/list-content.component';
import { ListReviewsComponent } from './list-reviews/list-reviews.component';
import {NgxGalleryModule} from 'ngx-gallery'

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
    HomeSectionComponent,
    ViewComponent,
    ListComponent,
    ListContentComponent,
    ListReviewsComponent,
  ],
  imports: [
    BrowserModule,
    NouisliderModule,
    RouterModule.forRoot(Approute),
    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
