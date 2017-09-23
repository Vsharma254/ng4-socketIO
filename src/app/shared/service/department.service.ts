import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/Operator/map';
import 'rxjs/add/Operator/share';
import { Department } from '../model/department';
import { baseURl } from './serviceConfig';
@Injectable()
export class DepartmentService {
    private _baseUrl: string;
    constructor(private _http: Http) {
        this._baseUrl = baseURl;
    }
    public getDepartments(): Observable<Department[]> {
        return this._http.get(this._baseUrl + 'departments').map((res) =>        
         res.json());
    }
    public addDepartment(_dept: Department) {
        
        return this._http.post(this._baseUrl + 'adddepartment', _dept).map(res => res.json());
    }
    public deleteState(_state: Department): Observable<Department[]> {
        return this._http.post(this._baseUrl + 'deletestate', _state).map(resp => resp.json());
    }
}