import {CanLoad, Route, UrlSegment} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService) {}
  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    return this.authService.isAuthenticated();
  }
}
