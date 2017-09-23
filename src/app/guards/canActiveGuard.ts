import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../shared/service/user.service';
import { User } from '../shared/model/User';
import { SerializationHelper } from '../shared/SerializationHelper';
@Injectable()
export class CanActiveGuardForRoute implements CanActivate {
    public _user: User = { id: 0, name: '', password: '', userName: '', email: '', type: 0 };
    constructor(private userSer: UserService, private router: Router) { }
    public canActivate() {
        this. _user = { id: 0, name: '', password: '', userName: '', email: '', type: 0 };
        this._user = SerializationHelper.toInstance<User>(
            this._user, localStorage.getItem('currentUser'));
        if (this._user.id === 0) {
            this.router.navigate(['/login/']);
            return false;
        }else {
             return true; }
    }
}