import { NgModule } from '@angular/core';
import { PostComponent } from './post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostService } from './post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostRoutingModule } from './post.routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PostRoutingModule,
        NgxPaginationModule,
    ],
    declarations: [
        PostComponent,
        PostDetailsComponent,
        PostFormComponent,
        PostListComponent,
    ],
    exports: [PostComponent],
    providers: [
        PostService,
        AuthGuard,
    ],
})
export class PostModule { }
