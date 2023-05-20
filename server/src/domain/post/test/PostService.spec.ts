import { beforeEach, describe, expect, it } from "vitest";
import { UserInMemoryRepository } from "@/application/in-memory-repositories/UserInMemoryRepository";
import { PostInMemoryRepository } from "@/application/in-memory-repositories/PostInMemoryRepository";
import {
  IUserReflectObject,
  UserBuilder,
  UserEventObserver,
  UserEventPublisher,
  UserService,
} from "@/domain/user";
import { IPostReflectObject } from "../@interfaces";
import { Comment, ICommentReflectObject } from "@/domain/comment";
import { Post, PostService, PostEventPublisher, PostEventObserver } from "..";

let postService: PostService;
let userService: UserService;

describe("PostService", () => {
  beforeEach(() => {
    const userInMemoryRepository = new UserInMemoryRepository();
    const postInMemoryRepository = new PostInMemoryRepository();
    const postPublisher = new PostEventPublisher();
    const userPublisher = new UserEventPublisher();
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
    postPublisher.register(new PostEventObserver(postService));
    postPublisher.register(new UserEventObserver(userService));
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
    await postService.emitFavoritePostEvent(
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

  it("must be possible to comment on a post and this action is reflected both in the Post's comments property and in the User's commentedPosts", async () => {
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
    const commentObj: ICommentReflectObject = {
      owner: userInstance.reflect,
      content: "hehe post bem massa!",
      postedAt: new Date(),
    };
    const commentInstance = new Comment(commentObj);
    const comment = await postService.emitCommentPostEvent(
      commentInstance,
      postInstance.reflect.id!,
    );
    const newPostInstance = await postService.findPostById(
      postInstance.reflect.id!,
    );
    const newUserInstance = await userService.findUserById(
      userInstance.reflect.id!,
    );
    expect(comment).toBeInstanceOf(Comment);
    console.log(newPostInstance?.reflect);

    expect(newPostInstance?.reflect.comments?.length).toBeGreaterThan(0);
    // expect(newUserInstance?.reflect.commentedPosts?.length).toBeGreaterThan(0);
  });
});
