import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  signIn,
  signUp,
  signOut,
  handleCallback,
  getOidcUser,
  buildAppUser,
  type AppUser,
} from '../lib/oidcService';

// ── localStorage key for app user ──────────────────────────────────────
const APP_USER_KEY = 'ebs_app_user';

// ── Types ──────────────────────────────────────────────────────────────────

interface AuthState {
  /** Resolved app user from OIDC profile */
  user: AppUser | null;
  /** OIDC access_token */
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  loginWithIDP: () => Promise<void>;
  signUpWithIDP: () => Promise<void>;
  /** Completes OIDC callback: code exchange → sets state from OIDC profile */
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
          // Restore app user from localStorage
          const savedUser = localStorage.getItem(APP_USER_KEY);
          const appUser: AppUser | null = savedUser ? JSON.parse(savedUser) : null;

          if (appUser) {
            setUser(appUser);
          }
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

  const signUpWithIDP = useCallback(async () => {
    setError(null);
    try {
      await signUp(); // browser redirects to IDP registration — this line rarely returns
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    }
  }, []);

  const handleOidcCallback = useCallback(async (): Promise<AppUser | null> => {
    setError(null);
    try {
      // 1️⃣ Exchange authorization code → IDP tokens
      const oidcUser = await handleCallback();
      console.log('[Auth] OIDC user:', oidcUser);
      setAccessToken(oidcUser.access_token);

      // 2️⃣ Build AppUser from OIDC profile (Zitadel profile data)
      const appUser = buildAppUser(oidcUser.profile);
      console.log('[Auth] App user:', appUser);
      setUser(appUser);

      // Persist app user to localStorage for session restore on next visit
      localStorage.setItem(APP_USER_KEY, JSON.stringify(appUser));

      return appUser;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication callback failed';
      console.error('[Auth] Callback error:', msg, err);

      const userFacingMsg = msg || 'Something went wrong during login. Please try again.';

      setError(userFacingMsg);
      console.log('[Auth] User-facing error:', userFacingMsg);

      // Clear local data
      localStorage.removeItem(APP_USER_KEY);
      setUser(null);
      setAccessToken(null);
      
      // Re-throw the error so OAuthCallback can catch it
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    // Clear app user from localStorage
    localStorage.removeItem(APP_USER_KEY);
    setUser(null);
    setAccessToken(null);
    setError(null);
    await signOut(); // browser redirects to IDP logout
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{
      user, accessToken, isLoading, error,
      loginWithIDP, signUpWithIDP, handleOidcCallback, logout, clearError,
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