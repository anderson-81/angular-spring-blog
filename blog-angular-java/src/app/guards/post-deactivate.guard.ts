import { Injectable, OnInit } from '@angular/core';
import { PostFormComponent } from '../post/post-form/post-form.component';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanDeactivate
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class PostDeactivateGuard implements CanDeactivate<PostFormComponent> {

    canDeactivate(
        component: PostFormComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (component.deactivate) {
            if (component.change) {
                component.showDeactivate();
            }
            return component.eventDeactivate.map(e => {
                return e;
            });
        } else {
            return true;
        }
    }
}
