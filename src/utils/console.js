// Production-safe console utilities
const isDevelopment = import.meta.env.VITE_ENV === 'development' || import.meta.env.DEV;

export const console = {
  log: isDevelopment ? window.console.log.bind(window.console) : () => {},
  error: window.console.error.bind(window.console), // Always show errors
  warn: isDevelopment ? window.console.warn.bind(window.console) : () => {},
  debug: isDevelopment ? window.console.debug.bind(window.console) : () => {},
  info: isDevelopment ? window.console.info.bind(window.console) : () => {}
};

// Utility function to check if we're in development
export const isDev = () => isDevelopment;

// Utility function to check if we're in production
export const isProd = () => !isDevelopment;
