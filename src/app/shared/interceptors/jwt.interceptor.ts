import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../api/services';
import {ToastService} from '../Services/toast.service';
import {AuthenticationServiceService} from '../Services/authentication-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  sessionDuration = 0;

  constructor(private authenticationServiceService: AuthenticationServiceService,
              private toasterService: ToastService) {
    setInterval(() => {
        if (this.authenticationServiceService.isLoggedIn()) {
          this.sessionDuration++;
        }
        if (this.sessionDuration >= 2 && this.authenticationServiceService.isLoggedIn()) {
          this.toasterService.warning('Your Session Has Expired', 'Please Login Again');
          this.authenticationServiceService.logout();
        }
      }, 120000
    );
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationServiceService.currentToken;
    if (currentUser) {
      if ((this.authenticationServiceService.baseUrl + '/auth/refresh') !== request.url) {
        this.sessionDuration = 0; // if request is not refresh reset inactive duration
      }
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`
        }
      });
    }

    return next.handle(request);
  }
}
