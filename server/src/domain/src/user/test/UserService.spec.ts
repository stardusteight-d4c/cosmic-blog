import type { ISocialLinks, IUserReflectObject, IUserRepository } from "@typings/user";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  User,
  UserService,
} from "../index";
import { IObjectFactory, objectFactory } from "@domain/@utils/objectFactory";
import { UserInMemoryRepository } from "@app/@in-memory-repositories";

let userInstance: User;
let userService: UserService;
let userInMemoryRepository: IUserRepository;
let user: IUserReflectObject;
let factory: IObjectFactory;

describe("UserService", () => {
  beforeEach(async () => {
    userInMemoryRepository = UserInMemoryRepository.getInstance();
    userService = new UserService({
      userRepository: userInMemoryRepository,
    });
    factory = objectFactory();
    user = factory.getUser();
    userInstance = await userService.createUser(user);
  });
  afterEach(async () => {
    await userInMemoryRepository.deleteAll();
  });

  it("must be able to create a user", async () => {
    expect(userInstance).toBeInstanceOf(User);
  });

  it("must be not able to access the attributes directly", async () => {
    expect(() => userInstance.id).toThrowError(
      "Cannot access id property directly. Use the reflect object in the User instead.",
    );
    expect(() => userInstance.username).toThrowError(
      "Cannot access username property directly. Use the reflect object in the User instead.",
    );
    expect(() => userInstance.email).toThrowError(
      "Cannot access email property directly. Use the reflect object in the User instead.",
    );
    expect(() => userInstance.password).toThrowError(
      "Cannot access password property directly. Use the reflect object in the User instead.",
    );
  });

  it("must be able to access the attributes via the <reflect> object", async () => {
    expect(userInstance.reflect.username).toBe(user.username);
    expect(userInstance.reflect.email).toBe(user.email);
    expect(userInstance.reflect.password).toBe(user.password);
  });

  it("must be able to change socialLinks", async () => {
    const newSocialLinks: ISocialLinks = {
      email: "email@example.com",
      github: "https://github.com/stardusteight-d4c",
    };
    const updatedUser = await userService.updateUser({
      ...userInstance.reflect,
      socialLinks: newSocialLinks,
    });
    expect(updatedUser!.reflect.socialLinks).toBe(newSocialLinks);
  });
});
