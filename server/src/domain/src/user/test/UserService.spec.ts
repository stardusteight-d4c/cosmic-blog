import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { User, UserService } from "../index";
import { objectFactory } from "@/domain/helpers/objectFactory";
import { UserInMemoryRepository } from "@app/@in-memory-repositories";
import type { ISocialLinks, IUserRepository } from "@typings/user";
import { err } from "../helpers/errors";

let userService: UserService;
let userInMemoryRepository: IUserRepository;
const factory = objectFactory();

describe("UserService", () => {
  beforeEach(async () => {
    userInMemoryRepository = UserInMemoryRepository.getInstance();
    userService = new UserService({
      userRepository: userInMemoryRepository,
    });
  });

  afterEach(async () => {
    await userInMemoryRepository.deleteAll();
  });

  it("must be able ceate an instance of User", async () => {
    const user = factory.getUser();
    expect(await userService.createUser(user)).toBeInstanceOf(User);
  });

  it("must be not able to create a user with an email already existing in the repository", async () => {
    const user1 = factory.getUser({
      username: "link",
      email: "example@email.com",
    });
    const user2 = factory.getUser({
      username: "zelda",
      email: "example@email.com",
    });
    expect(await userService.createUser(user1)).toBeInstanceOf(User);
    await expect(userService.createUser(user2)).rejects.toThrowError(
      err.emailAlreadyExists
    );
  });

  it("must be not able to create a user with an username already existing in the repository", async () => {
    const user1 = factory.getUser({
      username: "gameboy",
      email: "satoshitajiri@email.com",
    });
    const user2 = factory.getUser({
      username: "gameboy",
      email: "pokemoncompany@email.com",
    });
    expect(await userService.createUser(user1)).toBeInstanceOf(User);
    await expect(userService.createUser(user2)).rejects.toThrowError(
      err.usernameAlreadyExists
    );
  });

  it("must be able to update a user", async () => {
    const user = factory.getUser();
    const userInstance = await userService.createUser(user);
    const newSocialLinks: ISocialLinks = {
      email: "email@example.com",
      github: "https://github.com/stardusteight-d4c",
    };
    const updatedUser = await userService.updateUser({
      ...userInstance.reflect,
      socialLinks: newSocialLinks,
    });
    expect(updatedUser.reflect.socialLinks).toStrictEqual(newSocialLinks);
    expect(updatedUser.reflect.id).toStrictEqual(userInstance.reflect.id);
  });

  it("must be able to delete a user", async () => {
    const user = factory.getUser();
    const userInstance = await userService.createUser(user);
    const userId = userInstance.reflect.id;
    await userService.deleteUser(userId);
    await expect(userService.getUserById(userId)).rejects.toThrowError(
      `No user found with id: ${userId}`
    );
  });
});
