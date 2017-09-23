// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { Actions, Effect } from '@ngrx/effects';
// import { DepartmentService } from '../shared/service/department.service';
// import {Get_DepartmentAction, GET_DEPARTMENT_LIST_SUCCESS} from '../reducers/department.reducer';
// import { Observable } from 'rxjs';
// import "rxjs/add/operator/switchMap";
// @Injectable()
// export class DepartmentEffect {
//     constructor(private action$: Actions, private deptSrv: DepartmentService) {

//     }
//     @Effect() getDepartments = this.action$.ofType('LOAD_DEPARTMENTS1').switchMap(paload =>
//              this.deptSrv.getDepartments().map((res) => {
//                 ({ type: 'GET_DEPARTMENTS2', payload: res })
//             }));
// }   