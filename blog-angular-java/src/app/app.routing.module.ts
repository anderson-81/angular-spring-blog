import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './errors/notfound/notfound.component';
import { InternalErrorComponent } from './errors/internal-error/internal-error.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: 'errors/404', component: NotfoundComponent },
    { path: 'errors/505', component: InternalErrorComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: '', loadChildren: './post/post.module#PostModule' },
    { path: '**', redirectTo: '/errors/404' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
