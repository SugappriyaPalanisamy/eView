import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },{
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard]
            
        },
        {
            path: 'clients',
            loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
            canActivate: [AuthGuard],
            data: {
                roles: [Role.Admin],
                validatePermission: true
            }
        },
        {
            path: 'zones',
            loadChildren: () => import('./zones/zones.module').then(m => m.ZonesModule),
            canActivate: [AuthGuard],
            data: {
                roles: [Role.Admin],
                validatePermission: true
            }
        },
        {
            path: 'clientdetails/:id', component: ClientDetailsComponent
            //loadChildren: () => import('./client-details/client-details.module').then(m => m.ClientDetailsModule)
        },
        {
            path: 'components',
            loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
        },{
            path: 'forms',
            loadChildren: () => import('./forms/forms.module').then(m => m.Forms)
        },{
            path: 'tables',
            loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
        },{
            path: 'maps',
            loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
        },{
            path: 'charts',
            loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
        },{
            path: 'calendar',
            loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
        },{
            path: '',
            loadChildren: () => import('./userpage/user.module').then(m => m.UserModule)
        },{
            path: '',
            loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
        },{
            path: '',
            loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
            }]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'pages',
                loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
            }]
        }
];
