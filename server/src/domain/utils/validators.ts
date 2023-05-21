namespace Validators {
  export function validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('A valid email address was not entered.')
    }
  }

  export function validateUsername(username: string): void {
    const regex = /^(?=.*[a-z])[a-z0-9]{3,}$/
    const isValidUsername = regex.test(username)
    if (!isValidUsername) {
      throw new Error(
        'The username must contain only lowercase letters, at least 3 characters and must not contain special characters.'
      )
    }
  }

  export function validatePassword(password: string): void {
    const passwordRegex = /^(?=.*\d).{8,}$/
    if (!passwordRegex.test(password)) {
      throw new Error('Password must be at least 8 characters and a number.')
    }
  }

  export function compareCurrentPassword(data: {
    inputPassword: string
    currentPassword: string
  }): void {
    if (data.inputPassword !== data.currentPassword) {
      throw new Error('Incorrect current password.')
    }
  }

  export function checkPrimitiveType(data: { validating: any; type: string }) {
    if (typeof data.validating !== data.type) {
      throw new Error(`The validating is not of type ${data.type}.`)
    }
  }
}

export default Validators
