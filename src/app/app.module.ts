import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {ErrorInterceptor} from './shared/interceptors/error.interceptor';
import {JwtInterceptor} from './shared/interceptors/jwt.interceptor';
import {SharedModule} from './shared/shared.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserModule} from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import {ModalModule, BsModalRef} from 'ngx-bootstrap/modal';
import {ToastComponent} from './shared/components/toast/toast.component';
import {ConfirmDialogComponent} from './shared/components/confirm-dialog/confirm-dialog.component';
import {
  ModalComponent
} from './shared/components/modal/modal.component';


@NgModule({
  exports: [
    ToastrModule],
  imports: [
    BrowserAnimationsModule,
    ToastrModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ToastComponent,
    ModalComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent, ConfirmDialogComponent],
})

export class AppModule {
}
