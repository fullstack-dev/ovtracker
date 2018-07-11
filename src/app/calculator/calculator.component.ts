import {ChangeDetectorRef, Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import * as moment from 'moment-timezone';
import {AuthService} from '../core/auth.service';
import {GoogleService} from '../services/google.service';
import {UserDataService} from '../services/user-data.service';

declare const gapi: any;

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentCalendarId: string;
  sheetId: string;
  eventId: any;

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

  constructor(public auth: AuthService,
              public cdr: ChangeDetectorRef,
              public googleService: GoogleService,
              public userDataService: UserDataService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  authToGoogle() {
    this.googleService.handleAuthClick();
  }

  ovulationCalculator() {

    // console.log('PREVIOUS PERIOD = ', this.previousPeriod);
    // console.log('CURRENT PERIOD = ', this.currentPeriod);

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

    this.lastOvulation = moment(this.currentPeriod, 'YYYY-MM-DD').subtract(14, 'days').format('YYYY-MM-DD');
    // console.log('LAST OVULATION = ', this.lastOvulation);

    this.nextPeriod = moment(this.currentPeriod, 'YYYY-MM-DD').add('days', this.days).format('YYYY-MM-DD');
    // console.log('NEXT PERIOD = ', this.nextPeriod);

    this.nextOvulation = moment(this.currentPeriod, 'YYYY-MM-DD').add(this.days - 14, 'days').format('YYYY-MM-DD');
    // console.log('NEXT OVULATION = ', this.nextOvulation);

    this.ovulationWindow1 = moment(this.currentPeriod, 'YYYY-MM-DD').subtract(18, 'days').format('YYYY-MM-DD');
    // console.log('OVULATION WINDOW 1 = ', this.ovulationWindow1);

    this.ovulationWindow2 = moment(this.currentPeriod, 'YYYY-MM-DD').subtract(14, 'days').format('YYYY-MM-DD');
    // console.log('OVULATION WINDOW 2 = ', this.ovulationWindow2);

    this.ovulationWindow3 = moment(this.currentPeriod, 'YYYY-MM-DD').add(this.days - 18, 'days').format('YYYY-MM-DD');
    // console.log('OVULATION WINDOW 3 = ', this.ovulationWindow3);

    this.ovulationWindow4 = moment(this.currentPeriod, 'YYYY-MM-DD').add(this.days - 14, 'days').format('YYYY-MM-DD');
    // console.log('OVULATION WINDOW 4 = ', this.ovulationWindow4);

    this.safePeriod1 = this.currentPeriod;
    // console.log('SAFE PERIOD 1 = ', this.safePeriod1);

    // TODO: This seems to be off by 1 minute
    this.safePeriod2 = moment(this.currentPeriod, 'YYYY-MM-DD').add(9, 'days').format('YYYY-MM-DD');
    // console.log('SAFE PERIOD 2 = ', this.safePeriod2);

    this.safePeriod3 = moment(this.currentPeriod, 'YYYY-MM-DD').add(15, 'days').format('YYYY-MM-DD');
    // console.log('SAFE PERIOD 3 = ', this.safePeriod3);

    // TODO: This seems to be off by 1 minute
    this.safePeriod4 = moment(this.currentPeriod, 'YYYY-MM-DD').add(37, 'days').format('YYYY-MM-DD');
    // console.log('SAFE PERIOD 4 = ', this.safePeriod4);
  }

  formatDate(date: Date) {
    return [
      date.getFullYear(),
      ('0' + (date.getMonth() + 1)).slice(-2),
      ('0' + (date.getDate() + 1)).slice(-2)
    ].join('-');
  }

  ngOnInit() {
    this.googleService.initGapi();
    this.userDataService.getUser().valueChanges().subscribe(user => {
      this.currentCalendarId = user.calendarId;
      this.sheetId = user.sheetId;
    });
  }

  // Post user's calendar ID to Firebase
  // postCalendarId() {
  //   this.userDataService.postCalendarId(this.currentCalendarId);
  // }

  // Post user's sheets ID to Firebase
  // postSheetId() {
  //   this.userDataService.postSheetId(this.sheetId);
  // }

  createCalendar() {
    this.googleService.createCalendar((id) => {
      this.currentCalendarId = id;
      this.userDataService.postCalendarId(this.currentCalendarId);
      console.log('USER WHO CREATED CALENDAR', this.userDataService.user);
      this.cdr.detectChanges();
    });
    this.toastr.success('Your calendar was created!', 'Great news!');
  }

  addCalendarEvents() {

    // Last_Ovulation_Occurred_Date - Event name in Calendar and Excel Sheet
    const lastOvulation = moment(this.lastOvulation, 'YYYY-MM-DD').endOf('day').utc().format();
    console.log('lastOvulation ', this.lastOvulation, lastOvulation);

    // Ovulation_Window_Start_Date - Event name in Calendar and Excel Sheet
    // Ovulation_Window_End_Date - Event name in Calendar and Excel Sheet
    const startDateOvWin1 = moment(this.ovulationWindow1, 'YYYY-MM-DD').utc().format();
    console.log('startDateOvWin1 ', this.ovulationWindow1, startDateOvWin1);
    const endDateOvWin2 = moment(this.ovulationWindow2, 'YYYY-MM-DD').endOf('day').utc().format();
    console.log('endDateOvWin2 ', this.ovulationWindow2, endDateOvWin2);

    // Next_Menstruation_Date - Event name in Calendar and Excel Sheet
    const startDateNextPeriod = moment(this.nextPeriod, 'YYYY-MM-DD').endOf('day').utc().format();
    console.log('startDateNextPeriod ', this.nextPeriod, startDateNextPeriod);

    // Next_Ovulation_Date - Event name in Calendar and Excel Sheet
    const startDateNextOvulation = moment(this.nextOvulation, 'YYYY-MM-DD').endOf('day').utc().format();
    console.log('startDateNextOvulation ', this.nextOvulation, startDateNextOvulation);

    // Next_Ovulation_Window_Start_Date - Event name in Calendar and Excel Sheet
    // Next_Ovulation_Window_End_Date - Event name in Calendar and Excel Sheet
    const startDateOvWin3 = moment(this.ovulationWindow3, 'YYYY-MM-DD').utc().format();
    console.log('startDateOvWin3 ', this.ovulationWindow3, startDateOvWin3);
    const endDateOvWin4 = moment(this.ovulationWindow4, 'YYYY-MM-DD').endOf('day').utc().format();
    console.log('endDateOvWin4 ', this.ovulationWindow4, endDateOvWin4);

    // Unlikely_Time_to_Conceive_Start_Date_Window_1 - Event name in Calendar and Excel Sheet
    // Unlikely_Time_to_Conceive_End_Date_Window_1 - Event name in Calendar and Excel Sheet
    const startDateSafePer1 = moment(this.safePeriod1, 'YYYY-MM-DD').utc().format();
    console.log('startDateSafePer1 ', this.safePeriod1, startDateSafePer1);
    const startDateSafePer2 = moment(this.safePeriod2, 'YYYY-MM-DD').endOf('day').utc().format();
    console.log('startDateSafePer2 ', this.safePeriod2, startDateSafePer2);

    // Unlikely_Time_to_Conceive_Start_Date_Window_2 - Event name in Calendar and Excel Sheet
    // Unlikely_Time_to_Conceive_End_Date_Window_2 - Event name in Calendar and Excel Sheet
    const startDateSafePer3 = moment(this.safePeriod3, 'YYYY-MM-DD').utc().format();
    console.log('startDateSafePer3 ', this.safePeriod3, startDateSafePer3);
    const startDateSafePer4 = moment(this.safePeriod4, 'YYYY-MM-DD').endOf('day').utc().format();
    console.log('startDateSafePer4 ', this.safePeriod4, startDateSafePer4);

    const timezoneValue = (Intl && Intl.DateTimeFormat().resolvedOptions().timeZone);

    const event = [

      {
        'summary': 'Ovulation_Occurred_Date',
        'location': 'N/A',
        'description': 'The date the release of egg(s) by the ovaries into the fallopian tube to be fertilized by sperm.',
        'start': {
          'date': this.lastOvulation,
          'timeZone': timezoneValue
        },
        'end': {
          'date': this.lastOvulation,
          'timeZone': timezoneValue
        },
        'recurrence': [
          'RRULE:FREQ=MONTHLY;COUNT=12'
        ],
        // 'reminders': {
        //   'useDefault': true, // TODO: allow end user to change
        //   'overrides': [
        //     {'method': 'email', 'minutes': 24 * 60},
        //     {'method': 'popup', 'minutes': 10}
        //   ]
        // }

      },

      {
        'summary': 'Ovulation_Window_Start_Date_and_End_Date',
        'location': 'N/A',
        'description': 'Ovulation window or fertile window refers to the' +
        ' most fertile days in your menstrual cycle which gives you the highest chance of conceiving).',
        'start': {
          'dateTime': startDateOvWin1,
          'timeZone': timezoneValue
        },
        'end': {
          'dateTime': endDateOvWin2,
          'timeZone': timezoneValue
        },
        'recurrence': [
          'RRULE:FREQ=MONTHLY;COUNT=12'
        ],
        // 'reminders': {
        //   'useDefault': true, // TODO: allow end user to change
        //   'overrides': [
        //     {'method': 'email', 'minutes': 24 * 60},
        //     {'method': 'popup', 'minutes': 10}
        //   ]
        // }

      },

      {
        'summary': 'Next_Menstruation_Date',
        'location': 'N/A',
        'description': 'Prediction of next menstruation date',
        'start': {
          'dateTime': startDateNextPeriod,
          'timeZone': timezoneValue
        },
        'end': {
          'dateTime': startDateNextPeriod,
          'timeZone': timezoneValue
        },
        'recurrence': [
          'RRULE:FREQ=MONTHLY;COUNT=12'
        ],
        // 'reminders': {
        //   'useDefault': true, // TODO: allow end user to change
        //   'overrides': [
        //     {'method': 'email', 'minutes': 24 * 60},
        //     {'method': 'popup', 'minutes': 10}
        //   ]
        // }

      },

      {
        'summary': 'Next_Ovulation_Date',
        'location': 'N/A',
        'description': 'Ovulation or fertile window with the most' +
        ' fertile days in your menstrual cycle which gives you the highest chance of conceiving.',
        'start': {
          'dateTime': startDateNextOvulation,
          'timeZone': timezoneValue
        },
        'end': {
          'dateTime': startDateNextOvulation,
          'timeZone': timezoneValue
        },
        'recurrence': [
          'RRULE:FREQ=MONTHLY;COUNT=12'
        ],
        // 'reminders': {
        //   'useDefault': true, // TODO: allow end user to change
        //   'overrides': [
        //     {'method': 'email', 'minutes': 24 * 60},
        //     {'method': 'popup', 'minutes': 10}
        //   ]
        // }

      },

      {
        'summary': 'Next_Ovulation_Window_Start_Date_and_End_Date',
        'location': 'N/A',
        'description': 'Prediction of next ovulation date',
        'start': {
          'dateTime': startDateOvWin3,
          'timeZone': timezoneValue
        },
        'end': {
          'dateTime': endDateOvWin4,
          'timeZone': timezoneValue
        },
        'recurrence': [
          'RRULE:FREQ=MONTHLY;COUNT=12'
        ],
        // 'reminders': {
        //   'useDefault': true, // TODO: allow end user to change
        //   'overrides': [
        //     {'method': 'email', 'minutes': 24 * 60},
        //     {'method': 'popup', 'minutes': 10}
        //   ]
        // }

      },

      {
        'summary': 'Unlikely_Time_to_Conceive_Start_Date_Window_1',
        'location': 'N/A',
        'description': 'First time frame your are unlikely to conceive.',
        'start': {
          'dateTime': startDateSafePer1,
          'timeZone': timezoneValue
        },
        'end': {
          'dateTime': startDateSafePer2,
          'timeZone': timezoneValue
        },
        'recurrence': [
          'RRULE:FREQ=MONTHLY;COUNT=12'
        ],
        // 'reminders': {
        //   'useDefault': true, // TODO: allow end user to change
        //   'overrides': [
        //     {'method': 'email', 'minutes': 24 * 60},
        //     {'method': 'popup', 'minutes': 10}
        //   ]
        // }

      },

      {
        'summary': 'Unlikely_Time_to_Conceive_Start_Date_Window_2',
        'location': 'N/A',
        'description': 'Second time frame your are unlikely to conceive.',
        'start': {
          'dateTime': startDateSafePer3,
          'timeZone': timezoneValue
        },
        'end': {
          'dateTime': startDateSafePer4,
          'timeZone': timezoneValue
        },
        'recurrence': [
          'RRULE:FREQ=MONTHLY;COUNT=12'
        ],
        // 'reminders': {
        //   'useDefault': true, // TODO: allow end user to change
        //   'overrides': [
        //     {'method': 'email', 'minutes': 24 * 60},
        //     {'method': 'popup', 'minutes': 10}
        //   ]
        // }

      },

    ];

    const _this = this;
    this.googleService.createEvent(this.currentCalendarId, event).then(res => {
      _this.eventId = res;
      console.log('CALENDAR EVENTS CREATED');

    });
    this.toastr.success('Your cycles have been added to your personal calendar!', 'Success!');

  }

  // TODO: move this to another page
  // listUpcomingEvents() {
  //   this.googleService.listUpcomingEvents(this.currentCalendarId);
  // }

  createSheet() {
    this.googleService.createSheet('OvTracker', (response) => {
      this.sheetId = response.result.spreadsheetId;
      console.log('sheetId', this.sheetId);
      this.userDataService.postSheetId(this.sheetId);
      this.cdr.detectChanges();
    });
    this.toastr.success('Your Google Sheet was created!', 'All good here!');
  }

  addSheetEvents() {
    // This works as it should. It post just the dates from the "results" section of the page.
    // And not recurring dates. So this function was moved to "addRecurringSheetEvents()"
    // so that not just the dates from the "results" section are printed but all future
    // recurring dates.

    // this.toastr.success('Your cycles were added to your Sheet!', 'Good news!');
    //
    // this.googleService.addSheetEvents({
    //   spreadsheetId: this.sheetId,
    //   range: 'A1:P2',
    //   valueInputOption: 'USER_ENTERED',
    //   values: [
    //     [
    //       'Previous_Period_Start_Date',
    //       'Period_Start_Date',
    //       'Menstrual_Cycle_Length',
    //       'Last_Ovulation_Occurred_Day_Number',
    //       'Ovulation_Occurred_Date',
    //       'Ovulation_Window_Start_Date',
    //       'Ovulation_Window_End_Date',
    //       'Next_Menstruation_Date',
    //       'Next_Ovulation_Date',
    //       'Next_Ovulation_Window_Start_Date',
    //       'Next_Ovulation_Window_End_Date',
    //       'Unlikely_Time_to_Conceive_Start_Date_Window_1',
    //       'Unlikely_Time_to_Conceive_End_Date_Window_1',
    //       'Unlikely_Time_to_Conceive_Start_Date_Window_2',
    //       'Unlikely_Time_to_Conceive_End_Date_Window_2',
    //     ],
    //     [
    //       this.previousPeriod,
    //       this.currentPeriod,
    //       this.days,
    //       this.ovulationDay,
    //       this.lastOvulation,
    //       this.ovulationWindow1,
    //       this.ovulationWindow2,
    //       this.nextPeriod,
    //       this.nextOvulation,
    //       this.ovulationWindow3,
    //       this.ovulationWindow4,
    //       this.safePeriod1,
    //       this.safePeriod2,
    //       this.safePeriod3,
    //       this.safePeriod4
    //     ]
    //   ]
    // });
  }

  addRecurringSheetEvents() {

    this.toastr.success('Your recurring cycles are being added to your Sheet!', 'All set.');

    // TODO: refactor this and move it to the google.service.ts file
    // TODO: make it so cycles are grouped together, not in alphabetical order

    this.googleService.getEventSources(this.currentCalendarId, this.eventId).then(res => {

      const items = res.items;
      for (let i = 0; i < items.length; i++) {

        const event = items[i];
        this.googleService.addSheetEvents({
          spreadsheetId: this.sheetId,
          range: `A1:C1`,
          valueInputOption: 'USER_ENTERED',
          values: [
            [
              'Event',
              'Start Time',
              'End Time'
            ]
          ]

        });
        this.googleService.addSheetEvents({
          spreadsheetId: this.sheetId,
          range: `A${i + 2}:C${i + 2}`,
          valueInputOption: 'USER_ENTERED',
          values: [
            [
              event.summary,
              event.start.dateTime || event.start.date,
              event.end.dateTime || event.end.date
            ]
          ]

        });
      }
    });
  }

}
