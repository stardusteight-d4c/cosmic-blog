import { beforeEach, describe, expect, it } from "vitest";
import { UserInMemoryRepository } from "@/application/in-memory-repositories/UserInMemoryRepository";
import { PostInMemoryRepository } from "@/application/in-memory-repositories/PostInMemoryRepository";
import {
  User,
  UserEventObserver,
  UserEventPublisher,
  UserService,
} from "@/domain/user";
import { IPostReflectObject } from "../@interfaces";
import { Comment } from "@/domain/comment";
import { Post, PostService, PostEventPublisher, PostEventObserver } from "..";
import { IObjectFactory, objectFactory } from "../../utils/objectFactory";

let postService: PostService;
let userService: UserService;
let newPost: IPostReflectObject;
let userInstance: User;
let postInstance: Post;
let factory: IObjectFactory;

describe("PostService", () => {
  beforeEach(async () => {
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
    factory = objectFactory();
    const user = factory.getUser();
    const post = factory.getPost();
    userInstance = await userService.createUser(user);
    newPost = {
      ...post,
      author: userInstance.reflect,
    };
    postInstance = await postService.emitCreatePostEvent(newPost);
  });

  it("should be able to create a post", async () => {
    const userWhoCommented = await userService.findUserById(
      userInstance.reflect.id!,
    );
    expect(postInstance).toBeInstanceOf(Post);
    expect(userWhoCommented?.reflect.publishedPosts?.length).toStrictEqual(1);
    expect(userWhoCommented?.reflect.publishedPosts![0].title).toStrictEqual(
      newPost.title,
    );
  });

  it("should be able to update a post", async () => {
    const updatedPostRequest: IPostReflectObject = {
      ...postInstance.reflect,
      body: "Updating body...",
    };
    const updatedPostInstance = await postService.updatePost(
      updatedPostRequest,
    );
    expect(updatedPostInstance.reflect.body).toStrictEqual("Updating body...");
  });

  it("should be able to find a post by id", async () => {
    const findPost = await postService.findPostById(postInstance.reflect.id!);
    expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
  });

  it("should be able to find a post by title", async () => {
    const findPost = await postService.findPostByTitle(
      postInstance.reflect.title!,
    );
    expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
  });

  it("should be able to favorite a post", async () => {
    const postInstanceId = postInstance.reflect.id!;
    const userInstanceId = userInstance.reflect.id!;
    const favorite = factory.getFavorite({
      userId: userInstanceId,
      postId: postInstanceId,
    });
    const postFavorites = await postService
      .emitFavoritePostEvent(favorite)
      .then((post) => post?.reflect.favorites);
    const userFavoritedPosts = await userService
      .findUserById(userInstance.reflect.id!)
      .then((user) => user?.reflect.favoritedPosts);
    expect(postFavorites?.length).toBeGreaterThan(0);
    expect(userFavoritedPosts?.length).toBeGreaterThan(0);
    expect(postFavorites![0].postId).toStrictEqual(postInstanceId);
    expect(postFavorites![0].userId).toStrictEqual(userInstanceId);
    expect(userFavoritedPosts![0].postId).toStrictEqual(postInstanceId);
  });

  it("should be able comment on a post", async () => {
    const postInstanceId = postInstance.reflect.id!;
    const userInstanceId = userInstance.reflect.id!;
    const commentObj = factory.getComment({
      postId: postInstanceId,
      owner: userInstance.reflect,
    });
    const commentInstance = new Comment(commentObj);
    const comment = await postService.emitCommentPostEvent(commentInstance);
    const updatedPostInstanceReflect = await postService
      .findPostById(postInstanceId)
      .then((post) => post?.reflect!);
    const updatedUserInstanceReflect = await userService
      .findUserById(userInstanceId)
      .then((user) => user?.reflect!);
    expect(comment).toBeInstanceOf(Comment);
    expect(updatedPostInstanceReflect.comments?.length).toStrictEqual(1);
    expect(updatedUserInstanceReflect.commentedPosts?.length).toStrictEqual(1);
    const commentObj2 = factory.getComment({
      postId: postInstanceId,
      owner: userInstance.reflect,
      content: "This post is amazing! Great job!",
    });
    const commentInstance2 = new Comment(commentObj2);
    await postService.emitCommentPostEvent(commentInstance2);
    const newPostInstance2 = await postService.findPostById(postInstanceId);
    const newUserInstance2 = await userService.findUserById(userInstanceId);
    expect(newPostInstance2?.reflect.comments?.length).toStrictEqual(2);
    expect(newUserInstance2?.reflect.commentedPosts?.length).toStrictEqual(2);
    expect(newUserInstance2?.reflect.commentedPosts![1].content).toStrictEqual(
      commentObj2.content,
    );
  });
});
