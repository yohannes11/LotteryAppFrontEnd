/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ProfileOut } from '../models/profile-out';
import { UserData } from '../models/user-data';
import { Status } from '../models/status';
import { ChangePasswordIn } from '../models/change-password-in';
@Injectable({
  providedIn: 'root',
})
class ProfileService extends __BaseService {
  static readonly viewProfilePath = '/profile/viewProfile';
  static readonly editProfilePath = '/profile/editProfile';
  static readonly changePasswordPath = '/profile/changePassword';
  static readonly resetPasswordPath = '/profile/resetPassword';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * thi will show user Profile
   * @return successful operation
   */
  viewProfileResponse(): __Observable<__StrictHttpResponse<ProfileOut>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/profile/viewProfile`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfileOut>;
      })
    );
  }
  /**
   * thi will show user Profile
   * @return successful operation
   */
  viewProfile(): __Observable<ProfileOut> {
    return this.viewProfileResponse().pipe(
      __map(_r => _r.body as ProfileOut)
    );
  }

  /**
   * this will edit profile data with the provided data
   * @param body undefined
   * @return successful operation
   */
  editProfileResponse(body?: UserData): __Observable<__StrictHttpResponse<ProfileOut>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/profile/editProfile`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfileOut>;
      })
    );
  }
  /**
   * this will edit profile data with the provided data
   * @param body undefined
   * @return successful operation
   */
  editProfile(body?: UserData): __Observable<ProfileOut> {
    return this.editProfileResponse(body).pipe(
      __map(_r => _r.body as ProfileOut)
    );
  }

  /**
   * this will change user Password
   * @param body undefined
   * @return successful operation
   */
  changePasswordResponse(body?: ChangePasswordIn): __Observable<__StrictHttpResponse<Status>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/profile/changePassword`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Status>;
      })
    );
  }
  /**
   * this will change user Password
   * @param body undefined
   * @return successful operation
   */
  changePassword(body?: ChangePasswordIn): __Observable<Status> {
    return this.changePasswordResponse(body).pipe(
      __map(_r => _r.body as Status)
    );
  }

  /**
   * RESETS PASSWORD GIVEN USER ID
   * @param userId undefined
   * @return successful operation
   */
  resetPasswordResponse(userId?: number): __Observable<__StrictHttpResponse<Status>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (userId != null) __params = __params.set('userId', userId.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/profile/resetPassword`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Status>;
      })
    );
  }
  /**
   * RESETS PASSWORD GIVEN USER ID
   * @param userId undefined
   * @return successful operation
   */
  resetPassword(userId?: number): __Observable<Status> {
    return this.resetPasswordResponse(userId).pipe(
      __map(_r => _r.body as Status)
    );
  }
}

module ProfileService {
}

export { ProfileService }
