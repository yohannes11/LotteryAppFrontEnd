import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagemnetService} from '../../../../api/services/user-managemnet.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ErrMassageService} from '../../../../shared/Services/err-massage.service';
import {RegularExpressionsService} from '../../../../shared/Services/regular-expressions.service';
import {MustMatch} from '../../../../shared/Services/password-validation.service';
import {RegisterUserIn} from '../../../../api/models/register-user-in';
import {ToastService} from '../../../../shared/Services/toast.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
@Injectable({providedIn: 'root'})
export class AddComponent implements OnInit {
  @ViewChild('passLength', {static: false}) passLength;
  password2: string;
  minLength: 10;
  addUserForm: FormGroup;
  roles: any[];
  changeIcon = false;
  submitted = false;
  showGrade = false;
  public grades: Array<string>;
  public sections: Array<string>;

  vMsg = {
    firstName: [
      {type: 'required', message: 'First Name is required'},
      {type: 'minlength', message: 'First Name must be at least 3 characters long'},
      {type: 'maxlength', message: 'First Name cannot be more than 25 characters long'},
      // { type: 'pattern', message: 'Your First Name must contain only letters' }
    ],
    lastName: [
      {type: 'required', message: 'Last Name is required'},
      {type: 'minlength', message: 'Last Name must be at least 3 characters long'},
      {type: 'maxlength', message: 'Last Name cannot be more than 25 characters long'},
      // { type: 'pattern', message: 'Your Last Name must contain only letters' }
    ],
    username: [
      {type: 'required', message: 'User Name is required'},
      {type: 'minlength', message: 'User Name must be at least 5 characters long'},
      {type: 'maxlength', message: 'User Name cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Your User Name must contain only numbers and letters'}
    ],
    email: [
      {type: 'required', message: 'email is required'},
      // { type: 'email', message: 'insert a valid email address please' },
      {type: 'pattern', message: 'insert a valid email address please'}
    ],
    password: [
      {type: 'required', message: 'Password is required'},
      {type: 'minlength', message: 'Password must be at least 8 characters long'},
      {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number'}
    ],
    phoneNumber: [
      {type: 'required', message: 'phone number is required'},
      {type: 'pattern', message: 'insert a valid phone number'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Confirm password is required'},
      {type: 'MatchPassword', message: 'Password mismatch'}
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private userManagmentService: UserManagemnetService,
    private messageService: ErrMassageService,
    public bsModalRef: BsModalRef,
    public toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.userManagmentService.roleList().subscribe(
      result => this.roles = result.roles
    );
    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        // Validators.pattern('^[a-zA-Zs]*$'),
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        // Validators.pattern('^[a-zA-Zs]*$'),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required, Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])],
      phoneNumber: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?!(\\d)\\1+$)(?:\\(?\\+\\d{1,3}\\)?[- ]?|0)?\\d{10}$')
      ])],
      username: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[A-Za-z0-9]+$'),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      confirmPassword: ['', [Validators.required]],
      group: 1,
      grade: '',
      section: '',
      authorities: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.addUserForm.controls;
  }

  get firstName() {
    return this.addUserForm.get('firstName');
  }

  get lastName() {
    return this.addUserForm.get('lastName');
  }

  get email() {
    return this.addUserForm.get('email');
  }

  get phoneNumber() {
    return this.addUserForm.get('phoneNumber');
  }

  get username() {
    return this.addUserForm.get('username');
  }

  get password() {
    return this.addUserForm.get('password');
  }

  get authorities() {
    return this.addUserForm.get('authorities');
  }


  onRoleChange(value: string) {
    console.log(value);
    if (value === 'TEACHER') {
      this.showGrade = true;
    } else {
      this.showGrade = false;
    }
  }

  registerUser() {
    this.submitted = true;
    if (this.addUserForm.valid) {
      const param: RegisterUserIn = {
        firstName: this.addUserForm.value.firstName,
        lastName: this.addUserForm.value.lastName,
        username: this.addUserForm.value.username,
        email: this.addUserForm.value.email,
        phoneNumber: this.addUserForm.value.phoneNumber,
        password: this.addUserForm.value.password,
        authorities: this.addUserForm.value.authorities,
        grade: this.addUserForm.value.grade,
        section: this.addUserForm.value.section,
        group: 1
      };

      this.userManagmentService.addUser(param).subscribe(
        result => {
          if (result.status.status) {
            this.toastService.success('User added successfully', 'User added successfully');
            this.bsModalRef.hide();
          } else {
            this.messageService.listOfErrorViewer(result.status.errorMessages);
          }
        }
      );
    }
  }

  showPassword(input: any) {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.changeIcon = !this.changeIcon;
  }

}
