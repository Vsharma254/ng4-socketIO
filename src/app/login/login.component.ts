import {
  Component,
  OnInit
} from '@angular/core';
import { User } from '../shared/model/User';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/service/user.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: User = { id: 0, userName: '', name: '', password: '', type: 0, email: '' };
  public localState: any;
  constructor(
    public route: ActivatedRoute, private _UserService: UserService, private router: Router
  ) { }

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        /**
         * Your resolved data from route.
         */
        this.localState = data.yourData;
      });

    console.log('hello `Login` component');
  }
  public loginUser() {
    if (this.user.userName === '') {
      alert('Please enter user name');
      return;
    }
    if (this.user.password === '') {
      alert('Please enter password');
      return;
    }
    this._UserService.authenticateUser(this.user).subscribe((res) => {
      this.user = res;
      if (this.user.id === 0) {
        alert('User name or password is incorrect');
      } else {
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.router.navigate(['/myapp/']);
      }
    });
  }

}
