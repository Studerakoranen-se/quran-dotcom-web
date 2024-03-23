export default function gtmEvent(event: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log('GTM', event)

  if (typeof window !== 'undefined' && event) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(null)
    window.dataLayer.push(event)
  }
}
