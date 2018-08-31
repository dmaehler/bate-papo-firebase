import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser : string;

  userChanged: Subject<string> = new Subject();

  constructor() {
    this.currentUser = localStorage.getItem('username');
  }

  saveUser(newUser: string) {
    localStorage.setItem('username', newUser);
    this.userChanged.next(newUser);
  }

}
