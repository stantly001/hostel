import { Routes } from '@angular/router';
import { HomeSectionComponent } from './home-section/home-section.component';
import { ViewComponent } from './view/view.component';
import { DetailviewComponent } from './detailview/detailview.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { AdminComponent } from './admin/admin.component';
import { HostelComponent } from './hostel/hostel.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component'
import { ServicesComponent } from './services/services.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RegisterComponent } from './register/register.component';

export const Approute: Routes = [

    {
        path: "hostel",
        component: HomeSectionComponent,
    }, {
        path: "hostel/search",
        component: ViewComponent,
    }, {
        path: "hostel/:hostelId",
        component: DetailviewComponent,
    }, {
        path: "viewRooms",
        component: ViewRoomsComponent
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
                path: 'register',
                component: RegisterComponent
            },{
                path: '',
                redirectTo: 'addHostel',
                pathMatch: 'full'
            },{
                path: "services",
                component: ServicesComponent
            },{
                path: "rooms",
                component: RoomsComponent
            }
        ]
    },

]

