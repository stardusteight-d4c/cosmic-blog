export const err = {
  invalidEmail: "a valid email address was not entered",
  emailAlreadyExists: "email already exists",
  emailRequired: "email is required",
  invalidUsername:
    "the username must contain only lowercase letters, at least 3 characters and must not contain special characters",
  usernameAlreadyExists: "username already exists",
  usernameRequired: "username is required",
  invalidPassword: "password must be at least 8 characters and a number",
  passwordRequired: "password is required",
  invalidUserRole: "user role is invalid",
  userNotFoundWithId: (id: string) => `no user found with id: ${id}`,
};
