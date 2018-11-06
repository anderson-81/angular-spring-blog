import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../models/message';

@Injectable()
export class ShowMessageService {

    private msg = new Message();

    showMessage = new EventEmitter<Message>();

    createMessage(message, title) {
        this.msg.message = message;
        this.msg.title = title;
        this.showMessage.emit(this.msg);
    }
}
