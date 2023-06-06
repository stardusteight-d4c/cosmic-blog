export function setCookie(sessionToken: string) {
  const now = new Date()
  const expireTime = now.getTime() + 7 * 24 * 60 * 60 * 1000 // 7 days
  now.setTime(expireTime)
  document.cookie = `sessionCookie=${sessionToken}; expires=${now.toUTCString()}; path=/; SameSite=Strict; Secure`
}
