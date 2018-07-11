import {Component} from '@angular/core';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-ovulation-calculator',
  templateUrl: './ovulation-calculator.component.html',
  styleUrls: ['./ovulation-calculator.component.css']
})
export class OvulationCalculatorComponent {

  previousPeriod: string;
  currentPeriod: string;
  lastOvulation: string;
  nextPeriod: string;
  nextOvulation: string;
  ovulationWindow1: string;
  ovulationWindow2: string;
  ovulationWindow3: string;
  ovulationWindow4: string;
  safePeriod1: string;
  safePeriod2: string;
  safePeriod3: string;
  safePeriod4: string;
  days: number;
  ovulationDay: number;

  constructor(public auth: AuthService) {
  }

  ovulationCalculator() {

    const date1 = new Date(this.previousPeriod);
    const previous_date = date1.getTime();
    const date2 = new Date(this.currentPeriod);
    const current_date = date2.getTime();

    const date_diff = (current_date - previous_date);
    const seconds = (date_diff / 1000);
    const minutes = (seconds / 60);
    const hours = (minutes / 60);
    this.days = (hours / 24);
    this.ovulationDay = this.days - 14;

    const date = new Date(this.currentPeriod);
    const d = new Date(date.setDate(date.getDate() - 14));
    this.lastOvulation = this.formatDate(d);

    const date3 = new Date(this.currentPeriod);
    const d3 = new Date(date3.setDate(date3.getDate() + this.days));
    this.nextPeriod = this.formatDate(d3);

    const date4 = new Date(this.currentPeriod);
    const d4 = new Date(date4.setDate(date4.getDate() + this.days - 14));
    this.nextOvulation = this.formatDate(d4);

    const date5 = new Date(this.currentPeriod);
    const d5 = new Date(date5.setDate(date5.getDate() - 18));
    this.ovulationWindow1 = this.formatDate(d5);

    const date6 = new Date(this.currentPeriod);
    const d6 = new Date(date6.setDate(date6.getDate() - 14));
    this.ovulationWindow2 = this.formatDate(d6);

    const date7 = new Date(this.currentPeriod);
    const d7 = new Date(date7.setDate(date7.getDate() + (this.days - 18)));
    this.ovulationWindow3 = this.formatDate(d7);

    const date8 = new Date(this.currentPeriod);
    const d8 = new Date(date8.setDate(date8.getDate() + (this.days - 14)));
    this.ovulationWindow4 = this.formatDate(d8);

    this.safePeriod1 = this.currentPeriod;

    const date9 = new Date(this.currentPeriod);
    const d9 = new Date(date9.setDate(date9.getDate() + 9));
    this.safePeriod2 = this.formatDate(d9);

    const date10 = new Date(this.currentPeriod);
    const d10 = new Date(date10.setDate(date10.getDate() + 15));
    this.safePeriod3 = this.formatDate(d10);

    const date11 = new Date(this.currentPeriod);
    const d11 = new Date(date11.setDate(date11.getDate() + 37));
    this.safePeriod4 = this.formatDate(d11);

  }

  formatDate(date: Date) {
    return [
      date.getFullYear(),
      ('0' + (date.getMonth() + 1)).slice(-2),
      ('0' + (date.getDate() + 1)).slice(-2)
    ].join('-');
  }

}
