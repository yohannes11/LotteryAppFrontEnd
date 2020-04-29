import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserData} from '../../../api/models/user-data';
import {ProfileService} from '../../../api/services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userData: UserData;

  constructor(
    private profileService: ProfileService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.profileService.viewProfile().subscribe(
      result => {
        this.userData = result.userData
      }
    );
  }

  update() {
    this._router.navigate(['/profile/update']);
  }
}
