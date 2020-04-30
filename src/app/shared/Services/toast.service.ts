import {Injectable} from '@angular/core';
import {IndividualConfig, ToastrService} from 'ngx-toastr';
import {ErrorMessage} from '../../api/models/error-message';



@Injectable({
  providedIn: 'root'
})
export class ToastService {
  options: IndividualConfig;

  constructor(
    private toasterService: ToastrService
  ) {
    this.options = this.toasterService.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 8000;
  }
  // use this service
  // remove the other service
  // ahun

  success(message, title) {
    this.toasterService.success(message, title, this.options);
  }

  error(message, title) {
    this.toasterService.error(message, title, this.options);
  }

  listOfErrors(errors: ErrorMessage[]) {
    errors.forEach(err => this.error(err.message, err.title));
  }

  info(message, title) {
    this.toasterService.info(message, title, this.options);
  }

  warning(message, title) {
    this.toasterService.warning(message, title, this.options);
  }
}
