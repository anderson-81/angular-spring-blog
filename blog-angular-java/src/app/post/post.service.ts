import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Post } from '../../shared/models/post';
import { ShowMessageService } from '../../shared/services/showmessage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PostService implements OnInit {

  private readonly API: string = `${environment.API}`;

  postsEvent = new EventEmitter<Post[]>();

  postEvent = new EventEmitter<object>();

  operation = new EventEmitter<object>();

  check = new EventEmitter<object>();

  posts: Post[];

  constructor(
    private http: HttpClient,
    private showMsg: ShowMessageService
  ) { }

  ngOnInit() {
  }

  getPostByTitle(title: string, token: string) {

    const httpParams = new HttpParams()
      .append('search', title)
      .append('token', token);

    this.http.post<Post[]>(this.API + '/index', httpParams).subscribe((response) => {
      this.postsEvent.emit(response['posts']);
    }, () => {
      this.showMsg.createMessage('Server error.', 'Error');
    });
  }

  getPostByID(id: number) {
    this.http.put<Post>(this.API + '/show/' + id.toString(), null).subscribe((response) => {
      this.postEvent.emit(response);
    }, () => {
      this.showMsg.createMessage('Server error.', 'Error');
    });
  }

  getPostByIDForEdit(id: number) {
    this.http.put<Post>(this.API + '/edit/' + id.toString(), null).subscribe((response) => {
      this.postEvent.emit(response);
    }, () => {
      this.showMsg.createMessage('Server error.', 'Error');
    });
  }

  addPost(post: Post, token: string) {
    const frmData = new FormData();
    frmData.append('title', post.title);
    frmData.append('briefing', post.briefing);
    frmData.append('text', post.text);
    frmData.append('picture', post.picture);
    frmData.append('token', token);
    this.http.post<Post[]>(this.API + '/new', frmData).subscribe((response) => {
      this.operation.emit(response);
    }, () => {
      this.showMsg.createMessage('Server error.', 'Error');
    });
  }

  editPost(post: Post, token: string) {
    const frmData = new FormData();
    frmData.append('id', post.id.toString());
    frmData.append('title', post.title);
    frmData.append('briefing', post.briefing);
    frmData.append('text', post.text);
    if (post.picture !== null) {
      frmData.append('picture', post.picture);
    }
    frmData.append('token', token);

    this.http.post<Post[]>(this.API + '/edit/update', frmData).subscribe((response) => {
      this.operation.emit(response);
    }, () => {
      this.showMsg.createMessage('Server error.', 'Error');
    });
  }

  deletePost(post: Post, token: string) {
    this.http.delete<Post[]>(this.API + '/delete/' + post.id + '/' + token).subscribe((response) => {
      this.operation.emit(response);
    }, () => {
      this.showMsg.createMessage('Server error.', 'Error');
    });
  }

  checkAuthorPost(post: Post) {
    return this.http.put<Post>(this.API + '/show/' + post.id + '/checkauthor', null).subscribe((response) => {
      this.check.emit(response);
    }, () => {
      this.showMsg.createMessage('Server error.', 'Error');
    });
  }
}
