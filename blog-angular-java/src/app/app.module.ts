import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { ShowMessageService } from '../shared/services/showmessage.service';
import { TokenService } from '../shared/services/token.service';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

import { NotfoundComponent } from './errors/notfound/notfound.component';
import { InternalErrorComponent } from './errors/internal-error/internal-error.component';

import { PostModule } from './post/post.module';
import { AuthGuard } from './guards/auth.guard';
import { PostGuard } from './guards/post.guard';
import { PostDeactivateGuard } from './guards/post-deactivate.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    InternalErrorComponent,
  ],
  imports: [
    BrowserModule,
    PostModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    PostGuard,
    PostDeactivateGuard,
    LoginService,
    ShowMessageService,
    TokenService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
