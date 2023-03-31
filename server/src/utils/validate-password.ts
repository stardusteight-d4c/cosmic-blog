export default function validatePassword(password: string) {
  const passwordRegex = /^(?=.*\d).{8,}$/
  if (!passwordRegex.test(password)) {
    throw new Error('Password must be at least 8 characters and a number.')
  }
}
