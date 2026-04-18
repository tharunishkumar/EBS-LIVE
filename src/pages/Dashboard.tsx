import { useAuth } from '../contexts/AuthContext';

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
         
        </header>

        {/* Welcome banner */}
        <div style={styles.welcomeCard}>
          <div style={styles.avatar}>
            {user?.picture ? (
              <img src={user.picture} alt={user.name} style={styles.avatarImg} />
            ) : (
              <span style={{ fontSize: 36 }}>👤</span>
            )}
          </div>
          <div>
            <p style={styles.welcomeGreet}>Welcome back,</p>
            <h1 style={styles.welcomeName}>{user?.name || 'User'}</h1>
            <p style={styles.welcomeEmail}>{user?.email}</p>
          </div>
        </div>

        {/* Info grid */}
        <div style={styles.grid}>
          <InfoCard label="Email" value={user?.email ?? '—'} icon="📧" />
          <InfoCard label="Display Name" value={user?.name ?? '—'} icon="👤" />
          <InfoCard label="Subject ID" value={user?.sub ?? '—'} icon="🔑" mono />
          {user?.phone_number && <InfoCard label="Phone" value={user.phone_number} icon="📱" />}
          <InfoCard
            label="Access Token"
            value={accessToken ? `${accessToken.slice(0, 40)}…` : '—'}
            icon="🎟️"
            mono
          />
        </div>

        <p style={styles.footer}>
          Session persisted via localStorage • Zitadel OIDC Authorization Code + PKCE
        </p>
      </div>

       <button id="btn-logout" onClick={logout} style={styles.logoutBtn}>
            Sign Out →
          </button>

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