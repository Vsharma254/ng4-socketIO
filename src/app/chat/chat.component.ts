import {
  Component, ElementRef, Renderer,
  OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/model/User';
import { ChatMessage } from '../shared/model/chatmessage';
import { UserService } from '../shared/service/user.service';
import { ChatService } from '../shared/service/chat.service';
import { ChatMessageService } from '../shared/service/chatmessage.service';

@Component({
  selector: 'my-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService, UserService, ChatMessageService]
})
export class ChatComponent implements OnInit, DoCheck {
  public chatMessage: ChatMessage;
  public onlineUserList: User[];
  public messageList: Array<ChatMessage> = new Array<ChatMessage>();
  public localState: any;
  public toUser: User;
  private socket;
  private user: User;
  constructor(private el: ElementRef, private renderer: Renderer,
    public route: ActivatedRoute, private io: ChatService, private userSer: UserService,
    private chatMsgSrv: ChatMessageService, private cr: ChangeDetectorRef
  ) {
    this.socket = io.coonectToServer();
    this.setInitMsg();
    this.user = this.userSer.getLogedInUser();
    this.onlineUserList = [];
  }
  public ngDoCheck() {
    let div = this.el.nativeElement.querySelector('#chat-messages');
    div.scrollTop = div.scrollHeight + 500;
  }
  public sendMessageToServer() {
    this.setMessageModle();
    let msg = Object.assign({}, this.chatMessage);
    this.messageList.push(msg);
    this.io.sendChatMeesageToServer(this.chatMessage);
    this.chatMessage.message = '';
  }
  public ngOnInit() {
    this.socket.on('send-messageToClient', (message: any) => {
      console.log(message);
      if (this.user.userName === message.toUser) {
        this.messageList.push(message);
      }
    });

    this.socket.on('send-loginNotification', (user: any) => {
      let userExist = this.onlineUserList.filter((item) => {
        return item.userName === user.userName ? true : false;
      });
      if (userExist.length > 0) {
        console.log(userExist[0]);
      } else {
        this.onlineUserList.push(user);
      }
    });
    this.socket.on('update-userOnLogout', (user: any) => {
      this.onlineUserList.forEach(function (item) {
        if (item.userName === user.userName) {
          item.status = user.status;
        }
      });
    });
    this.io.getOnlineUsers(this.user, (users) => {
      let _users = users.filter((item) => {
        return item.userName !== this.user.userName;
      });
      this.onlineUserList = _users;
      if (this.onlineUserList.length > 0) {
        this.toUser = this.onlineUserList[0];
        this.setMessageModle();
        this.chatMsgSrv.getUserMessage(this.chatMessage).subscribe((res) => {
          this.messageList = res;
        });
      }
    });
  }
  public ChangeChatUser(user: User) {
    this.toUser = user;
    this.setMessageModle();
    this.chatMsgSrv.getUserMessage(this.chatMessage).subscribe((res) => {
      this.messageList = res;
    });
  }
  private setInitMsg() {
    this.chatMessage = { id: 0, name: '', userName: '', message: '', sentOn: null, toUser: '' };
  }
  private setMessageModle() {
    this.chatMessage.userName = this.user.userName;
    this.chatMessage.name = this.user.name;
    this.chatMessage.toUser = this.toUser.userName;
    this.chatMessage.sentOn = new Date();
  }
}
