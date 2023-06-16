import { describe, expect, it } from "vitest";
import { objectFactory } from "@domain/helpers/objectFactory";
import { User, userBuilderFactory } from "../index";
import { err } from "../helpers";

const factory = objectFactory();

describe("UserBuilder", () => {
  it("must be return an instance of User", () => {
    const user = factory.getUser();
    expect(userBuilderFactory({ user })).toBeInstanceOf(User);
  });

  it("must be not be possible to enter a invalid email address", () => {
    const user = factory.getUser({ email: "invalidemail@email" });
    expect(() => {
      userBuilderFactory({ user });
    }).toThrowError(err.invalidEmail);
  });

  it("email must be required", () => {
    const user = factory.getUser();
    delete user.email;
    expect(() => {
      userBuilderFactory({ user });
    }).toThrowError(err.emailRequired);
  });

  it("username must be contain only lowercase letters", () => {
    const user = factory.getUser({ username: "Stark" });
    expect(() => {
      userBuilderFactory({ user });
    }).toThrowError(err.invalidUsername);
  });

  it("username must be contain at least three characters", () => {
    const user = factory.getUser({ username: "lu" });
    expect(() => {
      userBuilderFactory({ user });
    }).toThrowError(err.invalidUsername);
  });

  it("username must be not contain special characters", () => {
    const user = factory.getUser({ username: "xablau%$" });
    expect(() => {
      userBuilderFactory({ user });
    }).toThrowError(err.invalidUsername);
  });

  it("username must be required", () => {
    const user = factory.getUser();
    delete user.username;
    expect(() => {
      userBuilderFactory({ user });
    }).toThrowError(err.usernameRequired);
  });

  it("password must be required", () => {
    const user = factory.getUser();
    delete user.password;
    expect(() => {
      userBuilderFactory({ user });
    }).toThrow(err.passwordRequired);
  });

  it("password must be at least 8 characters and a number", () => {
    const user = factory.getUser({ password: "secret7" });
    expect(() => {
      userBuilderFactory({ user });
    }).toThrow(err.invalidPassword);
  });

  it("user role must be 'author' or 'reader'", () => {
    const user = factory.getUser({ userRole: "admin" as any });
    expect(() => {
      userBuilderFactory({ user });
    }).toThrow(err.invalidUserRole);
  });
});
