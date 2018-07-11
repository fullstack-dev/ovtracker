export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    stripeCustomerId?: string;
    subscriptions?: {
      [key: string]: 'active' | 'pastDue' | 'cancelled';
    }
    calendarId?: string;
    sheetId?: string;
    // for Stripe Connect
    accountId?: string;
    refreshToken?: string;

  }