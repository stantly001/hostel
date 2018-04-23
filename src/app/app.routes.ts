import { Routes } from '@angular/router';
import { HomeSectionComponent } from './home-section/home-section.component';
import { ViewComponent } from './view/view.component';
import { DetailviewComponent } from './detailview/detailview.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { AdminComponent } from './admin/admin.component';
import { HostelComponent } from './hostel/hostel.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const Approute: Routes = [

    {
        path: "hostel",
        component: HomeSectionComponent,
    },
    {
        path: 'hostel/login',
        component: LoginComponent,
    }, 
    {
        path: 'hostel/register',
        component: RegisterComponent
    },{
        path: "hostel/search",
        component: ViewComponent,
    }, {
        path: "hostel/:hostelId",
        component: DetailviewComponent,
    },
    {
        path: '',
        redirectTo: 'hostel',
        pathMatch: 'full',
    },
    
    {
        path: 'admin',
        component: AdminComponent,
        children: [            
            {
                path: 'addHostel',
                component: HostelComponent
            },
            {
                path: 'filter',
                component: FilterFormComponent
            },
            {
                path: '',
                redirectTo: 'addHostel',
                pathMatch: 'full'
            }
        ]
    },

]

