import type { IUserReflectObject } from "@typings/user";
import { beforeEach, describe, expect, it } from "vitest";
import { User, UserBuilder } from "../index";

describe("UserBuilder", () => {
  beforeEach(() => { });

  it("must return an instance of User", () => {
    const newUser: IUserReflectObject = {
      username: "johndoe",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    expect(
      new UserBuilder()
        .setEmail(newUser.email)
        .setUsername(newUser.username)
        .setPassword(newUser.password)
        .setAvatar(newUser.avatar ? newUser.avatar : "")
        .build(),
    ).toBeInstanceOf(User);
  });

  it("it should not be possible to enter fake email addresses", () => {
    const newUser: IUserReflectObject = {
      username: "johndoe",
      email: "johndexample.com",
      password: "pa$$word1",
    };
    expect(() => {
      new UserBuilder()
        .setEmail(newUser.email)
        .setUsername(newUser.username)
        .setPassword(newUser.password)
        .setAvatar(newUser.avatar ? newUser.avatar : "")
        .build();
    }).toThrow("A valid email address was not entered.");
  });

  it("username must contain only lowercase letters, at least 3 characters and must not contain special characters", () => {
    const newUser1: IUserReflectObject = {
      username: "jj",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const newUser2: IUserReflectObject = {
      username: "jjj*",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    expect(() => {
      new UserBuilder()
        .setEmail(newUser1.email)
        .setUsername(newUser1.username)
        .setPassword(newUser1.password)
        .setAvatar(newUser1.avatar ? newUser1.avatar : "")
        .build();
    }).toThrow(
      "The username must contain only lowercase letters, at least 3 characters and must not contain special characters.",
    );
    expect(() => {
      new UserBuilder()
        .setEmail(newUser2.email)
        .setUsername(newUser2.username)
        .setPassword(newUser2.password)
        .setAvatar(newUser2.avatar ? newUser2.avatar : "")
        .build();
    }).toThrow(
      "The username must contain only lowercase letters, at least 3 characters and must not contain special characters.",
    );
  });

  it("password must be at least 8 characters and a number", () => {
    const newUser: IUserReflectObject = {
      username: "johndoe",
      email: "johndoe@example.com",
      password: "wo1",
    };
    expect(() => {
      new UserBuilder()
        .setEmail(newUser.email)
        .setUsername(newUser.username)
        .setPassword(newUser.password)
        .setAvatar(newUser.avatar ? newUser.avatar : "")
        .build();
    }).toThrow("Password must be at least 8 characters and a number.");
  });
});
