import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private rotuer: Router,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth')
      .pipe(
        take(1),
        map(authState => {
          return authState.user;
        }),
        map(user => {
          const isAuthenticated = !!user;
          if (isAuthenticated) {
            return true;
          }
          return this.rotuer.createUrlTree(['/auth'])
        })
      );
  }
}
