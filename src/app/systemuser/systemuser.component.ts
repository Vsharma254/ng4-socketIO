import {
    Component, OnInit, ViewChild,
    DoCheck, OnChanges, KeyValueDiffers,
    ChangeDetectionStrategy
} from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { User } from '../shared/model/user';
import { Observable } from 'rxjs/Observable';
import { DepartmentReducer } from '../reducers/department.reducer';
import { Store } from '@ngrx/store';
@Component({
    selector: 'my-systemuser',
    templateUrl: 'systemuser.component.html',
    styleUrls: ['./systemuser.component.css'],
    providers: [UserService]
})

export class SystemUserComponent implements OnInit, DoCheck {
    public user: User = { id: 0, userName: '', name: '', password: '', type: 0, email: '' };
    public userList: User[] = [];
    constructor(private userService: UserService, private store: Store<any>) {
    }
    ngDoCheck() {
        // var changes = this.differ.diff(this.dept);
        // if (changes) {
        //     changes.forEachChangedItem(x => {
        //         this.inFromComDone = x.currentValue;
        //     });
        // }
    }

    public clrearControls() {
        this.user = { id: 0, userName: '', name: '', password: '', type: 0, email: '' };
    }
    public addNewSystemUser() {
        if (this.user.name === '') {
            alert('Please enter user name');
            return;
        }
        this.userService.addNewSystemUser(this.user).subscribe((res) => {
            alert('New user is added successfully!!');
            this.getDeprtmentList();
            this.clrearControls();
        });

    }
    public ngOnInit() { this.getDeprtmentList(); }
    private getDeprtmentList() {
        this.userService.getUsers().subscribe((resp) => {
                this.userList = resp;
        });
    }}