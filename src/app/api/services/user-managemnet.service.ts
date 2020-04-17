/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserListOut } from '../models/user-list-out';
import { RegisterUserOut } from '../models/register-user-out';
import { RegisterUserIn } from '../models/register-user-in';
import { Status } from '../models/status';
import { RegisterUserOutList } from '../models/register-user-out-list';
import { FileUploadForm } from '../models/file-upload-form';
import { RoleListOut } from '../models/role-list-out';
@Injectable({
  providedIn: 'root',
})
class UserManagemnetService extends __BaseService {
  static readonly userListPath = '/userManagement/userList';
  static readonly addUserPath = '/userManagement/addUser';
  static readonly activateUserPath = '/userManagement/activateUser';
  static readonly uploadFilePath = '/userManagement/registerUsers';
  static readonly deactivateUserPath = '/userManagement/deactivateUser';
  static readonly roleListPath = '/userManagement/roleList';
  static readonly searchUserPath = '/userManagement/searchUser';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * this will list registed user
   * @param params The `UserManagemnetService.UserListParams` containing the following parameters:
   *
   * - `start`:
   *
   * - `max`:
   *
   * @return successful operation
   */
  userListResponse(params: UserManagemnetService.UserListParams): __Observable<__StrictHttpResponse<UserListOut>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.start != null) __params = __params.set('start', params.start.toString());
    if (params.max != null) __params = __params.set('max', params.max.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/userManagement/userList`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserListOut>;
      })
    );
  }
  /**
   * this will list registed user
   * @param params The `UserManagemnetService.UserListParams` containing the following parameters:
   *
   * - `start`:
   *
   * - `max`:
   *
   * @return successful operation
   */
  userList(params: UserManagemnetService.UserListParams): __Observable<UserListOut> {
    return this.userListResponse(params).pipe(
      __map(_r => _r.body as UserListOut)
    );
  }

  /**
   * this will add user
   * @param body undefined
   * @return successful operation
   */
  addUserResponse(body?: RegisterUserIn): __Observable<__StrictHttpResponse<RegisterUserOut>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/userManagement/addUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RegisterUserOut>;
      })
    );
  }
  /**
   * this will add user
   * @param body undefined
   * @return successful operation
   */
  addUser(body?: RegisterUserIn): __Observable<RegisterUserOut> {
    return this.addUserResponse(body).pipe(
      __map(_r => _r.body as RegisterUserOut)
    );
  }

  /**
   * deactivate user using parameter user <id>
   * @param id undefined
   * @return successful operation
   */
  activateUserResponse(id?: number): __Observable<__StrictHttpResponse<Status>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/userManagement/activateUser`,
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
   * deactivate user using parameter user <id>
   * @param id undefined
   * @return successful operation
   */
  activateUser(id?: number): __Observable<Status> {
    return this.activateUserResponse(id).pipe(
      __map(_r => _r.body as Status)
    );
  }

  /**
   * @param body undefined
   * @return successful operation
   */
  uploadFileResponse(body?: FileUploadForm): __Observable<__StrictHttpResponse<RegisterUserOutList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/userManagement/registerUsers`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RegisterUserOutList>;
      })
    );
  }
  /**
   * @param body undefined
   * @return successful operation
   */
  uploadFile(body?: FileUploadForm): __Observable<RegisterUserOutList> {
    return this.uploadFileResponse(body).pipe(
      __map(_r => _r.body as RegisterUserOutList)
    );
  }

  /**
   * activate user using parameter user <id>
   * @param id undefined
   * @return successful operation
   */
  deactivateUserResponse(id?: number): __Observable<__StrictHttpResponse<Status>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/userManagement/deactivateUser`,
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
   * activate user using parameter user <id>
   * @param id undefined
   * @return successful operation
   */
  deactivateUser(id?: number): __Observable<Status> {
    return this.deactivateUserResponse(id).pipe(
      __map(_r => _r.body as Status)
    );
  }

  /**
   * this will add user
   * @return successful operation
   */
  roleListResponse(): __Observable<__StrictHttpResponse<RoleListOut>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/userManagement/roleList`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RoleListOut>;
      })
    );
  }
  /**
   * this will add user
   * @return successful operation
   */
  roleList(): __Observable<RoleListOut> {
    return this.roleListResponse().pipe(
      __map(_r => _r.body as RoleListOut)
    );
  }

  /**
   * this will list registed user
   * @param params The `UserManagemnetService.SearchUserParams` containing the following parameters:
   *
   * - `start`:
   *
   * - `parameter`:
   *
   * - `max`:
   *
   * @return successful operation
   */
  searchUserResponse(params: UserManagemnetService.SearchUserParams): __Observable<__StrictHttpResponse<UserListOut>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.start != null) __params = __params.set('start', params.start.toString());
    if (params.parameter != null) __params = __params.set('parameter', params.parameter.toString());
    if (params.max != null) __params = __params.set('max', params.max.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/userManagement/searchUser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserListOut>;
      })
    );
  }
  /**
   * this will list registed user
   * @param params The `UserManagemnetService.SearchUserParams` containing the following parameters:
   *
   * - `start`:
   *
   * - `parameter`:
   *
   * - `max`:
   *
   * @return successful operation
   */
  searchUser(params: UserManagemnetService.SearchUserParams): __Observable<UserListOut> {
    return this.searchUserResponse(params).pipe(
      __map(_r => _r.body as UserListOut)
    );
  }
}

module UserManagemnetService {

  /**
   * Parameters for userList
   */
  export interface UserListParams {
    start?: number;
    max?: number;
  }

  /**
   * Parameters for searchUser
   */
  export interface SearchUserParams {
    start?: number;
    parameter?: string;
    max?: number;
  }
}

export { UserManagemnetService }
