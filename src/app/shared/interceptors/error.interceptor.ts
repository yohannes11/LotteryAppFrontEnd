import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationServiceService} from '../Services/authentication-service.service';
import {ToastService} from '../Services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationServiceService,
    private notificationService: ToastService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      } else if (err.status === 403) {
        this.notificationService.error('Your are not allowed to perform this action', 'Bad Credentials!'); /// authentication related error
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      } else if (err.status === 404) {
        this.notificationService.error('Check if you are connected to internet', 'Application could not connect to services');
      } else if (err.status >= 500 && err.status < 600) {
        this.notificationService.error('Contact your support group and try again', 'Temporary Problem!');
      } else {
        const error = err.error.message || err.statusText;
        if (error === 'Unknown Error') {
          this.notificationService.error('Check if you are connected to the internet', 'Unknown Error');
        } else {
          this.notificationService.error('Please try again later', 'Temporary problem');
        }
      }
      return throwError(err.error.message || err.statusText);
    }));
  }

}
