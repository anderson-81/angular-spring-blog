import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Post } from '../../../shared/models/post';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowMessageService } from '../../../shared/services/showmessage.service';
import { TokenService } from '../../../shared/services/token.service';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnDestroy {

  edit = 0;

  change = false;

  errors = [];

  token;

  author;

  title = '';

  status: boolean;

  picture_preview;

  private post = new Post();

  selectedFiles: FileList;

  pct;

  confirmation;

  opc: boolean;

  eventDeactivate = new EventEmitter<boolean>();

  deactivate: boolean;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;

  constructor(
    private router: Router,
    private showMsg: ShowMessageService,
    private tokenService: TokenService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.status = false;
    this.sub1 = this.tokenService.token.subscribe((response) => {
      this.token = response;
    });
    this.errors = [];
    this.setCss();
    if (this.router.url.includes('new')) {
      this.onReset(0);
      this.title = 'Create';
      this.edit = 0;
      this.status = true;
    } else {
      this.sub2 = this.postService.postEvent.subscribe((response) => {

        console.log(JSON.stringify(response));

        if (response !== undefined) {
          if (response['alert']) {
            this.showMsg.createMessage(response['alert'], 'Information');
          }
          if (response['page']) {
            this.router.navigate(['/details', this.activatedRoute.snapshot.params.id]);
          }
          this.sub3 = this.postService.check.subscribe((result) => {

            console.log(JSON.stringify(result));

            if (result['check'] === true) {
              this.post = response['post'];
              this.post.picture = undefined;
              this.author = response['author'];
              this.picture_preview = response['picture'];
              this.status = true;
            } else {
              this.router.navigate(['/details', this.activatedRoute.snapshot.params.id]);
              this.showMsg.createMessage(result['alert'], 'Information');
            }
          });
          this.postService.checkAuthorPost(response['post']);
        } else {
          this.router.navigate(['/errors/404']);
        }
      });
      this.title = 'Edit';
      this.edit = 1;
      this.postService.getPostByIDForEdit(this.activatedRoute.snapshot.params.id);
    }
    this.sub4 = this.postService.operation.subscribe((response) => {
      if (response['errors'] !== undefined) {
        this.errors = response['errors'];
        this.Token();
      }
      if (response['alert'] !== undefined) {
        this.showMsg.createMessage(response['alert'], 'Information');
      }
      if (response['page'] !== undefined) {
        this.router.navigate([response['page']]);
      }
      this.status = true;

      console.log(JSON.stringify(response));
    });
    this.Token();
  }

  onSubmit() {
    this.deactivate = false;
    if (this.edit === 1) {
      if (this.post.picture === undefined) {
        this.post.picture = null;
      }
    }
    this.status = false;
    this.onValidPost();
    if (this.errors.length === 0) {
      if (this.SetPost()) {
        this.router.navigate(['/']);
      }
    } else {
      this.Token();
      this.status = true;
    }
  }

  onReset(opc: number) {
    this.post.id = 0;
    this.post.title = '';
    this.post.briefing = '';
    this.post.text = '';
    this.post.picture = '';
    $('#filePicture').val(null);
    this.errors = [];
    if (opc === 1) {
      this.Token();
    }
  }

  private onValidPost() {
    this.errors = [];
    if (!this.isEmpty(this.post.title)) {
      if (this.checkLenght(this.post.title, 10)) {
        this.errors.push('Title with invalid character quantity. (10)');
      }
    } else {
      this.errors.push('Title is empty.');
    }

    if (!this.isEmpty(this.post.briefing)) {
      if (this.checkLenght(this.post.briefing, 15)) {
        this.errors.push('Briefing with invalid character quantity. (15)');
      }
    } else {
      this.errors.push('Briefing is empty.');
    }

    if (!this.isEmpty(this.post.text)) {
      if (this.checkLenght(this.post.text, 50)) {
        this.errors.push('Text with invalid character quantity. (50)');
      }
    } else {
      this.errors.push('Text is empty.');
    }

    if (this.post.picture === '') {
      this.errors.push('Picture is empty');
    }

    if (this.isEmpty(this.token)) {
      this.errors.push('Token is empty');
    }

    if (this.edit === 1) {
      if ((this.post.id === 0)) {
        this.errors.push('Author is empty');
      }
    }
  }

  private isEmpty(attr) {
    return (attr.length === 0);
  }

  private checkLenght(attr, qtd) {
    return (!(attr.length > qtd));
  }

  private Token() {
    this.tokenService.Token();
  }

  private SetPost() {
    console.log(this.post);
    (this.edit === 0) ? this.postService.addPost(this.post, this.token) :
      this.postService.editPost(this.post, this.token);
  }

  private setCss() {
    $('body').css('background-image', 'url("/assets/images/intro.jpg")');
    $('body').css('color', 'white');
  }

  inputFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.post.picture = event.target.files[0];
    }
  }

  private deletePost() {
    this.status = false;
    this.postService.deletePost(this.post, this.token);
  }

  private editPost() {
    this.status = false;
    this.onSubmit();
  }

  setChange() {
    this.deactivate = true;
    this.change = true;
  }

  showDeactivate() {
    $('#modalDeactivate').modal('show');
  }

  setConfirmDeactivate(_opc: boolean) {
    this.eventDeactivate.emit(_opc);
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
    if (this.sub4 && !this.sub4.closed) {
      this.sub4.unsubscribe();
    }
  }
}
