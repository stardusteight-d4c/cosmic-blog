import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { IUserRepository, User, UserService } from "@domain/src/user";
import { Post, IPostReflectObject, postBuilderFactory } from "..";
import { IObjectFactory, objectFactory } from "@domain/@utils/objectFactory";
import { UserInMemoryRepository } from "@app/@in-memory-repositories";

let factory: IObjectFactory;
let userInstance: User;
let newPost: IPostReflectObject;
let userRepository: IUserRepository;

describe("PostBuilder", () => {
  beforeEach(async () => {
    userRepository = UserInMemoryRepository.getInstance();
    const userService = new UserService({
      userRepository: userRepository,
    });
    factory = objectFactory();
    const user = factory.getUser();
    const post = factory.getPost();
    userInstance = await userService.createUser(user);
    newPost = {
      ...post,
      author: userInstance.reflect,
    };
  });
  afterEach(async () => {
    await userRepository.deleteAll();
  });

  it("must be able return an instance of Post", () => {
    expect(postBuilderFactory({ post: newPost })).toBeInstanceOf(Post);
  });

  it("must be able postIstance.reflect.author be equal userInstance.reflect", () => {
    const postIstance = postBuilderFactory({ post: newPost });
    expect(postIstance.reflect.author).toStrictEqual(userInstance.reflect);
  });

  it("must be able to throw an error if title, body, tags, coverImage, postedIn or author are not declared", () => {
    const defaultPost = postBuilderFactory({ post: newPost });
    const invalidPostTitle = {
      ...defaultPost.reflect,
      title: undefined as any,
    };
    const invalidPostBody = {
      ...defaultPost.reflect,
      body: undefined as any,
    };
    const invalidPostTags = {
      ...defaultPost.reflect,
      tags: undefined as any,
    };
    const invalidPostCoverImage = {
      ...defaultPost.reflect,
      coverImage: undefined as any,
    };
    const invalidPostPostedIn = {
      ...defaultPost.reflect,
      postedIn: undefined as any,
    };
    const invalidPostAuthor = {
      ...defaultPost.reflect,
      author: undefined as any,
    };
    expect(() => {
      postBuilderFactory({ post: invalidPostTitle });
    }).toThrowError("title is required");
    expect(() => {
      postBuilderFactory({ post: invalidPostBody });
    }).toThrowError("body is required");
    expect(() => {
      postBuilderFactory({ post: invalidPostTags });
    }).toThrowError("tags is required");
    expect(() => {
      postBuilderFactory({ post: invalidPostCoverImage });
    }).toThrowError("coverImage is required");
    expect(() => {
      postBuilderFactory({ post: invalidPostPostedIn });
    }).toThrowError("postedIn is required");
    expect(() => {
      postBuilderFactory({ post: invalidPostAuthor });
    }).toThrowError("author is required");
  });
});
