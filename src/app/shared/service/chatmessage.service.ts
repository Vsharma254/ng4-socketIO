import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Operator/map';
import 'rxjs/add/Operator/share';
import { ChatMessage } from '../model/chatMessage';
import { User } from '../model/user';
import { baseURl } from './serviceConfig';
@Injectable()
export class ChatMessageService {
    private _baseUrl: string;
    constructor(private _http: Http) {
        this._baseUrl = baseURl;
    }
    public getAllMessages(): Observable<ChatMessage[]> {
        return this._http.get(this._baseUrl + 'allmessages').map((res) =>        
         res.json());
    }
    public getUserMessage(users: ChatMessage): Observable<ChatMessage[]> {
          return this._http.post(this._baseUrl + 'usersmessage', users).map(res => res.json());
    }
}