import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChargeCardComponent} from './demo/charge-card/charge-card.component';
import {SaveCardComponent} from './demo/save-card/save-card.component';
import {ReadMeComponent} from './demo/read-me/read-me.component';
import {SubscriptionPageComponent} from './demo/subscription-page/subscription-page.component';
import {StripeDashboardComponent} from './demo/stripe-dashboard/stripe-dashboard.component';
import {ConnectPageComponent} from './demo/connect-page/connect-page.component';
import {ConnectRedirectComponent} from './payment/connect-redirect/connect-redirect.component';

import {AuthGuard} from './core/auth.guard';
import {HomeComponent} from './home/home.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {CyclesComponent} from './cycles/cycles.component';
import {AddCyclesComponent} from './cycles/add-cycles/add-cycles.component';
import {FaqsComponent} from './faqs/faqs.component';
import {OvulationCalculatorComponent} from './ovulation-calculator/ovulation-calculator.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {SurveyComponent} from './survey/survey.component';
import {TermsComponent} from './terms/terms.component';
import {ProfileComponent} from './profile/profile.component';
import {SubscribeComponent} from './subscribe/subscribe.component';

const routes: Routes = [
  {path: 'charge', component: ChargeCardComponent, canActivate: [AuthGuard]},
  {path: 'save-card', component: SaveCardComponent, canActivate: [AuthGuard]},
  {path: 'subscription', component: SubscriptionPageComponent, canActivate: [AuthGuard]},
  {path: 'stripe-dashboard', component: StripeDashboardComponent, canActivate: [AuthGuard]},

  {path: '', component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'get-started', component: CalculatorComponent, canActivate: [AuthGuard]},
  {path: 'cycles', component: CyclesComponent, canActivate: [AuthGuard]},
  {path: 'add-cycles', component: AddCyclesComponent, canActivate: [AuthGuard]},
  {path: 'faqs', component: FaqsComponent, canActivate: [AuthGuard]},
  {path: 'ovulation-calculator', component: OvulationCalculatorComponent},
  {path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard]},
  {path: 'subscribe', component: SubscribeComponent, canActivate: [AuthGuard]},
  {path: 'survey', component: SurveyComponent},
  {path: 'terms', component: TermsComponent, canActivate: [AuthGuard]},


  // Stripe Connect
  {path: 'connect', component: ConnectPageComponent},
  {path: 'redirect', component: ConnectRedirectComponent},

  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
