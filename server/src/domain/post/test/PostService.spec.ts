import { beforeEach, describe, expect, it } from "vitest";
import PostService from "../PostService";
import UserInMemoryRepository from "@/application/in-memory-repositories/UserInMemoryRepository";
import PostInMemoryRepository from "@/application/in-memory-repositories/PostInMemoryRepository";
import PostPublisher from "../PostPublisher";
import {
  IUserReflectObject,
  UserBuilder,
  UserObserver,
  UserPublisher,
  UserService,
} from "@/domain/user";
import { IPostReflectObject } from "../@interfaces";
import Post from "../Post";
import PostObserver from "../PostObserver";

let postService: PostService;
let userService: UserService;

describe("PostService", () => {
  beforeEach(() => {
    const userInMemoryRepository = new UserInMemoryRepository();
    const postInMemoryRepository = new PostInMemoryRepository();
    const postPublisher = new PostPublisher();
    const userPublisher = new UserPublisher();
    postService = new PostService({
      postPublisher: postPublisher,
      postRepository: postInMemoryRepository,
      userRepository: userInMemoryRepository,
    });
    userService = new UserService({
      userPublisher: userPublisher,
      userRepository: userInMemoryRepository,
      postRepository: postInMemoryRepository,
    });
    postPublisher.register(new PostObserver(postService));
    postPublisher.register(new UserObserver(userService));
  });

  it("should be possible to create a post", async () => {
    const myUser: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = new UserBuilder()
      .setEmail(myUser.email)
      .setUsername(myUser.username)
      .setPassword(myUser.password)
      .setAvatar(myUser.avatar ? myUser.avatar : "")
      .build();
    const postObject: IPostReflectObject = {
      title: "Título doaaa post!",
      body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
      tags: ["nodejs", "typescript", "ddd"],
      coverImage:
        "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
      postedIn: new Date(),
      author: userInstance.reflect,
    };
    const postInstance = await postService.createPost(postObject);
    expect(postInstance).toBeInstanceOf(Post);
  });

  it("should be possible to update a post", async () => {
    const myUser: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = new UserBuilder()
      .setEmail(myUser.email)
      .setUsername(myUser.username)
      .setPassword(myUser.password)
      .setAvatar(myUser.avatar ? myUser.avatar : "")
      .build();
    const postObject: IPostReflectObject = {
      title: "Título doaaa post!",
      body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
      tags: ["nodejs", "typescript", "ddd"],
      coverImage:
        "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
      postedIn: new Date(),
      author: userInstance.reflect,
    };
    const firstPostInstance = await postService.createPost(postObject);
    const updatedPostRequest: IPostReflectObject = {
      ...firstPostInstance?.reflect!,
      body: "body atualizado!",
    };
    const updatedPostInstance = await postService.updatePost(
      updatedPostRequest,
    );
    expect(updatedPostInstance.reflect.id).toStrictEqual(
      firstPostInstance.reflect.id,
    );
    expect(updatedPostInstance.reflect.body).toStrictEqual(
      updatedPostRequest.body,
    );
  });

  it("should be possible to fetch a post by id", async () => {
    const myUser: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = new UserBuilder()
      .setEmail(myUser.email)
      .setUsername(myUser.username)
      .setPassword(myUser.password)
      .setAvatar(myUser.avatar ? myUser.avatar : "")
      .build();
    const postObject: IPostReflectObject = {
      title: "Título doaaa post!",
      body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
      tags: ["nodejs", "typescript", "ddd"],
      coverImage:
        "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
      postedIn: new Date(),
      author: userInstance.reflect,
    };
    const postInstance = await postService.createPost(postObject);
    const findPost = await postService.findPostById(postInstance.reflect.id!);
    expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
  });

  it("should be possible to find a post by title", async () => {
    const myUser: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = new UserBuilder()
      .setEmail(myUser.email)
      .setUsername(myUser.username)
      .setPassword(myUser.password)
      .setAvatar(myUser.avatar ? myUser.avatar : "")
      .build();
    const postObject: IPostReflectObject = {
      title: "Título doaaa post!",
      body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
      tags: ["nodejs", "typescript", "ddd"],
      coverImage:
        "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
      postedIn: new Date(),
      author: userInstance.reflect,
    };
    const postInstance = await postService.createPost(postObject);
    const findPost = await postService.findPostByTitle(
      postInstance.reflect.title!,
    );
    expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
  });

  it("should be possible to favorite a post and this action be reflected both in the User's favoritedPosts property and in the Post's favorites", async () => {
    const myUser: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = await userService.createUser(myUser);
    const postObject: IPostReflectObject = {
      title: "Título doaaa post!",
      body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
      tags: ["nodejs", "typescript", "ddd"],
      coverImage:
        "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
      postedIn: new Date(),
      author: userInstance.reflect,
    };
    const postInstance = await postService.createPost(postObject);
    await postService.publishFavoritePostCommand(
      userInstance.reflect.id!,
      postInstance.reflect.id!,
    );
    const updatedPostInstance = await postService.findPostById(
      postInstance.reflect.id!,
    );
    const updatedUserInstance = await userService.findUserById(
      userInstance.reflect.id!,
    );
    expect(updatedPostInstance?.reflect.favorites?.length).toBeGreaterThan(0);
    expect(updatedUserInstance?.reflect.favoritedPosts?.length).toBeGreaterThan(
      0,
    );
    expect(updatedPostInstance?.reflect.favorites![0].postId).toStrictEqual(
      postInstance?.reflect.id,
    );
    expect(updatedPostInstance?.reflect.favorites![0].userId).toStrictEqual(
      userInstance?.reflect.id,
    );
    expect(
      updatedUserInstance?.reflect.favoritedPosts![0].postId,
    ).toStrictEqual(postInstance?.reflect.id);
  });
});
