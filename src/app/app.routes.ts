import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { AdminComponent } from './admin/admin.component';
import { HostelComponent } from './hostel/hostel.component';

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
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'addHostel',
                pathMatch: 'full'
            },
            {
                path: 'addHostel',
                component: HostelComponent
            }
        ]
    },

]

