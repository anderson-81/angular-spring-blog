import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Observable, of } from 'rxjs';
import { ShowMessageService } from '../../shared/services/showmessage.service';

@Injectable()
export class PostGuard implements CanActivateChild {

    constructor(
        private loginService: LoginService,
        private router: Router,
        private showMsg: ShowMessageService) { }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.loginService.CheckLogged().map(e => {
            if (e) {
                return true;
            }
        }).catch(() => {
            if ((state.url === '/new') || (state.url.includes('edit'))) {
                this.showMsg.createMessage('The user must logged in for create or edit post.', 'Information');
                this.router.navigate(['/']);
                return of(false);
            }
            return of(true);
        });
    }
}
