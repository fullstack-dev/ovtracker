import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import {UserCycleDataService} from '../services/user-cycle-data.service';
import {UserDataService} from '../services/user-data.service';
import {GoogleService} from '../services/google.service';

import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {firebaseConfig} from '../../environments/firebaseConfig';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    GoogleService,
    UserDataService,
    UserCycleDataService
  ]
})
export class CoreModule { }
