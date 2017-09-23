import { ActionReducer, Action } from '@ngrx/store';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const GET_EMPLOYEE_LIST = 'GET_EMPLOYEE_LIST';
export const EmployeeReducer: ActionReducer<any> = (state, action: Action) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
        case GET_EMPLOYEE_LIST:
        default:
            return state;
    }
}
