import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeSectionComponent } from './home-section/home-section.component';
import { FilterComponent } from './filter/filter.component';

export const Approute: Routes = [

    {
        path: "Hostel",
        component: HomeSectionComponent,
    }, {
        path: "Hostel/search",
        component: FilterComponent,
    },
    {
        path: '',
        redirectTo: 'Hostel',
        pathMatch: 'full',
    }
]

