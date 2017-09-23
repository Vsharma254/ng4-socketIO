import { Department } from './department'
export interface Employee {
    empID: Number,
    empName: string;
    empDepartmentID: Number,
    empMobileNumber: Number,
    empEmail: String,
    empActiveStatus: Boolean,
    empDeleteStatus: Boolean,
    empCreateDate: Date,
    empUpdateDate: Date,
    empJoiningDate: Date,
    empDetails: String,
    empDesignation: String
}
export class eClass
{
    public tset :string;
    public c:testClass ;
    constructor()
    {
        this.tset = "this is from the method";
    }
    public tsetMethod()
    {
        let d = new testClass();
    }
}
export class testClass
{

}