import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationServiceService} from '../../../shared/Services/authentication-service.service';
import {ChangePasswordIn} from '../../../api/models/change-password-in';
import {PasswordValidationService} from '../../../shared/Services/password-validation.service';
import {ProfileService} from '../../../api/services/profile.service';
import {ErrMassageService} from '../../../shared/Services/err-massage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  sendChangePasData: ChangePasswordData;
  changePasswordIn: ChangePasswordIn;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private toastrService: ToastrService,
    private messageModal: ErrMassageService,
    private authenticationConfig: AuthenticationServiceService
  ) {
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
        oldpass: ['', Validators.required],
        newpass: ['', [Validators.required, Validators.minLength(8)]],
        newpassconfirm: ['', Validators.required],
      },
      {
        validator: PasswordValidationService.MatchPassword
      }
    );
  }

  get oldpass() {
    return this.changePasswordForm.get('oldpass');
  }

  get newpass() {
    return this.changePasswordForm.get('newpass');
  }

  get newpassconfirm() {
    return this.changePasswordForm.get('newpassconfirm');
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.sendChangePasData = {
        changePasswordIn: {
          newPassword: this.changePasswordForm.value.newpass,
          oldPassword: this.changePasswordForm.value.oldpass
        }
      };
      this.profileService.changePassword(this.sendChangePasData.changePasswordIn).subscribe(
        result => {
          if (result.status) {
            // this.messageModal.openModal('Notice !', result.message);
            this.toastrService.success(result.message);
            this.router.navigate(['/login']);
            localStorage.setItem(this.authenticationConfig.passwordChanged, 'true');
          } else {
           // this.messageModal.openModal('Warning !', result.message);
            this.toastrService.error(result.message);
          }
        }
      );
    }
  }

  cancel() {
    this.ngOnInit();
  }

}

export interface ChangePasswordData {
  changePasswordIn: ChangePasswordIn;
}
