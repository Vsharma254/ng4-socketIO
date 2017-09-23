import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DepartmentService } from '../shared/service/department.service';
import { Department } from '../shared/model/department';

@Component({
    selector: 'dept-selector-list',
    template: `
                 <label for="exampleInputEmail1">Department</label> 
                 <select class="form-control" id="departmentSelect" (change)="Selectonchange()" placeholder="Select Department" [(ngModel)]="selectedDepartment">
                            <option *ngFor="let dept of departmentList" [ngValue]="dept">{{dept.deptName}}</option>
                            </select> 
                           `,                
    providers: [DepartmentService]    
})
export class DepratmentSelectListComponent implements OnInit {
    public departmentList: Department[];
    public selectedDepartment: Department;
    @Output() myEvent = new EventEmitter<Department>();
    constructor(private deptSer: DepartmentService)
    { }
    ngOnInit() {
        this.selectedDepartment = {deptID:0, deptName: '--Select Depratment--' }
        this.deptSer.getDepartments().subscribe((resp) => {
            this.departmentList = resp;
        });
    }
    Selectonchange() {
        this.myEvent.emit(this.selectedDepartment);
    }
}



