import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
const _Sentry = Sentry;
export default _Sentry;
const IS_SENTRY_ALLOWED = (process.env.REACT_APP_BUILD_SIGNAL !== 'local' && process.env.NODE_ENV !== 'development');
//const IS_SENTRY_ALLOWED = true;

export function sentryStart() {
    if (IS_SENTRY_ALLOWED) {
        Sentry.init({
            dsn: process.env.REACT_APP_SENTRY_DSN,
            integrations: [
                new Integrations.BrowserTracing()
            ]
            // tracesSampleRate: 0.50
        });
    }
}

export const captureMessage =  IS_SENTRY_ALLOWED ? Sentry.captureMessage : () => {};
export const captureException =  IS_SENTRY_ALLOWED ? Sentry.captureException : () => {};