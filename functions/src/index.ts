require('./app/config');
import * as auth from './app/auth';
import * as webhooks from './app/webhooks';
import { api } from './app/api';

// Main Authenticated User API
export const app = api;

// Auth Functions
export const createStripeCustomer    = auth.createStripeCustomer;

// Webhook Functions
export const recurringPaymentWebhook = webhooks.recurringPaymentWebhook;


