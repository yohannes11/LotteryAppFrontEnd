import {NgModule, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {ModalComponent} from './components/modal/modal.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';

// ngx bootstrap
import {ModalModule, BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  exports: [
    CommonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    ConfirmDialogComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ],
  declarations: [
    ConfirmDialogComponent,
  ],

})
export class SharedModule {
}
