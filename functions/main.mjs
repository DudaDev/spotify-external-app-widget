import functions from 'firebase-functions';
import app from './server';

export default {
  api: functions.https.onRequest(app)
};
