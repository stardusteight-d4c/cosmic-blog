import { describe, expect, it } from "vitest";
import { User } from "../index";
import { objectFactory } from "@/domain/helpers/objectFactory";

const factory = objectFactory();

describe("UserService", () => {
  it("must be not able to access the attributes directly", async () => {
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

  it("must be not able to modify the attributes directly", async () => {
    const user = factory.getUser();
    const userInstance = new User(user);
    // @ts-ignore
    userInstance.username = "Mario";
    expect(userInstance.reflect.username).toStrictEqual(user.username);
  });

  it("must be able to access the attributes via the <reflect> object", async () => {
    const user = factory.getUser();
    const userInstance = new User(user);
    expect(userInstance.reflect.username).toBe(user.username);
    expect(userInstance.reflect.email).toBe(user.email);
    expect(userInstance.reflect.password).toBe(user.password);
  });
});
