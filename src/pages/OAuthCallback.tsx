import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../lib/oidcService';

type Status = 'loading' | 'success' | 'error' | 'logging-out';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { handleOidcCallback } = useAuth();
  const [status, setStatus]   = useState<Status>('loading');
  const [message, setMessage] = useState('Completing sign-in…');
  const [secondaryMsg, setSecondaryMsg] = useState('');
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
        console.error('[Callback]', err);
        
        setStatus('error');
        setMessage('Authentication Failed');
        setSecondaryMsg('Unable to sign you in. Please try again or contact support.');
        // Auto-logout after 3.5 seconds so user can read the message
        await new Promise((r) => setTimeout(r, 3500));
        setStatus('logging-out');
        await signOut();
      }
    })();
  }, [handleOidcCallback, navigate]);

  const icon =
    status === 'loading' ? null :
    status === 'success' ? '✅' :
    status === 'logging-out' ? null : '⚠️';

  const title =
    status === 'loading' ? 'Signing you in…' :
    status === 'success' ? 'Signed in!' :
    status === 'logging-out' ? 'Logging you out…' : 'Authentication Failed';

  return (
    <div style={styles.root}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>
          {(status === 'loading' || status === 'logging-out')
            ? <div style={styles.spinner} />
            : <span style={{ fontSize: 48 }}>{icon}</span>
          }
        </div>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.message}>{message}</p>
        {secondaryMsg && status !== 'logging-out' && <p style={styles.secondaryMsg}>{secondaryMsg}</p>}
        
        {(status === 'loading' || status === 'logging-out') && (
          <div style={styles.progressTrack}>
            <div style={styles.progressBar} />
          </div>
        )}
        
        <p style={styles.hint}>
          {status === 'loading' && 'Please wait, do not close this tab'}
          {status === 'success' && 'Redirecting to dashboard…'}
          {status === 'error' && 'Your session will end shortly'}
          {status === 'logging-out' && 'Terminating session…'}
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
  secondaryMsg: { margin: '6px 0 0 0', fontSize: '0.8rem', color: '#64748b', textAlign: 'center', lineHeight: 1.5, maxWidth: 280 },
  progressTrack: { width: '100%', height: 3, background: 'rgba(99,102,241,0.15)', borderRadius: 999, overflow: 'hidden' },
  progressBar: {
    height: '100%', borderRadius: 999,
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1)',
    backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite',
  },
  hint: { margin: 0, fontSize: '0.75rem', color: 'rgba(148,163,184,0.5)', textAlign: 'center' },
  actionContainer: { display: 'flex', flexDirection: 'column', gap: 12, width: '100%', marginTop: 8 },
  contactText: { margin: 0, fontSize: '0.85rem', color: '#cbd5e1', textAlign: 'center' },
  contactButton: {
    display: 'block', padding: '10px 16px', background: '#3b82f6', color: '#fff',
    textDecoration: 'none', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600,
    textAlign: 'center', transition: 'background 0.2s',
    border: 'none', cursor: 'pointer',
  },
  backButton: {
    padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: '#e2e8f0',
    border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, fontSize: '0.9rem',
    fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
  },
};