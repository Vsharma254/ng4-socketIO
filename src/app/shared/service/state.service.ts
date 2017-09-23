import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/Operator/map';
import 'rxjs/add/Operator/share';
import { State } from '../model/state';
import { baseURl } from './serviceConfig';
@Injectable()
export class StateService {
    private _baseUrl: string;
    constructor(private _http: Http) {
        this._baseUrl = baseURl;
    }
    public getStates(): Observable<State[]> {
        return this._http.get(this._baseUrl + 'states').map((res) =>        
         res.json());
    }
    public addState(_state: State): Observable<State[]> {
        return this._http.post(this._baseUrl + 'addState', _state).map(res => res.json());
    }
    public deleteState(_state: State): Observable<State[]> {
        return this._http.post(this._baseUrl + 'deletestate', _state).map(resp => resp.json());
    }
}