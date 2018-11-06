import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostGuard } from '../guards/post.guard';
import { PostDeactivateGuard } from '../guards/post-deactivate.guard';
import { AuthGuard } from '../guards/auth.guard';

const postRoutes: Routes = [
    {
        path: '', children: [
            { path: '', component: PostListComponent, },
            { path: 'index', pathMatch: 'full', redirectTo: '/' },
            { path: 'new', component: PostFormComponent, canDeactivate: [PostDeactivateGuard], canLoad: [AuthGuard] },
            { path: 'edit/:id', component: PostFormComponent, canDeactivate: [PostDeactivateGuard], canLoad: [AuthGuard] },
            { path: 'details/:id', component: PostDetailsComponent },
        ], canActivateChild: [PostGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(postRoutes)],
    exports: [RouterModule],
})
export class PostRoutingModule { }
