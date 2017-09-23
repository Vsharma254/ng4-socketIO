import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { ChatService } from '../shared/service/chat.service';
import { UserService } from '../shared/service/user.service';
import { User } from '../shared/model/User';
@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title,
    ChatService
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: ['./home.component.css'],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public user: User;
  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */
  public socket;
  constructor(
    public appState: AppState,
    public title: Title,
    private router: Router,
    private io: ChatService, private userServ: UserService) {
    this.socket = io.coonectToServer();
    this.user = this.userServ.getLogedInUser();
   
  }

  public ngOnInit() {
    this.io.loginUpdate(this.user);
    // connect to socket first
    console.log('hello `Home` component');
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }
  public logout() {
    this.socket.emit('get-userOnLogout', this.user);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login/']);
  }
  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
