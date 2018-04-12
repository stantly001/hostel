import { Routes } from '@angular/router';
import { HomeSectionComponent } from './home-section/home-section.component';
import { ViewComponent } from './view/view.component';
import { DetailviewComponent } from './detailview/detailview.component';
export const Approute: Routes = [

    {
        path: "hostel",
        component: HomeSectionComponent,
    }, {
        path: "hostel/search",
        component: ViewComponent,
    },{
        path: "hostel/:hostelId",
        component: DetailviewComponent,
    },
    {
        path: '',
        redirectTo: 'hostel',
        pathMatch: 'full',
    }
]

