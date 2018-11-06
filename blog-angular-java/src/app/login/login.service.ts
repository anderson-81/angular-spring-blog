import { Injectable, EventEmitter } from '@angular/core';
import { UserSys } from '../../shared/models/usersys';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ShowMessageService } from '../../shared/services/showmessage.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    constructor(
        private http: HttpClient,
        private showMsg: ShowMessageService
    ) { }

    private readonly API: string = `${environment.API}`;

    login = new EventEmitter<object>();

    logoff = new EventEmitter<object>();

    logged = new EventEmitter<boolean>();

    auth$: Observable<Object>;

    Login(user: UserSys, token: string) {
        const httpParams = new HttpParams()
            .append('username', user.username)
            .append('password', user.password)
            .append('token', token);
        this.http.post(this.API + '/login', httpParams).subscribe((response) => {
            this.login.emit(response);
            if (response['page'] === 'index') {
                this.logged.emit(true);
            }
        }, () => {
            this.showMsg.createMessage('Server error.', 'Error');
        });
    }

    Logout() {
        this.http.get(this.API + '/logout').subscribe((response) => {
            this.logoff.emit(response);
            this.logged.emit(response['status']);
        }, () => {
            this.showMsg.createMessage('Server error.', 'Error');
        });
    }

    CheckLogged() {
        this.auth$ = this.http.get(this.API + '/logged');
        this.auth$.subscribe((response) => {
            this.logged.emit(response['status']);
        });
        return this.auth$.map(response => response['status']);
    }
}
