import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserData} from '../../../api/models/user-data';
import {ProfileService} from '../../../api/services/profile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrMassageService} from '../../../shared/Services/err-massage.service';
import {RegularExpressionsService} from '../../../shared/Services/regular-expressions.service';
import {ToastService} from '../../../shared/Services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userData: UserData;
  editing: Boolean;
  editProfileForm: FormGroup;
  router: any;
  firstNameData: string;
  lastNameData: string;
  emailData: string;
  phoneData: string;
  vMsg = {
    email: [
      {type: 'required', message: 'email is required'},
      {type: 'pattern', message: 'insert a valid email address please'}
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private messageModal: ErrMassageService,
    private regExService: RegularExpressionsService,
    private profileService: ProfileService,
    private _router: Router,
    private toaster: ToastService
  ) {
  }

  ngOnInit() {
    this.editing = false;
    this.profileService.viewProfile().subscribe(
      result => {
        this.userData = result.userData;
        this.emailData = result.userData.email;
        this.firstNameData = result.userData.firstName;
        this.lastNameData = result.userData.lastName;
        this.phoneData = result.userData.phoneNumber;
      }
    );
    this.editProfileForm = this.formBuilder.group({
      id: '',
      firstName: ['', [Validators.required, Validators.pattern(this.regExService.alphabetExpression)]],
      lastName: ['', [Validators.required, Validators.pattern(this.regExService.alphabetExpression)]],
      email: ['', Validators.compose([
        Validators.required, Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.regExService.phoneExpression)]],
      username: '',
      authorities: '',
      active: '',
    });

  }

  get firstName() {
    return this.editProfileForm.get('firstName');
  }

  get lastName() {
    return this.editProfileForm.get('lastName');
  }

  get email() {
    return this.editProfileForm.get('email');
  }

  get phoneNumber() {
    return this.editProfileForm.get('phoneNumber');
  }

  updateProfile() {
    if (this.editProfileForm.valid) {
      this.profileService.editProfile(this.editProfileForm.value).subscribe(
        result => {
          if (result.status) {
            // this.messageModal.openModal('Success', result.status.message);
            this.toaster.success('', result.status.message);
            this._router.navigate(['/profile']);
          } else {
            // this.messageModal.listOfErrorViewer(result.status.errorMessages);
            this.toaster.listOfErrors(result.status.errorMessages);
          }
        }
      );
    }
  }


  edit() {
    this.editing = true;
  }

  update() {
    this._router.navigate(['/profile/update']);
  }
}
