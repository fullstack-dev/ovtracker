import {Injectable} from '@angular/core';

declare const gapi: any;

@Injectable()
export class GoogleService {

  constructor() {
  }

  initGapi() {
    this.handleClientLoad();
  }

  // Initializes the API client library and sets up sign-in state listeners.
  initClient() {
    const apiKey = 'AIzaSyCbnn_ZCmasEl9GFRdB6tAbZKQOMaSJ1sY';
    const clientId = '937409070346-c49f2d0vouu3u0f5b80lobdnge3d30ld.apps.googleusercontent.com';
    const discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
      'https://sheets.googleapis.com/$discovery/rest?version=v4'];
    const scope = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/spreadsheets';
    return gapi.client.init({
      apiKey,
      clientId,
      discoveryDocs,
      scope
    }).then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  // On load, called to load the auth2 library and API client library.
  handleClientLoad() {
    return gapi.load('client:auth2', this.initClient.bind(this));
  }

  // Called when the signed in status changes, to update the UI appropriately. After a sign-in, the API is called.
  updateSigninStatus(isSignedIn) {
    // const authorizeButton = document.getElementById('authorize-button');
    // const signoutButton = document.getElementById('signout-button');
    // if (isSignedIn) {
    //   authorizeButton.style.display = 'none';
    //   signoutButton.style.display = 'block';
    // } else {
    //   authorizeButton.style.display = 'block';
    //   signoutButton.style.display = 'none';
    // }
  }

  // Sign in the user upon button click.
  handleAuthClick() {
    return gapi.auth2.getAuthInstance().signIn();
  }

  // Sign out the user
  // handleSignoutClick(event) {
  // return gapi.auth2.getAuthInstance().signOut();
  // }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre(message) {
    const pre = document.getElementById('content');
    const textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  createCalendar(callback) {
    console.log('Created OvTracker calendar');
    const OvTracker = {
      summary: 'OvTracker'
    };
    const req = gapi.client.calendar.calendars.insert(OvTracker);
    req.execute((resp) => {
      if (resp.error) {
        console.log(Error);
      }
      console.log(resp.id);
      callback(resp.id);
    });
  }

  // Create a calendar event and grab the event's ID
  async createEvent(currentCalendarId, eventList) {
    const eventIds = [];

    await eventList.map(event => gapi.client.calendar.events.insert({
      'calendarId': currentCalendarId,
      'resource': event
    }).then(res => eventIds.push(JSON.parse(res.body))));
    return eventIds;
  }

  async getEventSources(currentCalendarId, eventID) {
    return gapi.client.calendar.events.list({
      'calendarId': currentCalendarId,
      'singleEvents': true
    }).then(res => JSON.parse(res.body));

  }

  listUpcomingEvents(currentCalendarId) {
    gapi.client.calendar.events.list({
      'calendarId': currentCalendarId,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 20,
      'orderBy': 'startTime'
    }).then(function (response) {
      const events = response.result.items;
      console.log('Upcoming events:');
      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          let when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          console.log(event.summary + ' (' + when + ')');
        }
      } else {
        console.log('No upcoming events found.');
      }
      console.log(currentCalendarId);
    });
  }

  createSheet(title, callback) {
    const spreadsheetBody = ({
      // TODO: Add desired properties to the request body.
      'properties': {
        'title': title
      }
    });
    console.log('Created OvTracker spreadsheet');
    const request = gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
    request.then(callback, function (reason) {
      console.error('error: ' + reason.result.error.message);
    });
  }

  addSheetEvents(params) {
    const req = gapi.client.sheets.spreadsheets.values.update(params);
    req.then(() => {
      console.log('Data Entered');
    }).catch((err) => {
      console.log(err);
    });
  }

}
