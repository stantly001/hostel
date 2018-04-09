import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';

export const Approute: Routes = [

    {
        path: "Hostel",
        component: DashboardComponent,
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

