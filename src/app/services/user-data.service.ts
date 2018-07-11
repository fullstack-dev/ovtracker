import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {User} from '../core/user';
import {DataService} from './data-service';

@Injectable()
export class UserDataService {

  user: User;
  user$: any;

  private itemsCollection: AngularFirestoreCollection<any[]>;

  constructor(private firestore: AngularFirestore,
              private dataService: DataService) {

    this.itemsCollection = firestore.collection('users/', ref => ref.orderBy('uid', 'asc'));
    const collection$: Observable<any> = this.itemsCollection.valueChanges();
    // collection$.subscribe(data => console.log('USER DATA SERVICE, LIST ALL USERS', data));
  }

  postCalendarId(currentCalendarId) {
    this.user$ = this.firestore.doc('users/' + this.dataService.getUid());
    this.user$.update({calendarId: currentCalendarId});
    console.log('Calendar ID Saved');
  }

  postSheetId(sheetId) {
    // this.user$ = this.db.object('profiles/' + this.user.uid);
    // this.user$.update({sheetId: sheetId});
    // console.log('Sheet ID Saved in Firebase');

    this.user$ = this.firestore.doc('users/' + this.dataService.getUid());
    this.user$.update({sheetId: sheetId});
    console.log('Sheet ID Saved');
  }

  getUser() {
    this.user$ = this.firestore.doc('users/' + this.dataService.getUid());
    return this.user$;
  }

}
