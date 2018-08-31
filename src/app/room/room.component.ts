import { Room } from './../models/room';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  rooms : Observable<Room[]>;
  
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.rooms = this.db.collection<Room>('rooms').valueChanges();
  }

}
