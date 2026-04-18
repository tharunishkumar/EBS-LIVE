import { useEffect } from 'react';

/**
 * Silent Callback Page
 * 
 * This page is used for OIDC token renewal without user interaction.
 * When the access token is about to expire, the UserManager automatically
 * redirects here to renew the token silently in the background.
 * 
 * This page intentionally does nothing visible - it just lets the OIDC
 * library handle the token refresh and close itself.
 */
export default function SilentCallback() {
  useEffect(() => {
    // The oidc-client library will automatically handle the callback
    // when this page loads. We just need to be at the correct route.
    console.log('[SilentCallback] Token renewal in progress...');
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0f0f13',
      fontFamily: 'Inter, sans-serif',
      color: '#64748b',
    }}>
      <p>Renewing session...</p>
    </div>
  );
}
