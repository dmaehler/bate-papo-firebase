import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userName: string;
  userSaved: boolean;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userName = this.userService.currentUser;
    this.userSaved = !!this.userName;
  }

  setUsername() {
    this.userService.saveUser(this.userName);
    this.userSaved = true;

    return false;
  }

}
