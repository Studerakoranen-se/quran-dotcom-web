const ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

export default function gtmPageView(url: string) {
  if ((window as any).gtag) {
    ;(window as any).gtag('config', ANALYTICS_ID, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      page_path: url,
    })
  }
}
