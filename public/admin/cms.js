import CMS from 'decap-cms-app';
import { Auth0AuthenticationProvider } from 'netlify-cms-backend-auth0';

// Configure Auth0 provider
const auth0Config = {
  domain: 'dev-dirotf6macq7qo05.auth0.com',
  clientID: 'pcGQeAv6V6OhqXOqnlEzBgzyY1ejjnhO',
  audience: 'capitol-insights-netlify',
  redirectURI: window.location.origin + '/admin/',
  responseType: 'token id_token',
  scope: 'openid profile email',
};

// Register the Auth0 authentication provider
CMS.registerAuthenticationProvider(new Auth0AuthenticationProvider(auth0Config));

// Initialize CMS with Auth0 auth provider
CMS.init();
