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

  it("must be able create an instance of User", async () => {
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

  it("must be mandatory to use the id when updating a user", async () => {
    const user = factory.getUser();
    const newSocialLinks: ISocialLinks = {
      email: "email@example.com",
      github: "https://github.com/stardusteight-d4c",
    };
    await expect(
      userService.updateUser({
        ...user,
        socialLinks: newSocialLinks,
      })
    ).rejects.toThrowError(err.userNotFoundWithId("undefined"));
  });

  it("must be able to update a user partially", async () => {
    const user = factory.getUser();
    const userInstance = await userService.createUser(user);
    const userId = userInstance.reflect.id;
    const newSocialLinks: ISocialLinks = {
      email: "email@example.com",
      github: "https://github.com/stardusteight-d4c",
    };
    delete user.password;
    delete user.username;
    delete user.email;
    delete user.avatar;
    delete user.userRole;
    const updatedUser = await userService.updateUser({
      ...user,
      id: userId,
      socialLinks: newSocialLinks,
    });
    delete user.socialLinks;
    const newUpdatedUser = await userService.updateUser({
      ...user,
      id: userId,
    });
    const finalUserState = await userService.getUserById(userId);
    const initialState = userInstance.reflect;
    const finalState = finalUserState.reflect;
    expect(updatedUser.reflect.socialLinks).toStrictEqual(newSocialLinks);
    expect(updatedUser.reflect.id).toStrictEqual(userInstance.reflect.id);
    expect(finalState["id"]).toStrictEqual(initialState["id"]);
    expect(finalState["password"]).toStrictEqual(initialState["password"]);
    expect(finalState["username"]).toStrictEqual(initialState["username"]);
    expect(finalState["email"]).toStrictEqual(initialState["email"]);
    expect(finalState["avatar"]).toStrictEqual(initialState["avatar"]);
    expect(finalState["userRole"]).toStrictEqual(initialState["userRole"]);
    expect(newUpdatedUser.reflect["socialLinks"]).toStrictEqual(finalState["socialLinks"]);
  });

  it("must be able to delete a user", async () => {
    const user = factory.getUser();
    const userInstance = await userService.createUser(user);
    const userId = userInstance.reflect.id;
    await userService.deleteUser(userId);
    await expect(userService.getUserById(userId)).rejects.toThrowError(
      err.userNotFoundWithId(userId)
    );
  });
});
