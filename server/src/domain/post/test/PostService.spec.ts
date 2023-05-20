import { beforeEach, describe, expect, it } from "vitest";
import { UserInMemoryRepository } from "@/application/in-memory-repositories/UserInMemoryRepository";
import { PostInMemoryRepository } from "@/application/in-memory-repositories/PostInMemoryRepository";
import {
  IUserReflectObject,
  UserBuilder,
  UserEventObserver,
  UserEventPublisher,
  UserService,
  userBuilderFactory,
} from "@/domain/user";
import { IPostReflectObject } from "../@interfaces";
import { Comment, ICommentReflectObject } from "@/domain/comment";
import { Post, PostService, PostEventPublisher, PostEventObserver } from "..";

let postService: PostService;
let userService: UserService;

const user: IUserReflectObject = {
  username: "johndoe",
  email: "johndoe@email.com",
  password: "pa$$word1",
};
const post: IPostReflectObject = {
  title: "Sample Post",
  body: "This is the content of the post.",
  tags: ["tag1", "tag2", "tag3"],
  coverImage: "https://example.com/cover-image.jpg",
  postedIn: new Date(),
  author: user,
};

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

  it("should be able to create a post", async () => {
    const userInstance = await userService.createUser(user);
    const newPost: IPostReflectObject = {
      ...post,
      author: userInstance.reflect,
    };
    const postInstance = await postService.emitCreatePostEvent(newPost);
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
    const userInstance = await userService.createUser(user);
    const newPost: IPostReflectObject = {
      ...post,
      author: userInstance.reflect,
    };
    const postInstance = await postService.emitCreatePostEvent(newPost);
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
    const userInstance = await userService.createUser(user);
    const newPost: IPostReflectObject = {
      ...post,
      author: userInstance.reflect,
    };
    const postInstance = await postService.emitCreatePostEvent(newPost);
    const findPost = await postService.findPostById(postInstance.reflect.id!);
    expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
  });

  it("should be able to find a post by title", async () => {
    const userInstance = await userService.createUser(user);
    const newPost: IPostReflectObject = {
      ...post,
      author: userInstance.reflect,
    };
    const postInstance = await postService.emitCreatePostEvent(newPost);
    const findPost = await postService.findPostByTitle(
      postInstance.reflect.title!,
    );
    expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
  });

  it("should be able to favorite a post", async () => {
    const userInstance = await userService.createUser(user);
    const newPost: IPostReflectObject = {
      ...post,
      author: userInstance.reflect,
    };
    const postInstance = await postService.emitCreatePostEvent(newPost);
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

  it("should be able comment on a post", async () => {
    const userInstance = await userService.createUser(user);
    const newPost: IPostReflectObject = {
      ...post,
      author: userInstance.reflect,
    };
    const postInstance = await postService.emitCreatePostEvent(newPost);
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
    expect(newPostInstance?.reflect.comments?.length).toStrictEqual(1);
    expect(newUserInstance?.reflect.commentedPosts?.length).toStrictEqual(1);
    const commentObj2: ICommentReflectObject = {
      owner: userInstance.reflect,
      content: "hehe post bem bosta!",
      postedAt: new Date(),
    };
    const commentInstance2 = new Comment(commentObj2);
    await postService.emitCommentPostEvent(
      commentInstance2,
      postInstance.reflect.id!,
    );

    const newPostInstance2 = await postService.findPostById(
      postInstance.reflect.id!,
    );
    const newUserInstance2 = await userService.findUserById(
      userInstance.reflect.id!,
    );
    expect(newPostInstance2?.reflect.comments?.length).toStrictEqual(2);
    expect(newUserInstance2?.reflect.commentedPosts?.length).toStrictEqual(2);
    expect(newUserInstance2?.reflect.commentedPosts![1].content).toStrictEqual(
      "hehe post bem bosta!",
    );
  });
});
