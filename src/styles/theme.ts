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
  text: {
    primary: '#1a365d',
    secondary: '#4a5568',
    light: '#718096',
    white: '#ffffff',
  },
  background: {
    primary: '#f5f7fa',
    secondary: '#eef2f7',
    white: '#ffffff',
  },
  border: {
    light: 'rgba(255, 255, 255, 0.3)',
    dark: 'rgba(0, 0, 0, 0.1)',
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
