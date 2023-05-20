import { beforeEach, describe, expect, it } from "vitest";
import {
  IUserReflectObject,
  User,
  UserEventPublisher,
  UserService,
} from "../index";
import { PostInMemoryRepository } from "../../../application/in-memory-repositories/PostInMemoryRepository";
import { UserInMemoryRepository } from "@/application/in-memory-repositories/UserInMemoryRepository";

let userService: UserService;

describe("UserService", () => {
  beforeEach(() => {
    const userInMemoryRepository = new UserInMemoryRepository();
    const postInMemoryRepository = new PostInMemoryRepository();
    const userPublisher = new UserEventPublisher();
    userService = new UserService({
      userPublisher: userPublisher,
      userRepository: userInMemoryRepository,
      postRepository: postInMemoryRepository,
    });
  });

  it("must be possible to create a user", async () => {
    const newUser: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = await userService.createUser(newUser);
    expect(userInstance).toBeInstanceOf(User);
  });

  it("must not be possible to access the attributes directly", async () => {
    const newUser: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = await userService.createUser(newUser);
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

  it("must be possible to access the attributes via the <reflect> object", async () => {
    const newUser: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = await userService.createUser(newUser);
    expect(userInstance.reflect.username).toBe(newUser.username);
    expect(userInstance.reflect.email).toBe(newUser.email);
    expect(userInstance.reflect.password).toBe(newUser.password);
  });
});
