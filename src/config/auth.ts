import { UserManagerSettings, WebStorageStateStore } from 'oidc-client-ts';

const APP_URL = import.meta.env.VITE_APP_URL ?? 'http://localhost:8081';

export const oidcConfig: UserManagerSettings = {
  authority:                "https://prep-authrix.ticktix.com",
  client_id:                "368387654431080451",
  // client_secret:            CLIENT_SECRET,

  redirect_uri:             `http://localhost:8081/oauth/callback`,
  post_logout_redirect_uri: `http://localhost:8081`,

  response_type: 'code',
  scope:         'openid profile email offline_access',

  loadUserInfo: true,

  // Persist session in localStorage
  userStore: new WebStorageStateStore({ store: window.localStorage }),

  // Auto-refresh access token before expiry
  automaticSilentRenew:        true,
  silent_redirect_uri:         `${APP_URL}/silent-callback`,
  includeIdTokenInSilentRenew: true,
};