import { Component, OnInit, AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../../../shared/models/post';
import { TokenService } from '../../../shared/services/token.service';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private postService: PostService,
    private tokenService: TokenService
  ) { }

  search: string;

  posts: Post;

  status: boolean;

  token: string;

  p = 1;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;

  ngOnInit() {
    this.Token();
    this.sub1 = this.postService.postsEvent.subscribe((response) => {
      this.posts = response;
    });

    this.status = true;
    this.search = '';
  }

  ngAfterViewInit() {
    this.SetCSS();
  }

  private SetCSS() {
    $('body').css('background-image', 'none');
    $('body').css('background-color', '#bababa');
    $('header').css('background-image', 'url("/assets/images/intro.jpg")');
  }

  onSearch() {
    this.listPost();
  }

  private listPost() {
    this.postService.getPostByTitle(this.search, this.token);
  }

  private Token() {
    this.tokenService.Token();
    this.sub2 = this.tokenService.token.subscribe((response) => {
      this.token = response;
      this.listPost();
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
