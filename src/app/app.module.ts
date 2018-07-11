import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgProgressModule} from 'ngx-progressbar';
import {ToastModule} from 'ng2-toastr';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../environments/firebaseConfig';

import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {PaymentModule} from './payment/payment.module';
import {DemoModule} from './demo/demo.module';
import {MaterialModule} from './material.module';

import {DataService} from './services/data-service';

import {AppComponent} from './app.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {CyclesComponent} from './cycles/cycles.component';
import {HomeComponent} from './home/home.component';
import {AddCyclesComponent} from './cycles/add-cycles/add-cycles.component';
import {TermsComponent} from './terms/terms.component';
import {FaqsComponent} from './faqs/faqs.component';
import {OvulationCalculatorComponent} from './ovulation-calculator/ovulation-calculator.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {SurveyComponent} from './survey/survey.component';
import {ProfileComponent} from './profile/profile.component';
import {FooterComponent} from './shared/footer/footer.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { DeleteCycleDialogComponent } from './cycles/delete-cycle-dialog/delete-cycle-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    AboutUsComponent,
    CyclesComponent,
    AddCyclesComponent,
    AboutUsComponent,
    HomeComponent,
    FaqsComponent,
    OvulationCalculatorComponent,
    PageNotFoundComponent,
    PrivacyComponent,
    SurveyComponent,
    TermsComponent,
    ProfileComponent,
    FooterComponent,
    SubscribeComponent,
    DeleteCycleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    PaymentModule,
    DemoModule,
    ToastModule.forRoot(),
    NgProgressModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteCycleDialogComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {
}
