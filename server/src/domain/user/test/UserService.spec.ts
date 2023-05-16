import { beforeEach, describe, expect, it } from "vitest";
import {
  IUserReflectObject,
  User,
  UserInMemoryRepository,
  UserObserver,
  UserPublisher,
  UserService,
} from "../index";
import PostInMemoryRepository from "../../post/PostInMemoryRepository";
import PostPublisher from "../../post/PostPublisher";
import PostService from "../../post/PostService";
import PostObserver from "../../post/PostObserver";

let userService: UserService;

describe("User Service", () => {
  beforeEach(function () {
    const userInMemoryRepository = new UserInMemoryRepository();
    const postInMemoryRepository = new PostInMemoryRepository();
    const userPublisher = new UserPublisher();

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
});
