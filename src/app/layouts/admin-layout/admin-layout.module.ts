import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../../shared/shared.module';
import {DashboardComponent} from '../../feature-modules/dashboard/dashboard/dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AddComponent} from '../../feature-modules/dashboard/dashboard/add/add.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgxPaginationModule,
    SharedModule
  ],
  declarations: [
    UserProfileComponent,
    AddComponent,
    DashboardComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent
  ],
  entryComponents: [AddComponent]
})

export class AdminLayoutModule {
}
