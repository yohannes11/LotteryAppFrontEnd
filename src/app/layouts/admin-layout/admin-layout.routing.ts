import {Routes} from '@angular/router';

import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {DashboardComponent} from '../../feature-modules/dashboard/dashboard/dashboard.component';
import {AddComponent} from '../../feature-modules/dashboard/dashboard/add/add.component';
import {ProfileComponent} from '../../feature-modules/profile/profile/profile.component';
import {EditComponent} from '../../feature-modules/profile/edit/edit.component';
import {ChangePasswordComponent} from '../../feature-modules/profile/change-password/change-password.component';


export const AdminLayoutRoutes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'update', component: EditComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add', component: AddComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'maps', component: MapsComponent}
];
