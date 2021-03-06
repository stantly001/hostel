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
import { RoomsComponent } from './rooms/rooms.component';
import { RegisterComponent } from './register/register.component';
import { HostelServiceComponent } from './hostel-service/hostel-service.component';
import { LoginComponent } from './login/login.component';
import { HostelViewComponent } from './hostel-view/hostel-view.component';

export const Approute: Routes = [

    {
        path: 'home',
        component: HomeSectionComponent,
    },
    {
        path: 'hostel',
        component: ViewComponent,
    },
    {
        path: 'hostelDetailView/:hostelId',
        component: DetailviewComponent,
    },
     {
        path: 'rooms',
        component: ViewRoomsComponent
    },
    
    {
        path: 'admin',
        component: AdminComponent,
        children: [            
            {
                path: 'hostel',
                component: HostelViewComponent,
                children: [
                    {
                        path: 'addHostel',
                        component: HostelComponent
                    }, {
                        path: 'viewRooms',
                        component: RoomsComponent
                    },{
                        path: 'hostel/addHostel',
                        redirectTo: 'addHostel',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'filter',
                component: FilterFormComponent
            }
            ,{
                path: 'services',
                component: HostelServiceComponent
            },{
                path: '',
                redirectTo: 'hostel',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },

]

