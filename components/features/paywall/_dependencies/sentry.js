import * as Sentry from '@sentry/browser';
import { ENVIRONMENT } from 'fusion:environment'
import { hasEnableCookie } from './cookie';


const ENABLED = false;
const isProd = ENVIRONMENT === 'elcomercio'; 

Sentry.init({
  dsn: 'https://81cfb3b862494fdaa0be4359e1423bdb@sentry.ec.pe/82',
  debug: !isProd,
  release: process.env.REACT_APP_VERSION,
  enabled: ENABLED || hasEnableCookie,
  environment: isProd ? 'production' : 'sandbox',
  integrations: [
    // new Sentry.Integrations.Breadcrumbs({
    //   console: !(process.env.REACT_APP_ENV === 'localhost'),
    // }),
    // new Sentry.Integrations.Breadcrumbs({
    //   console: false,
    // }),
  ],
  blacklistUrls: [],
  whitelistUrls: [],
  beforeSend(event, hint) {
    // Check if it is an exception, and if so, show the report dialog
    const userProfile = window.localStorage.getItem('ArcId.USER_PROFILE');

    switch (userProfile) {
      case null:
      case 'null':
        return event;
      default: {
        const { uuid, displayName, firstName } = JSON.parse(userProfile);
        
        event.user = {
          id: uuid,
          name: displayName || firstName,
        };
        break;
      }
    }
    return event;
  },
});

Sentry.configureScope(scope => {
  scope.setTag('brand', 'GESTION');
});

// Sentry.getCurrentHub()
//   .getClient()
//   .getOptions().enabled = false;

export default Sentry;
