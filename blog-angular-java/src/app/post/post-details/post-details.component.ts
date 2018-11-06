import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../../../shared/models/post';
import { LoginService } from '../../login/login.service';
import { ShowMessageService } from '../../../shared/services/showmessage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  id: number;

  post: Post;

  status = false;

  logged = false;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private loginService: LoginService,
    private showMsg: ShowMessageService
  ) {
    this.status = false;
    this.id = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.post = new Post();
    this.setCSS();
    this.sub1 = this.loginService.logged.subscribe((status) => {
      this.logged = status;
    });
    this.sub2 = this.postService.postEvent.subscribe((response) => {

      if (response['page']) {
        this.router.navigate([response['page']]);
      }

      if (response['post'] !== undefined) {
        this.status = true;
        this.post = response['post'];
        if (response['picture'] !== undefined) {
          this.post.picture = response['picture'];
        }
        if (response['author'] !== undefined) {
          this.post.author = response['author'];
        }
      } else {
        this.router.navigate(['/errors/404']);
      }
    });
    this.postService.getPostByID(this.id);
  }

  private setCSS() {
    document.getElementsByTagName('body')[0].setAttribute('style', 'background-color:#bababa;');
  }

  ngAfterViewInit(): void {
    this.loginService.CheckLogged();
  }

  toEdit() {
    this.sub3 = this.postService.check.subscribe((result) => {
      if (result['check'] === true) {
        this.router.navigate(['/edit', this.activatedRoute.snapshot.params.id]);
      } else {
        this.showMsg.createMessage(result['alert'], 'Information');
      }
    });
    this.postService.checkAuthorPost(this.post);
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
