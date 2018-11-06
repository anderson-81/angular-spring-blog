import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShowMessageService } from './showmessage.service';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenService {

    token = new EventEmitter<string>();

    private readonly API: string = `${environment.API}`;

    constructor(private http: HttpClient, private showMsg: ShowMessageService) { }

    Token() {
        this.http.put(this.API + '/token', null)
            .subscribe((response) => {
                this.token.emit(response.toString());
            }, () => {
                this.showMsg.createMessage('Server error.', 'Error');
            });
    }
}
