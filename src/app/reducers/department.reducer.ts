import { ActionReducer, Action } from '@ngrx/store';
import { Department } from '../shared/model/department';
export const GET_DEPARTMENTS = 'GET_DEPARTMENTS';
export const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS';
export const GET_DEPARTMENT_LIST_SUCCESS = 'GET_DEPARTMENT_LIST_SUCCESS';
export const GET_DEPARTMENT_FAILUIRE = 'GET_DEPARTMENT_FAILUIRE';
export class Get_DepartmentAction implements Action {
   public readonly type: string = GET_DEPARTMENTS;
    constructor(public payload: Department) {

    }
}
export const DepartmentReducer: ActionReducer<any> = (state = [], action: Get_DepartmentAction) => {
    switch (action.type) {
        case LOAD_DEPARTMENTS:
            {
                return {
                    ...state,
                   payload: action.payload
                }
            }
            case GET_DEPARTMENTS:
            {
               return  {
                    ...state,
                   payload: action.payload
                }

            }
            case GET_DEPARTMENT_LIST_SUCCESS:
            {
               return  {
                    ...state,
                   payload: action.payload
                }
            }
                case GET_DEPARTMENT_FAILUIRE:
                {
                    return state;
                }
        default:
            return state;
    }
}