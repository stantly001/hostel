import { Routes } from '@angular/router';
import { HomeSectionComponent } from './home-section/home-section.component';
import { ViewComponent } from './view/view.component';
export const Approute: Routes = [

    {
        path: "hostel",
        component: HomeSectionComponent,
    }, {
        path: "hostel/search",
        component: ViewComponent,
    },
    {
        path: '',
        redirectTo: 'hostel',
        pathMatch: 'full',
    }
]

