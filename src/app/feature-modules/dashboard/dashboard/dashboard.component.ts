import {Component, OnInit} from '@angular/core';

// import {NotificationService} from '../../../shared/services/notification.service';
import {UserData} from '../../../api/models/user-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagemnetService} from '../../../api/services/user-managemnet.service';
import {ErrMassageService} from '../../../shared/Services/err-massage.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ProfileService} from '../../../api/services/profile.service';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {AddComponent} from './add/add.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: UserData[];
  /// pagination
  itemsPerPage = 8;
  totalItems = 0;
  currentPage = 1;
  nextText = '>';
  previousText = '<';
  searchForm: FormGroup;

  constructor(
    private userService: UserManagemnetService,
    private formBuilder: FormBuilder,
    private messageService: ErrMassageService,
    private modalService: BsModalService,
    private profileService: ProfileService
  ) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      start: null,
      max: null,
      parameter: ['', Validators.required]
    });
    const pageEvent: PageChangedEvent = {page: this.currentPage, itemsPerPage: this.itemsPerPage};
    this.listUser(pageEvent);
  }

  get parameter() {
    return this.searchForm.get('parameter');
  }

  listUser(event?: PageChangedEvent) {
    let params: UserManagemnetService.UserListParams;
    params = {
      start: (event.page - 1) * event.itemsPerPage,
      max: event.itemsPerPage,
    };
    this.userService.userList(params).subscribe(
      result => {
        this.users = result.userDatas;
        this.totalItems = result.countDto.count;
      }
    );
  }

  activate(id: number, i: number) {
    this.userService.activateUser(id).subscribe(
      result => {
        if (result) {
          if (result.status) {
            this.users[i].active = true;
          } else {
            this.messageService.listOfErrorViewer(result.errorMessages);
          }
        }
      }
    );
  }

  deactivate(id: number, i: number) {
    this.userService.deactivateUser(id).subscribe(
      result => {
        if (result) {
          if (result.status) {
            this.users[i].active = false;
          } else {
            this.messageService.listOfErrorViewer(result.errorMessages);
          }
        }
      }
    );
  }


  registerUser() {
     this.modalService.show(AddComponent);
    // this.modalService.onHide.subscribe(
    //   result => {
    //     const pageEvent: PageChangedEvent = {
    //       itemsPerPage: this.itemsPerPage,
    //       page: this.currentPage
    //     };
    //     this.listUser(pageEvent);
    //   }
    // );
  }

  search() {
    console.log(this.searchForm)
    if (this.searchForm.valid) {
      this.userService.searchUser(this.searchForm.value).subscribe(
        result => {
          if (result.status.status) {
            this.users = result.userDatas;
            this.totalItems = result.countDto.count;
          } else {
            this.messageService.listOfErrorViewer(result.status.errorMessages);
            this.ngOnInit();
          }
        }
      );
    }
  }

  resetPassword(id: number) {
    this.profileService.resetPassword(id).subscribe(
      result => {
        if (result.status) {
          this.messageService.openModal('Success', result.message);
        } else {
          this.messageService.listOfErrorViewer(result.errorMessages);
        }
      }
    );
  }

}
