# OAuth Login — React Vite Implementation Plan

## Overview

Implement a complete **OIDC Authorization Code + PKCE** login flow in a React Vite app.

- **IDP (Identity Provider):** `https://login.ticktix.com`
- **Client ID:** `ebs-site`
- **Backend API:** `https://everydaybankingsolutions.facilitix.app`
- **Redirect URI:** `http://localhost:8081/oauth/callback`
- **Post-logout URI:** `http://localhost:8081/`
- **Scopes:** `openid profile email offline_access`
- **Library:** `oidc-client-ts`
- **Router:** `react-router-dom`

---

## What to Build

| Feature | Details |
|---|---|
| Login page | Button → redirects to IDP |
| OAuth callback page | Exchanges code for tokens, redirects to dashboard |
| Dashboard page | Shows user info, logout button |
| Auth context | Global auth state (user, token, loading, error) |
| Session persistence | Stored in `localStorage` via `oidc-client-ts` |
| Protected routes | Unauthenticated users redirected to `/login` |

---

## Step 1 — Install Dependencies

```bash
npm install oidc-client-ts react-router-dom
```

---

## Step 2 — Environment Variables

Create `.env` in the project root:

```env
VITE_IDP_ISSUER=https://login.ticktix.com
VITE_AUTH_CLIENT_ID=ebs-site
VITE_AUTH_SECRET=ebs-site-secret
VITE_APP_URL=http://localhost:8081
VITE_API_BASE=https://everydaybankingsolutions.facilitix.app
```

> **Note:** All Vite env vars must start with `VITE_` and are accessed via `import.meta.env.VITE_*`

---

## Step 3 — Project File Structure

Create the following files (relative to `src/`):

```
src/
├── config/
│   └── auth.ts               ← OIDC config
├── lib/
│   └── oidcService.ts        ← UserManager singleton + service functions
├── context/
│   └── AuthContext.tsx       ← React context for auth state
├── pages/
│   ├── Login.tsx             ← Login page
│   ├── OAuthCallback.tsx     ← Callback page (IDP redirects here)
│   └── Dashboard.tsx         ← Protected dashboard
├── components/
│   └── ProtectedRoute.tsx    ← Route guard wrapper
└── main.tsx                  ← App entry (add router + AuthProvider)
```

---

## Step 4 — `src/config/auth.ts`

```ts
import { UserManagerSettings, WebStorageStateStore } from 'oidc-client-ts';

const IDP_ISSUER     = import.meta.env.VITE_IDP_ISSUER     ?? 'https://login.ticktix.com';
const CLIENT_ID      = import.meta.env.VITE_AUTH_CLIENT_ID  ?? 'ebs-site';
const CLIENT_SECRET  = import.meta.env.VITE_AUTH_SECRET     ?? 'ebs-site-secret';
const APP_URL        = import.meta.env.VITE_APP_URL         ?? 'http://localhost:8081';

export const oidcConfig: UserManagerSettings = {
  authority:                IDP_ISSUER,
  client_id:                CLIENT_ID,
  client_secret:            CLIENT_SECRET,

  redirect_uri:             `${APP_URL}/oauth/callback`,
  post_logout_redirect_uri: `${APP_URL}/`,

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
```

---

## Step 5 — `src/lib/oidcService.ts`

```ts
import { UserManager, User } from 'oidc-client-ts';
import { oidcConfig } from '@/config/auth';

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

export interface AppUser {
  email: string;
  name: string;
  picture?: string;
  sub?: string;
}

/** Map OIDC User profile to a clean AppUser */
export function buildAppUser(oidcUser: User): AppUser {
  return {
    email:   oidcUser.profile.email   ?? '',
    name:    oidcUser.profile.name    ?? oidcUser.profile.email ?? 'User',
    picture: oidcUser.profile.picture as string | undefined,
    sub:     oidcUser.profile.sub,
  };
}
```

---

## Step 6 — `src/context/AuthContext.tsx`

```tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import type { User as OidcUser } from 'oidc-client-ts';
import {
  signIn,
  signOut,
  handleCallback,
  getOidcUser,
  buildAppUser,
  type AppUser,
} from '@/lib/oidcService';

// ── Types ──────────────────────────────────────────────────────────────────

interface AuthState {
  user: AppUser | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  loginWithIDP: () => Promise<void>;
  handleOidcCallback: () => Promise<AppUser | null>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// ── Context ────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]               = useState<AppUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading]     = useState(true);
  const [error, setError]             = useState<string | null>(null);

  // ── On mount: restore previous session from localStorage ────────────────
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stored = await getOidcUser();
        if (stored && !stored.expired && mounted) {
          setUser(buildAppUser(stored));
          setAccessToken(stored.access_token);
        }
      } catch (err) {
        console.error('[Auth] Session restore error:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ── Actions ──────────────────────────────────────────────────────────────

  const loginWithIDP = useCallback(async () => {
    setError(null);
    try {
      await signIn(); // browser redirects to IDP — this line rarely returns
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }, []);

  const handleOidcCallback = useCallback(async (): Promise<AppUser | null> => {
    setError(null);
    try {
      const oidcUser = await handleCallback(); // exchange code for tokens
      const appUser  = buildAppUser(oidcUser);
      setUser(appUser);
      setAccessToken(oidcUser.access_token);
      return appUser;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication callback failed';
      setError(msg);
      console.error('[Auth] Callback error:', err);
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    setAccessToken(null);
    setError(null);
    await signOut(); // browser redirects to IDP logout
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{
      user, accessToken, isLoading, error,
      loginWithIDP, handleOidcCallback, logout, clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
```

---

## Step 7 — `src/components/ProtectedRoute.tsx`

```tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f0f13' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
```

---

## Step 8 — `src/pages/Login.tsx`

```tsx
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { loginWithIDP, isLoading, error, clearError } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  const handleSignIn = async () => {
    clearError();
    setRedirecting(true);
    await loginWithIDP();
    setRedirecting(false);
  };

  const busy = isLoading || redirecting;

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* Brand */}
        <div style={styles.brand}>
          <div style={styles.brandIcon}>🏦</div>
          <div>
            <h1 style={styles.brandName}>EBS Portal</h1>
            <p style={styles.brandSub}>Everyday Banking Solutions</p>
          </div>
        </div>

        <div style={styles.divider} />

        <div>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Sign in with your account to continue.</p>
        </div>

        {error && (
          <div style={styles.errorBox} role="alert">
            ⚠️ {error}
          </div>
        )}

        <button
          id="btn-sign-in"
          onClick={handleSignIn}
          disabled={busy}
          style={{ ...styles.btn, opacity: busy ? 0.65 : 1, cursor: busy ? 'not-allowed' : 'pointer' }}
        >
          {busy ? '⏳ Redirecting…' : '🔐 Sign in with TickTix'}
        </button>

        <div style={styles.chips}>
          {['OIDC Secured', 'PKCE Protected', 'SSO Enabled'].map((label) => (
            <span key={label} style={styles.chip}>{label}</span>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes blob-float { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes card-in { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'hsl(240 6% 4%)', position: 'relative', overflow: 'hidden',
    fontFamily: "'Inter', sans-serif", padding: 24,
  },
  blob1: {
    position: 'absolute', width: 600, height: 600, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
    top: -150, left: -150, pointerEvents: 'none', animation: 'blob-float 8s ease-in-out infinite',
  },
  blob2: {
    position: 'absolute', width: 500, height: 500, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
    bottom: -100, right: -100, pointerEvents: 'none', animation: 'blob-float 10s ease-in-out infinite 2s',
  },
  card: {
    position: 'relative', zIndex: 10, width: '100%', maxWidth: 420,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 24, padding: '42px 38px', display: 'flex', flexDirection: 'column', gap: 22,
    backdropFilter: 'blur(24px)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
    animation: 'card-in 0.5s cubic-bezier(0.16,1,0.3,1) both',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 14 },
  brandIcon: { fontSize: 40, lineHeight: 1 },
  brandName: { margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9' },
  brandSub: { margin: '3px 0 0', fontSize: '0.75rem', color: '#64748b' },
  divider: { height: 1, background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)' },
  title: {
    margin: '0 0 6px', fontSize: '1.7rem', fontWeight: 800,
    background: 'linear-gradient(135deg, #e0e7ff 30%, #818cf8)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  },
  subtitle: { margin: 0, fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 },
  errorBox: {
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: 12, padding: '12px 16px', fontSize: '0.85rem', color: '#fca5a5',
  },
  btn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    width: '100%', padding: '15px 20px', border: 'none', borderRadius: 14,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#fff', fontSize: '0.96rem', fontWeight: 700,
    boxShadow: '0 4px 24px rgba(99,102,241,0.4)', transition: 'all 0.2s ease',
  },
  chips: { display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  chip: {
    padding: '4px 12px', borderRadius: 999,
    background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)',
    fontSize: '0.72rem', color: '#818cf8',
  },
};
```

---

## Step 9 — `src/pages/OAuthCallback.tsx`

```tsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type Status = 'loading' | 'success' | 'error';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { handleOidcCallback } = useAuth();
  const [status, setStatus]   = useState<Status>('loading');
  const [message, setMessage] = useState('Completing sign-in…');
  const ran = useRef(false); // prevent double-invoke in React StrictMode

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      try {
        setMessage('Exchanging authorization code…');
        const appUser = await handleOidcCallback();

        if (appUser) {
          setStatus('success');
          setMessage(`Welcome, ${appUser.name}!`);
          await new Promise((r) => setTimeout(r, 1200));
          navigate('/dashboard', { replace: true });
        } else {
          throw new Error('Sign-in did not return a user.');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Authentication failed';
        console.error('[Callback]', err);
        setStatus('error');
        setMessage(msg);
        await new Promise((r) => setTimeout(r, 2500));
        navigate('/login', { replace: true });
      }
    })();
  }, [handleOidcCallback, navigate]);

  const icon =
    status === 'loading' ? null :
    status === 'success' ? '✅' : '❌';

  const title =
    status === 'loading' ? 'Signing you in…' :
    status === 'success' ? 'Signed in!' : 'Sign-in failed';

  return (
    <div style={styles.root}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>
          {status === 'loading'
            ? <div style={styles.spinner} />
            : <span style={{ fontSize: 48 }}>{icon}</span>
          }
        </div>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.message}>{message}</p>
        {status === 'loading' && (
          <div style={styles.progressTrack}>
            <div style={styles.progressBar} />
          </div>
        )}
        <p style={styles.hint}>
          {status === 'loading' && 'Please wait, do not close this tab'}
          {status === 'success' && 'Redirecting to dashboard…'}
          {status === 'error' && 'Redirecting to login…'}
        </p>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#0f0f13', fontFamily: "'Inter', sans-serif",
  },
  card: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 24, padding: '48px 40px', width: '100%', maxWidth: 380,
    backdropFilter: 'blur(20px)', boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
  },
  iconWrap: { width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  spinner: {
    width: 52, height: 52,
    border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1',
    borderRadius: '50%', animation: 'spin 0.8s linear infinite',
  },
  title: { margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#f1f5f9', textAlign: 'center' },
  message: { margin: 0, fontSize: '0.9rem', color: '#94a3b8', textAlign: 'center', lineHeight: 1.5, maxWidth: 260 },
  progressTrack: { width: '100%', height: 3, background: 'rgba(99,102,241,0.15)', borderRadius: 999, overflow: 'hidden' },
  progressBar: {
    height: '100%', borderRadius: 999,
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1)',
    backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite',
  },
  hint: { margin: 0, fontSize: '0.75rem', color: 'rgba(148,163,184,0.5)', textAlign: 'center' },
};
```

---

## Step 10 — `src/pages/Dashboard.tsx`

