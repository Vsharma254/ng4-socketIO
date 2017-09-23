import {
    Injectable,
    OnInit
} from '@angular/core';
import * as io from 'socket.io-client';
@Injectable()
export class ChatService {
    public socket;
    private url: String = 'http://localhost:3000/';

    public coonectToServer() {
        let allowedOrigins = 'http://localhost:3001/';
        if (this.socket === undefined) {
            this.socket = io(this.url, { origins: allowedOrigins });
            return this.socket;
        } else {
            if (this.socket.disconnected) {
                this.socket.connect();
            }
            return this.socket;
        }
    }
    public sendChatMeesageToServer(message: any) {
        this.socket.emit('send-messageFromClient', message);
    }
    public loginUpdate(user: any) {
        this.socket.emit('user-loginUser', user);
    }
    public getOnlineUsers(user: any, callback: any) {
        this.socket.emit('get-userOnline', user, callback);
    }
}
