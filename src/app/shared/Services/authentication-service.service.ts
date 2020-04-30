import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ApiConfiguration} from '../../api/api-configuration';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AuthenticationService} from '../../api/services';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  public tokenKey = 'uni-ash-school-token';
  public roleKey = 'uni-cash-school-role';
  public passwordChanged = 'uni-cash-school-password-changed-key';
  public grade = 'GRADE';
  public section = 'SECTION';
  public baseUrl = this.apiConfiguration.rootUrl;
  showSpinner = false;
  token = new Subject<string>();
  currentToken: string;

  constructor(
    private http: HttpClient,
    private apiConfiguration: ApiConfiguration,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.token.subscribe(value => this.currentToken = value);
    setInterval(() => {
        this.refresh();
      }, 120000
    );
  }


  login(username: string, password: string) {
    this.showSpinner = true;
    return this.http.post<any>(this.baseUrl + '/auth', {
      username,
      password
    })
      .pipe(map((res: any) => {
        if (res && res.token) {
          this.token.next(res.token);
          localStorage.setItem(this.tokenKey, res.token);
          this.showSpinner = false;
          localStorage.setItem(this.roleKey, res.authorities);
          localStorage.setItem(this.passwordChanged, res.passwordChanged);
          if (res.grade && res.section && res.authorities === 'TEACHER') {
            localStorage.setItem(this.grade, res.grade);
            localStorage.setItem(this.section, res.section);
          }
        } else {
          this.router.navigate(['/login']);
        }
        this.showSpinner = false;
      }));
  }

  logout() {
    this.token.next(null);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.grade);
    localStorage.removeItem(this.section);
    localStorage.removeItem(this.passwordChanged);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (this.currentToken) {
      return true;
    } else {
      return false;
    }
  }

  refresh() {
    if (this.isLoggedIn()) {
      this.authenticationService.refreshToken().subscribe(
        value => {
          // set token after refresh
          this.token.next(value.token);
        }
      );
    }
  }


}