```tsx
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, accessToken, logout } = useAuth();

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerBrand}>
            <span style={{ fontSize: 28 }}>🏦</span>
            <span style={styles.headerTitle}>EBS Portal</span>
          </div>
          <button id="btn-logout" onClick={logout} style={styles.logoutBtn}>
            Sign Out →
          </button>
        </header>

        {/* Welcome banner */}
        <div style={styles.welcomeCard}>
          <div style={styles.avatar}>
            {user?.picture
              ? <img src={user.picture} alt="avatar" style={styles.avatarImg} />
              : <span style={{ fontSize: 36 }}>👤</span>
            }
          </div>
          <div>
            <p style={styles.welcomeGreet}>Welcome back,</p>
            <h1 style={styles.welcomeName}>{user?.name}</h1>
            <p style={styles.welcomeEmail}>{user?.email}</p>
          </div>
        </div>

        {/* Info grid */}
        <div style={styles.grid}>
          <InfoCard label="Email" value={user?.email ?? '—'} icon="📧" />
          <InfoCard label="Display Name" value={user?.name ?? '—'} icon="👤" />
          <InfoCard label="Subject ID" value={user?.sub ?? '—'} icon="🔑" mono />
          <InfoCard
            label="Access Token"
            value={accessToken ? `${accessToken.slice(0, 40)}…` : '—'}
            icon="🎟️"
            mono
          />
        </div>

        <p style={styles.footer}>
          Session persisted via localStorage • OIDC Authorization Code + PKCE
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes blob-float { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes fade-up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

function InfoCard({ label, value, icon, mono }: {
  label: string; value: string; icon: string; mono?: boolean;
}) {
  return (
    <div style={cardStyles.root}>
      <div style={cardStyles.header}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={cardStyles.label}>{label}</span>
      </div>
      <p style={{ ...cardStyles.value, fontFamily: mono ? 'monospace' : 'inherit' }}>{value}</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh', background: 'hsl(240 6% 4%)',
    fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden',
  },
  blob1: {
    position: 'fixed', width: 700, height: 700, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
    top: -200, left: -200, pointerEvents: 'none', animation: 'blob-float 10s ease-in-out infinite',
  },
  blob2: {
    position: 'fixed', width: 600, height: 600, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
    bottom: -150, right: -150, pointerEvents: 'none', animation: 'blob-float 12s ease-in-out infinite 3s',
  },
  container: {
    position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto',
    padding: '0 24px 60px', display: 'flex', flexDirection: 'column', gap: 28,
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  headerBrand: { display: 'flex', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9' },
  logoutBtn: {
    padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.3)',
    background: 'rgba(239,68,68,0.08)', color: '#fca5a5', fontSize: '0.875rem',
    fontWeight: 600, cursor: 'pointer',
  },
  welcomeCard: {
    display: 'flex', alignItems: 'center', gap: 20,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.15)',
    borderRadius: 20, padding: '28px 32px', backdropFilter: 'blur(16px)',
    animation: 'fade-up 0.5s ease both',
  },
  avatar: {
    width: 72, height: 72, borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))',
    border: '2px solid rgba(99,102,241,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  avatarImg: { width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' },
  welcomeGreet: { margin: 0, fontSize: '0.85rem', color: '#64748b' },
  welcomeName: {
    margin: '4px 0 6px', fontSize: '1.8rem', fontWeight: 800,
    background: 'linear-gradient(135deg, #e0e7ff 30%, #818cf8)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  },
  welcomeEmail: { margin: 0, fontSize: '0.875rem', color: '#818cf8' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 16, animation: 'fade-up 0.5s ease 0.1s both',
  },
  footer: { fontSize: '0.75rem', color: 'rgba(100,116,139,0.45)', textAlign: 'center', margin: 0 },
};

const cardStyles: Record<string, React.CSSProperties> = {
  root: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 10,
  },
  header: { display: 'flex', alignItems: 'center', gap: 8 },
  label: { fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' },
  value: { margin: 0, fontSize: '0.875rem', color: '#e2e8f0', wordBreak: 'break-all', lineHeight: 1.5 },
};
```

---

## Step 11 — `src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import OAuthCallback from '@/pages/OAuthCallback';
import Dashboard from '@/pages/Dashboard';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login"           element={<Login />} />
          <Route path="/oauth/callback"  element={<OAuthCallback />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
```

---

## Step 12 — `src/index.css`

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: hsl(240 6% 4%); color: #f1f5f9; }
```

---

## Step 13 — `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: { port: 8081 },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

Also update `tsconfig.json` or `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## How the Full Flow Works

```
1. User visits /dashboard → ProtectedRoute → not logged in → redirect to /login
2. User clicks "Sign in" → loginWithIDP() → signinRedirect()
3. Browser goes to: https://login.ticktix.com/auth?client_id=ebs-site&redirect_uri=...&code_challenge=...
4. User logs in on IDP
5. IDP redirects to: http://localhost:8081/oauth/callback?code=ABC&state=XYZ
6. OAuthCallback page runs handleOidcCallback()
7. oidc-client-ts exchanges code + PKCE verifier → gets access_token + id_token
8. Tokens stored in localStorage automatically by oidc-client-ts
9. AuthContext stores user in React state
10. User redirected to /dashboard — sees their name, email, avatar, token
11. On next visit: AuthContext restores session from localStorage (no re-login)
12. Logout: clears state + redirects to IDP logout → back to app root
```

---

## Checklist for the AI Agent

- [ ] Run `npm install oidc-client-ts react-router-dom`
- [ ] Create `.env` with all `VITE_*` variables
- [ ] Create `src/config/auth.ts`
- [ ] Create `src/lib/oidcService.ts`
- [ ] Create `src/context/AuthContext.tsx`
- [ ] Create `src/components/ProtectedRoute.tsx`
- [ ] Create `src/pages/Login.tsx`
- [ ] Create `src/pages/OAuthCallback.tsx`
- [ ] Create `src/pages/Dashboard.tsx`
- [ ] Update `src/main.tsx` with router + AuthProvider + routes
- [ ] Update `src/index.css` with CSS reset
- [ ] Update `vite.config.ts` with port 8081 + `@/` alias
- [ ] Update `tsconfig.json` with path aliases
- [ ] Run `npm run dev` and verify the full login flow
