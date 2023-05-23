import { beforeEach, describe, expect, it } from "vitest";
import { UserInMemoryRepository } from "@/application/in-memory-repositories/UserInMemoryRepository";
import { PostInMemoryRepository } from "@/application/in-memory-repositories/PostInMemoryRepository";
import {
  User,
  UserEventObserver,
  UserEventPublisher,
  UserService,
} from "@/domain/user";
import { IObjectFactory, objectFactory } from "@/domain/@utils/objectFactory";
import {
  IPostReflectObject,
  Post,
  PostEventObserver,
  PostEventPublisher,
  PostService,
} from "@/domain/post";
import { CommentService } from "../CommentService";
import { CommentInMemoryRepository } from "@/application/in-memory-repositories/CommentInMemoryRespository";
import { CommentEventPublisher } from "../CommentEventPublisher";
import { Comment } from "../Comment";

let commentService: CommentService;
let postService: PostService;
let userService: UserService;
let newPost: IPostReflectObject;
let userInstance: User;
let postInstance: Post;
let factory: IObjectFactory;

describe("CommentService", () => {
  beforeEach(async () => {
    const userInMemoryRepository = new UserInMemoryRepository();
    const postInMemoryRepository = new PostInMemoryRepository();
    const commentInMemoryRepository = new CommentInMemoryRepository();
    const commentPublisher = new CommentEventPublisher();
    const postPublisher = new PostEventPublisher();
    const userPublisher = new UserEventPublisher();
    commentService = new CommentService({
      commentPublisher,
      commentRepository: commentInMemoryRepository,
      postRepository: postInMemoryRepository,
      userRepository: userInMemoryRepository,
    });
    postService = new PostService({
      postPublisher,
      postRepository: postInMemoryRepository,
      userRepository: userInMemoryRepository,
    });
    userService = new UserService({
      userPublisher,
      userRepository: userInMemoryRepository,
      postRepository: postInMemoryRepository,
    });
    postPublisher.register(new PostEventObserver(postService));
    postPublisher.register(new UserEventObserver(userService));
    commentPublisher.register(new PostEventObserver(postService));
    commentPublisher.register(new UserEventObserver(userService));
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

  it("must be able comment on a post", async () => {
    const postInstanceId = postInstance.reflect.id!;
    const commentObj = factory.getComment({
      postId: postInstanceId,
      owner: userInstance.reflect,
    });
    const comment = await commentService.emitCreateCommentEvent(commentObj);
    const updatedPostInstanceReflect = await postService
      .findPostById(postInstanceId)
      .then((post) => post?.reflect!);
    expect(comment).toBeInstanceOf(Comment);
    expect(updatedPostInstanceReflect.commentAmount).toStrictEqual(1);
    const commentObj2 = factory.getComment({
      postId: postInstanceId,
      owner: userInstance.reflect,
      content: "This post is amazing! Great job!",
    });
    await commentService.emitCreateCommentEvent(commentObj2);
    const newPostInstance2 = await postService.findPostById(postInstanceId);
    expect(newPostInstance2?.reflect.commentAmount).toStrictEqual(2);
  });
});
