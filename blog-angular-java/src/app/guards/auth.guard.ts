import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Observable, of } from 'rxjs';
import { ShowMessageService } from '../../shared/services/showmessage.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private loginService: LoginService,
        private router: Router,
        private showMsg: ShowMessageService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.loginService.CheckLogged().map(e => {
            if (state.url === '/login') {
                if (e) {
                    this.showMsg.createMessage('User already logged in.', 'Information');
                    this.router.navigate(['/']);
                    return false;
                }
            }
        }).catch(() => {
            return of(true);
        });
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.loginService.CheckLogged().map(e => {
            if (e) {
                return true;
            }
        }).catch(() => {
            return of(false);
        });
    }
}
