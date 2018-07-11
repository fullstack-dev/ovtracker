import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from '../core/user';
import {UUID} from 'angular2-uuid';
import {CycleData} from './cycle-data';
import {DataService} from './data-service';
import {AuthService} from '../core/auth.service';

@Injectable()
export class UserCycleDataService {

  user: User;

  usersCollection: AngularFirestoreCollection<CycleData>;
  cycles: Observable<CycleData[]>;
  cycleDoc: AngularFirestoreDocument<CycleData>;

  constructor(public firestore: AngularFirestore,
              private dataService: DataService,
              private auth: AuthService) {

    // Assign user to the cycledata
    this.auth.user.subscribe((data) => {
      // console.log('DATA IN USER CYCLE DATA SERVICE', data);
      this.user = data;
    });

    const uid = this.dataService.getUid(); // To persist the firebase uid throughout the app
    this.usersCollection = this.firestore.collection('users/' + uid + '/cycleData');

    this.cycles = this.usersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as CycleData;
        data.uid = a.payload.doc.id;
        return data;
      });
    });
  }

  getCycles() {
    return this.cycles;
  }

  addCycle(cycle: CycleData) {
    // console.log('ENTERED CYCLE = ', cycle);
    this.usersCollection.add(cycle);
  }

  deleteCycle(cycle: CycleData) {
    // console.log('DELETED CYCLE = ', cycle);
    this.cycleDoc = this.firestore.doc('users/' + this.user.uid + '/cycleData/' + cycle.uid);
    this.cycleDoc.delete().then(
      () => console.log('success cycle DELETED'),
      (err) => console.log('Error ', err)
    );
  }

  updateCycle(cycle: CycleData) {
    console.log('UPDATED CYCLE = ', cycle);
    this.cycleDoc = this.firestore.doc('users/' + this.user.uid + '/cycleData/' + cycle.uid);
    this.cycleDoc.update(cycle).then(
      () => console.log('success cycle UPDATED'),
      (err) => console.log('Error ', err)
    );
  }

  createCycleId() {
    return UUID.UUID();
  }

}
