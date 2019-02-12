export const PORT = Number(process.env.NOTIPUSH_PORT || '8081');
export const HOST = process.env.NOTIPUSH_HOST || '0.0.0.0';
export const VAPID_EMAIL = process.env.NOTIPUSH_VAPID_EMAIL || '';
export const BACKEND_PASS = process.env.NOTIPUSH_BACKEND_PASS || 'iknowthisiswrong';
export const SENTRY_DSN = process.env.NOTIPUSH_SENTRY_DSN || '';
