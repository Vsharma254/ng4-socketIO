import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/Operator/map';
import 'rxjs/add/Operator/share';
import 'rxjs/add/Operator/mergeMap';
import 'rxjs/add/Operator/catch';


import { Employee } from '../model/employee';
import { baseURl } from './serviceConfig';
import { DepartmentService } from './department.service';
@Injectable()
export class EmployeeService {
    private _baseUrl: string;
    constructor(private _http: Http, private dept: DepartmentService) {
        this._baseUrl = baseURl;
    }
    public getEmplyees(): Observable<Employee[]> {
        return this._http.get(this._baseUrl + 'employees').map((res) =>        
         res.json()).catch(res => {
              return Observable.throw(res.json());
           });
    }
    public GetMergeMap()
    {
        return this._http.get(this._baseUrl + 'employees').mergeMap(emp => this._http.get('http://localhost:3000/departments'));
    }
    public addEmployee(_emp: Employee) {
        
        return this._http.post(this._baseUrl + 'addemployee', _emp).map(res => res.json());
    }
    public deleteEmployee(_emp: Employee): Observable<Employee[]> {
        return this._http.post(this._baseUrl + 'deleteemployee', _emp).map(resp => resp.json());
    }
}