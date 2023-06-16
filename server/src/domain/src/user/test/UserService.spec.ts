import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { User, UserService } from "../index";
import { objectFactory } from "@domain/helpers/objectFactory";
import { UserInMemoryRepository } from "@app/@in-memory-repositories";
import type { ISocialLinks, IUserRepository } from "@typings/user";
import { err } from "../helpers";

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
    ).rejects.toThrowError(err.userNotFoundWithId(undefined));
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
    expect(newUpdatedUser.reflect["socialLinks"]).toStrictEqual(
      finalState["socialLinks"]
    );
  });

  it("must be able to delete a user", async () => {
    const user = factory.getUser();
    const userInstance = await userService.createUser(user);
    const userId = userInstance.reflect.id;
    await userService.deleteUser(userId);
    expect(await userService.getUserById(userId)).toStrictEqual(undefined);
  });

  it("must be able get a user by id", async () => {
    const user = factory.getUser();
    const userInstance = await userService.createUser(user);
    const userId = userInstance.reflect.id;
    expect(await userService.getUserById(userId)).toStrictEqual(userInstance);
  });

  it("must be able get a user by email", async () => {
    const user = factory.getUser();
    const userInstance = await userService.createUser(user);
    const userEmail = userInstance.reflect.email;
    expect(await userService.getUserByEmail(userEmail)).toStrictEqual(
      userInstance
    );
  });

  it("must be able get a user by username", async () => {
    const user = factory.getUser();
    const userInstance = await userService.createUser(user);
    const username = userInstance.reflect.username;
    expect(await userService.getUserByUsername(username)).toStrictEqual(
      userInstance
    );
  });

  it("must be able get a users by username", async () => {
    const user1 = factory.getUser({
      username: "browser",
      email: "supermario@email.com",
    });
    const user2 = factory.getUser({
      username: "browsernavigator",
      email: "firefox@email.com",
    });
    const user3 = factory.getUser({
      username: "crash",
      email: "crashbandicoot@email.com",
    });
    await userService.createUser(user1);
    await userService.createUser(user2);
    await userService.createUser(user3);
    expect(await userService.getUsersByUsername("browser")).toHaveLength(2);
  });
});
