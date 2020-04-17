import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ErrorMessage } from '../../api/models/error-message';

@Injectable({
  providedIn: 'root'
})
export class ErrMassageService {
  constructor(
    private modalService: BsModalService
  ) { }
  openModal(title: string, message: string) {
    const initialState = {
      title: title,
      message: message,
     };
    this.modalService.show(ModalComponent, {initialState});
  }
  listOfErrorViewer(errorMessages: Array<ErrorMessage>){
    for (const error of errorMessages) {
      this.openModal(error.title, error.message);
    }
  }
}
