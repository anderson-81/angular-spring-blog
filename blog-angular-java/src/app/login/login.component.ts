import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserSys } from '../../shared/models/usersys';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ShowMessageService } from '../../shared/services/showmessage.service';
import { TokenService } from '../../shared/services/token.service';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private usersys = new UserSys();

  private errors = [];

  status: boolean;

  token;

  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private showMsg: ShowMessageService,
    private tokenService: TokenService) {
    this.usersys.username = 'user';
    this.usersys.password = 'user';
  }

  ngOnInit() {
    this.status = true;
    this.setCss();
    this.Token();
    this.sub1 = this.loginService.login.subscribe((response) => {
      if (response['alert'] !== undefined) {
        this.showMsg.createMessage(response['alert'], 'Information');
      }
      if (response['errors'] !== undefined) {
        this.errors = response.errors;
      }
      if (response['page'] !== undefined) {
        this.router.navigate([response['page']]);
      }
      this.status = true;
    });
  }

  private setCss() {
    $('body').css('background-image', 'url("/assets/images/intro.jpg")');
    $('body').css('color', 'white');
  }

  onLogin() {
    this.status = false;
    this.onValidUser();
    if (this.errors.length === 0) {
      this.loginService.Login(this.usersys, this.token);
    } else {
      this.Token();
    }
  }

  private onValidUser() {
    this.errors = [];
    if (this.usersys.username.length === 0) {
      this.errors.push('Username is empty.');
    }

    if (this.usersys.password.length === 0) {
      this.errors.push('Password is empty.');
    }

    if (this.token.length === 0) {
      this.errors.push('Server error.');
    }
  }

  private Token() {
    this.tokenService.Token();
    this.sub2 = this.tokenService.token.subscribe((response) => {
      this.token = response;
    });
  }

  ngOnDestroy() {
    if (this.sub1 && !this.sub1.closed) {
      this.sub1.unsubscribe();
    }
    if (this.sub2 && !this.sub2.closed) {
      this.sub2.unsubscribe();
    }
  }
}
