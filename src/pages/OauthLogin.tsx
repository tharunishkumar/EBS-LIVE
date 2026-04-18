import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function OauthLogin() {
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