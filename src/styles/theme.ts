export const typography = {
  // Font families
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  // Font sizes
  fontSize: {
    // Headings
    h1: {
      desktop: '3.5rem',
      tablet: '3rem',
      mobile: '2.5rem',
    },
    h2: {
      desktop: '2.5rem',
      tablet: '2rem',
      mobile: '1.75rem',
    },
    h3: {
      desktop: '2rem',
      tablet: '1.75rem',
      mobile: '1.5rem',
    },
    h4: {
      desktop: '1.5rem',
      tablet: '1.25rem',
      mobile: '1.25rem',
    },

    // Body text
    body: {
      large: '1.2rem',
      regular: '1rem',
      small: '0.875rem',
    },

    // Special elements
    hero: {
      title: '4rem',
      subtitle: '1.4rem',
    },
    form: {
      label: '0.95rem',
      input: '1rem',
      button: '1.1rem',
    },
    tag: {
      regular: '1rem',
      small: '0.875rem',
    },
  },

  // Font weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
};

export const colors = {
  primary: {
    gradient: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
    start: '#2193b0',
    end: '#6dd5ed',
    hover: 'linear-gradient(135deg, #1c7a94, #5bc1d9)',
  },

  accent: {
    blue: '#0077ff',
    blueDeep: '#0047ff',
    blueMid: '#0066ee',
    blueDark: '#0055cc',
    blueLight: 'rgba(0, 119, 255, 0.08)',
    blueFaint: 'rgba(0, 119, 255, 0.04)',
    blueBorder: 'rgba(0, 119, 255, 0.2)',
    blueGlow: 'rgba(0, 119, 255, 0.5)',
    blueShadow: 'rgba(0, 119, 255, 0.3)',
    blueShadowHover: 'rgba(0, 119, 255, 0.4)',
    blueShadowLight: 'rgba(0, 119, 255, 0.2)',
    blueBorderLight: 'rgba(0, 119, 255, 0.15)',
    blueBorderMid: 'rgba(0, 119, 255, 0.25)',
    blueHoverBg: 'rgba(0, 119, 255, 0.1)',
    gradient: 'linear-gradient(135deg, #0077ff 0%, #0047ff 100%)',
    highlightBg: 'rgba(59, 130, 246, 0.25)',
    purple: '#7c3aed',
    cyan: '#00c6ff',
    teal: '#0e60cc',
    tealLight: '#E6F3F2',
    indigo: '#6366f1',
    violet: '#8b5cf6',
    amber: '#f59e0b',
  },

  badge: {
    bg: 'rgba(0, 148, 217, 0.08)',
    border: 'rgba(0, 148, 217, 0.15)',
    text: '#0077b6',
    accentColor: '#0094d9',
  },

  text: {
    primary: '#142c4c',
    secondary: '#3d4756',
    light: '#5f6b7a',
    white: '#f7fafc',
    heading: '#0f172a',
    muted: '#64748b',
    mutedLight: '#94a3b8',
    mutedSoft: '#9ca3af',
    dark: '#1E2B3A',
    darkAlt: '#1a1a2e',
    gray: '#6b7280',
    grayDark: '#4b5563',
    grayMid: '#334155',
  },

  background: {
    primary: '#f5f7fa',
    secondary: '#eef2f7',
    white: '#ffffff',
    hero: 'linear-gradient(160deg, #f7f9fc 0%, #edf1f7 40%, #e4ecf7 100%)',
    section: 'linear-gradient(165deg, #f8fafc 0%, #eef2f7 35%, #e8edf5 65%, #f0f4f8 100%)',
    footer: '#f8fafc',
    lightGray: '#F8FAFC',
    glass: 'rgba(255, 255, 255, 0.9)',
    glassLight: 'rgba(255, 255, 255, 0.15)',
    hoverLight: '#f0f7ff',
    card: '#E8F0FE',
  },

  border: {
    light: 'rgba(255, 255, 255, 0.3)',
    dark: 'rgba(0, 0, 0, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.6)',
    separator: '#f1f5f9',
    separatorAlt: '#e2e8f0',
    accentFaint: 'rgba(0, 119, 255, 0.06)',
    accentBorder: 'rgba(0, 119, 255, 0.08)',
    cardBorder: 'rgba(44, 156, 145, 0.1)',
    subtleBorder: 'rgba(0, 0, 0, 0.06)',
    subtleBorderDark: 'rgba(0, 0, 0, 0.08)',
    subtleBorderMid: 'rgba(0, 0, 0, 0.1)',
  },

  awards: {
    cardFeaturedBorder: 'rgba(0, 148, 217, 0.2)',
    cardFeaturedBg: 'linear-gradient(135deg, #ffffff, #f0f7ff)',
    cardFeaturedShadow: 'rgba(0, 148, 217, 0.1)',
    cardHoverBorder: 'rgba(0, 148, 217, 0.25)',
    cardHoverShadow: 'rgba(0, 148, 217, 0.1)',
    overlayBg: 'linear-gradient(135deg, rgba(0, 148, 217, 0.04), transparent, rgba(99, 102, 241, 0.02))',
    progressGradient: 'linear-gradient(90deg, #0094d9, #6366f1)',
    shimmerGradient: 'linear-gradient(135deg, #0094d9, #6366f1, #8b5cf6)',
    sectionRadialA: 'radial-gradient(ellipse 800px 600px at 20% 20%, rgba(0, 148, 217, 0.05), transparent)',
    sectionRadialB: 'radial-gradient(ellipse 600px 500px at 80% 80%, rgba(99, 102, 241, 0.04), transparent)',
    dotActive: 'linear-gradient(90deg, #0094d9, #6366f1)',
    dotInactive: 'rgba(0, 0, 0, 0.1)',
    dotInactiveHover: 'rgba(0, 0, 0, 0.2)',
    progressDotGlow: 'rgba(0, 148, 217, 0.5)',
    navHoverBg: '#f0f7ff',
    navHoverBorder: 'rgba(0, 148, 217, 0.3)',
    navHoverColor: '#0094d9',
    navHoverShadow: 'rgba(0, 148, 217, 0.1)',
  },

  lightbox: {
    overlay: 'rgba(0, 0, 0, 0.75)',
    closeBtn: '#1a1a2e',
    closeBtnHover: '#0094d9',
  },

  stat: {
    gradient: 'linear-gradient(135deg, #0055cc, #0077ff)',
    gradientAlt: 'linear-gradient(135deg, #0077ff, #0055cc)',
    hoverGradient: 'linear-gradient(135deg, #0868f8e5, #005fecff)',
  },

  bubble: {
    insurance: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
    loan: 'linear-gradient(135deg, #22c55e, #15803d)',
  },

  shadow: {
    card: 'rgba(0, 0, 0, 0.2)',
    bubbleOuter: 'rgba(0, 0, 0, 0.06)',
    bubbleInner: 'rgba(0, 0, 0, 0.04)',
    cardSoft: 'rgba(0, 0, 0, 0.03)',
    cardHover: 'rgba(11, 59, 58, 0.1)',
    cardImage: 'rgba(0, 0, 0, 0.08)',
    lightboxContent: 'rgba(0, 0, 0, 0.25)',
    lightboxNav: 'rgba(0, 0, 0, 0.12)',
    lightboxCloseBtn: 'rgba(0, 0, 0, 0.3)',
    statCard: 'rgba(0, 0, 0, 0.04)',
    statCardHover: 'rgba(0, 0, 0, 0.08)',
    socialHover: 'rgba(0, 119, 255, 0.25)',
    ctaShadow: 'rgba(0, 119, 255, 0.2)',
  },

  overlay: {
    cardDark: 'rgba(11, 59, 58, 0.2)',
  },
};

export const breakpoints = {
  mobile: '480px',
  tablet: '1024px',
  desktop: '1440px',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
};

export const effects = {
  glassmorphism: {
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  shadow: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.1)',
    large: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
};

const theme = {
  typography,
  colors,
  breakpoints,
  spacing,
  effects,
};

export default theme;
