import { beforeEach, describe, expect, it } from "vitest";
import {
  ISocialLinks,
  IUserReflectObject,
  User,
  UserEventPublisher,
  UserService,
} from "../index";
import { PostInMemoryRepository } from "../../../application/in-memory-repositories/PostInMemoryRepository";
import { UserInMemoryRepository } from "@/application/in-memory-repositories/UserInMemoryRepository";
import { IObjectFactory, objectFactory } from "@/domain/@utils/objectFactory";

let userService: UserService;
let userInstance: User;
let user: IUserReflectObject;
let factory: IObjectFactory;

describe("UserService", () => {
  beforeEach(async () => {
    const userInMemoryRepository = new UserInMemoryRepository();
    const postInMemoryRepository = new PostInMemoryRepository();
    const userPublisher = new UserEventPublisher();
    userService = new UserService({
      userPublisher,
      userRepository: userInMemoryRepository,
      postRepository: postInMemoryRepository,
    });
    factory = objectFactory();
    user = factory.getUser();
    userInstance = await userService.createUser(user);
  });

  it("must be able to create a user", async () => {
    const userInstance = await userService.createUser(user);
    expect(userInstance).toBeInstanceOf(User);
  });

  it("must be not able to access the attributes directly", async () => {
    const userInstance = await userService.createUser(user);
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
    const userInstance = await userService.createUser(user);
    expect(userInstance.reflect.username).toBe(user.username);
    expect(userInstance.reflect.email).toBe(user.email);
    expect(userInstance.reflect.password).toBe(user.password);
  });

  it("must be able to change socialLinks", async () => {
    const newSocialLinks: ISocialLinks = {
      email: "email@example.com",
      github: "https://github.com/stardusteight-d4c",
    };
    const updatedUser = await userService.changeSocialLinks({
      userId: userInstance.reflect.id!,
      socialLinks: newSocialLinks,
    });
    expect(updatedUser!.reflect.socialLinks).toBe(newSocialLinks);
  });
});
