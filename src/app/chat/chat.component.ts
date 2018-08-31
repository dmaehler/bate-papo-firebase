import { UserService } from './../user.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { switchMap, map, tap } from 'rxjs/operators';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('messagesContainer') 
  messagesContainer : ElementRef;

  message: string;
  messages: Observable<Message[]>;
  room: Observable<Room>;

  private roomRef: AngularFirestoreDocument<Room>;
  private userName: string;

  constructor(private route: ActivatedRoute, 
    private db: AngularFirestore,
    private userService : UserService) { }

  ngOnInit() {
    this.messages = this.route.paramMap.pipe(
      map(params => params.get('room')),
      tap(room => {
        this.room = this.db.doc<Room>('/rooms/' + room).valueChanges();
        this.roomRef = this.db.doc('/rooms/' + room);
      }),
      switchMap(() => this.roomRef.collection<Message>('messages', (ref) => ref.orderBy('date'))
        .valueChanges())
    );

    this.userName = this.userService.currentUser;
    this.userService.userChanged.subscribe(user => this.userName = user);
  }

  ngOnDestroy() {
    this.userService.userChanged.unsubscribe();
  }

  sendMessage() {
    if (!this.message.trim()) {
      return;
    }

    this.roomRef.collection<Message>('messages').add({
      date: new Date(),
      sender: this.userName,
      text: this.message
    }).then(() => this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight);

    this.message = '';
  }

  onEnter(event : KeyboardEvent) {
    if (!event.ctrlKey || !event.shiftKey) {
      this.sendMessage();
    }
  }

}
