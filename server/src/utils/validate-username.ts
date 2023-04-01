export default function validateUsername(username: string): void {
  const regex = /^(?=.*[a-z])[a-z0-9]{3,}$/
  const isValidUsername = regex.test(username)
  if (!isValidUsername) {
    throw new Error(
      'The username must contain only lowercase letters, at least 3 characters and must not contain special characters.'
    )
  }
}
