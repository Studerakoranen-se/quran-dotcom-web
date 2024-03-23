export default function getCookie(name: string) {
  const cookies = document.cookie.split('; ') || []
  const cookie = cookies.find((c) => c.startsWith(name))

  return decodeURIComponent(cookie?.split('=')?.[1] || '')
}
