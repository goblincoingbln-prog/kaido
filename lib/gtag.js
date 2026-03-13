export const GA_TRACKING_ID = "G-JRGF4RP0HM"

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  //@ts-ignore
  if (typeof window !== 'undefined') {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  //@ts-ignore
  if (typeof window !== 'undefined') {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
  }
}