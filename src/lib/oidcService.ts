import { UserManager, User } from 'oidc-client-ts';
import { oidcConfig } from '../config/auth';
// Singleton UserManager
let _manager: UserManager | null = null;

function getManager(): UserManager {
  if (!_manager) {
    _manager = new UserManager(oidcConfig);

    _manager.events.addUserLoaded((user) => {
      console.log('[OIDC] User loaded:', user.profile.email);
    });
    _manager.events.addUserUnloaded(() => {
      console.log('[OIDC] Session ended');
    });
    _manager.events.addAccessTokenExpired(() => {
      console.warn('[OIDC] Token expired — attempting silent renew');
      _manager?.signinSilent().catch(() => _manager?.signinRedirect());
    });
    _manager.events.addSilentRenewError((err) => {
      console.error('[OIDC] Silent renew error:', err);
    });
  }
  return _manager;
}

/** Redirect browser to IDP login page */
export async function signIn(): Promise<void> {
  await getManager().signinRedirect();
}

/** Redirect browser to IDP registration page */
export async function signUp(): Promise<void> {
  const manager = getManager();
  // Use prompt=create parameter to show registration screen
  await manager.signinRedirect({
    extraQueryParams: {
      prompt: 'create',
    },
  });
}

/** Call on /oauth/callback — exchanges code for tokens */
export async function handleCallback(): Promise<User> {
  return getManager().signinRedirectCallback();
}

/** Get stored OIDC user (null if not logged in or expired) */
export async function getOidcUser(): Promise<User | null> {
  return getManager().getUser();
}

/** Redirect to IDP logout endpoint */
export async function signOut(): Promise<void> {
  await getManager().signoutRedirect();
}

/** Clear local session only (no IDP logout redirect) */
export async function clearLocalSession(): Promise<void> {
  await getManager().removeUser();
}

// ── Types ─────────────────────────────────────────────────────────────────

export interface AppUser {
  email: string;
  name: string;
  picture?: string;
  sub?: string;
  phone_number?: string;
  roles?: string[];
}

/** Map OIDC User profile to AppUser */
export function buildAppUser(profile: any): AppUser {
  return {
    email: profile.email || '',
    name: profile.name || profile.given_name || '',
    picture: profile.picture,
    sub: profile.sub,
    phone_number: profile.phone_number,
    roles: profile.roles || [],
  };
}