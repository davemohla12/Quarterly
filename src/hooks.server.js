import * as Sentry from '@sentry/sveltekit'
import { PUBLIC_ENVIRONMENT } from '$env/static/public'

Sentry.init({
  dsn: 'https://becf5f803df68fae670aabf0b72357e3@o4509491485016064.ingest.us.sentry.io/4509491487768576', 
  tracesSampleRate: 0.0,
  environment: PUBLIC_ENVIRONMENT
})

const handleError = ({ error, event }) => {
  Sentry.captureException(error, {
    extra: {
      path: event.url.pathname
    }
  })
  return {
    message: 'Something went wrong'
  }
}

export { handleError }