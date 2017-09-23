import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Operator/map';
import 'rxjs/add/Operator/share';
import { User } from '../model/User';
import { baseURl } from './serviceConfig';
import { SerializationHelper } from '../SerializationHelper';
@Injectable()
export class UserService {
    private _baseUrl: string;
    constructor(private _http: Http) {
        this._baseUrl = baseURl;
    }
    public authenticateUser(_user: User): Observable<User> {
        return this._http.post(this._baseUrl + 'authuser', _user).map(res => res.json());
    }
    public getUsers(): Observable<User[]> {
        return this._http.get(this._baseUrl + 'users').map((res) => res.json());
    }
    public addNewSystemUser(_user: User): Observable<User[]> {
        return this._http.post(this._baseUrl + 'addUser', _user).map((res) => res.json());
    }
    public deleteState(_user: User): Observable<User[]> {
        return this._http.post(this._baseUrl + 'deletestate', _user).map((resp) => resp.json());
    }
    public getLogedInUser() {
        let _user: User = { id: 0, name: '', password: '', userName: '', email: '', type: 0 };
        _user = SerializationHelper.toInstance<User>(_user, localStorage.getItem('currentUser'));
        return _user;
    }
}