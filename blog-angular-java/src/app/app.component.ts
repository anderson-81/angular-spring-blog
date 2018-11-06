import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowMessageService } from '../shared/services/showmessage.service';
import { Message } from '../shared/models/message';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    msg: Message;

    subs: Subscription;

    logged: boolean;

    sub1: Subscription;
    sub2: Subscription;
    sub3: Subscription;

    constructor(
        private showMsg: ShowMessageService,
        private loginService: LoginService,
        private router: Router) {
    }

    ngOnInit() {

        this.sub1 = this.showMsg.showMessage.subscribe((msg) => {
            this.msg = msg;
            $('#modalInfo').modal('show');
        });

        this.sub2 = this.loginService.logoff.subscribe((response) => {
            if (response['alert'] !== undefined) {
                this.showMsg.createMessage(response['alert'], 'Information');
            }
            if (response['page'] !== undefined) {
                this.router.navigate([response['page']]);
                this.loginService.CheckLogged();
            }
        });

        this.sub3 = this.loginService.logged.subscribe((status) => {
            this.logged = status;
        });
    }

    ngAfterViewInit(): void {
        this.loginService.CheckLogged();
    }

    onLogout() {
        this.loginService.Logout();
    }

    ngOnDestroy() {
        if (this.sub1 && !this.sub1.closed) {
            this.sub1.unsubscribe();
        }
        if (this.sub2 && !this.sub2.closed) {
            this.sub2.unsubscribe();
        }
        if (this.sub3 && !this.sub3.closed) {
            this.sub3.unsubscribe();
        }
    }
}
