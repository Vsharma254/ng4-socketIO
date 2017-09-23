import { Component, OnInit, ViewChild,
         DoCheck, OnChanges, KeyValueDiffers, 
         ChangeDetectionStrategy } from '@angular/core';
import { DepartmentService } from '../shared/service/department.service';
import { Department } from '../shared/model/department';
import { SharedDirectiveModule } from '../plugin-component/shared-directive-module';
import { SetActiveInactiveDirective } from '../plugin-component/setActiveInactive-directive';
import { Observable } from 'rxjs/Observable';
import { DepartmentReducer } from '../reducers/department.reducer';
import { Store } from '@ngrx/store';
@Component({
    selector: 'dept-selector',
    templateUrl: 'department.component.html',
    styleUrls: ['./department.component.css'],
    providers: [DepartmentService]
})

export class DeparmentComponent implements OnInit, DoCheck {
    public dept: Department = { deptID: 0, deptName: '' };
    public obsDeptList: Observable<any>;
    public _deptList: Department[] = [];
    public inFromComDone: string;
    @ViewChild(SetActiveInactiveDirective) dirt: SetActiveInactiveDirective;
    differ: any;
    public p1: string = 'coming from compo';
    constructor(private _DepartmentService: DepartmentService, 
                private differs: KeyValueDiffers, private store: Store<any>) {
        this.differ = differs.find({}).create(null);
    }
    ngDoCheck() {
        var changes = this.differ.diff(this.dept);
        if (changes) {
            changes.forEachChangedItem(x => {
                this.inFromComDone = x.currentValue;
            });
        }
    }

    public clrearControls() {
        this.dept = { deptID: 0, deptName: '' };
    }
    public addNewDepartment() {
        if (this.dept.deptName == "") {
            alert("Please enter department name");
            return;
        }
        this._DepartmentService.addDepartment(this.dept).subscribe(re => {
            alert('New department is added successfully!!');
            this.getDeprtmentList();
            this.clrearControls();
            this.dirt.test = "New Department added successfully!!";
        });

    }
  public  ngOnInit() { this.getDeprtmentList(); }
    private getDeprtmentList() {

        this._DepartmentService.getDepartments().subscribe(resp => {
            this.store.dispatch({ type: 'GET_DEPARTMENTS', payload: resp });
            this.obsDeptList = this.store.select('DepartmentReducer');
            this.obsDeptList.subscribe(r => {
                this._deptList = r.payload;
            });
        });
    }
}