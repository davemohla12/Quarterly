import posthog from 'posthog-js'
import { browser } from '$app/environment'

if (browser) {
  posthog.init(
    'phc_18OO8gtPW5cFVMd6H85jgmEaZpE9lEMGOE101IKO1BT',
    {
      api_host: 'https://us.i.posthog.com',
      autocapture: false,
      capture_pageview: false, 
      capture_pageleave: false,
      defaults: '2025-05-24',
      person_profiles: 'identified_only',
      mask_all_text: false,
      opt_out_capturing_by_default: false,
      disable_session_recording: false
    }
  )
}

const safePostHog = {
  capture: (event, properties) => {
    if (browser) {
      posthog.capture(event, properties)
    }
  },
  identify: (distinctId, properties) => {
    if (browser) {
      posthog.identify(distinctId, properties)
    }
  },
  reset: () => {
    if (browser) {
      posthog.reset()
    }
  }
}

export { safePostHog }
