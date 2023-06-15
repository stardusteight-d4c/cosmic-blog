import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { User, UserService } from "../index";
import { objectFactory } from "@/domain/helpers/objectFactory";
import { UserInMemoryRepository } from "@app/@in-memory-repositories";
import type { IUserRepository } from "@typings/user";

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
  // it("must be not able to access the attributes directly", async () => {
  //   expect(() => userInstance.id).toThrowError(
  //     "Cannot access id property directly. Use the reflect object in the User instead."
  //   );
  //   expect(() => userInstance.username).toThrowError(
  //     "Cannot access username property directly. Use the reflect object in the User instead."
  //   );
  //   expect(() => userInstance.email).toThrowError(
  //     "Cannot access email property directly. Use the reflect object in the User instead."
  //   );
  //   expect(() => userInstance.password).toThrowError(
  //     "Cannot access password property directly. Use the reflect object in the User instead."
  //   );
  // });

  // it("must be able to access the attributes via the <reflect> object", async () => {
  //   expect(userInstance.reflect.username).toBe(user.username);
  //   expect(userInstance.reflect.email).toBe(user.email);
  //   expect(userInstance.reflect.password).toBe(user.password);
  // });

});

  
