import { describe, expect, it } from "vitest";
import { User } from "../index";
import { objectFactory } from "@domain/helpers/objectFactory";

const factory = objectFactory();

describe("User", () => {
  it("must be not able to access the attributes directly", () => {
    const user = factory.getUser();
    const userInstance = new User(user);
    // @ts-ignore
    expect(userInstance.id).toBeUndefined();
    // @ts-ignore
    expect(userInstance.username).toBeUndefined();
    // @ts-ignore
    expect(userInstance.email).toBeUndefined();
    // @ts-ignore
    expect(userInstance.password).toBeUndefined();
    // @ts-ignore
    expect(userInstance.avatar).toBeUndefined();
    // @ts-ignore
    expect(userInstance.socialLinks).toBeUndefined();
    // @ts-ignore
    expect(userInstance.userRole).toBeUndefined();
  });

  it("must be not able to modify the attributes directly", () => {
    const user = factory.getUser();
    const userInstance = new User(user);
    // @ts-ignore
    userInstance.username = "Mario";
    expect(userInstance.reflect.username).toStrictEqual(user.username);
  });

  it("must be able to access the attributes via the <reflect> object", () => {
    const user = factory.getUser();
    const userInstance = new User(user);
    expect(userInstance.reflect.username).toStrictEqual(user.username);
    expect(userInstance.reflect.email).toStrictEqual(user.email);
    expect(userInstance.reflect.password).toStrictEqual(user.password);
  });
});
