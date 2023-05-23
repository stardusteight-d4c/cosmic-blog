import { beforeEach, describe, expect, it } from "vitest";
import { UserInMemoryRepository } from "@/application/in-memory-repositories/UserInMemoryRepository";
import { PostInMemoryRepository } from "@/application/in-memory-repositories/PostInMemoryRepository";
import {
  User,
  UserEventObserver,
  UserEventPublisher,
  UserService,
} from "@domain/user";
import { IObjectFactory, objectFactory } from "@domain/@utils/objectFactory";
import {
  IPostReflectObject,
  Post,
  PostEventObserver,
  PostEventPublisher,
  PostService,
} from "@domain/post";
import { CommentService } from "../CommentService";
import { CommentInMemoryRepository } from "@/application/in-memory-repositories/CommentInMemoryRespository";
import { CommentEventPublisher } from "../CommentEventPublisher";
import { Comment } from "../Comment";
import { CommentEventObserver } from "../CommentEventObserver";

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
    commentPublisher.register(new CommentEventObserver(commentService));

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

    const updatedCommentInstanceReflect = await commentService
      .findCommentById(comment.reflect.id!)
      .then((comment) => comment?.reflect);
    expect(updatedCommentInstanceReflect?.content).toStrictEqual(
      commentObj.content,
    );
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

  it("must be able find a comment by ID", async () => {
    const postInstanceId = postInstance.reflect.id!;
    const commentObj = factory.getComment({
      postId: postInstanceId,
      owner: userInstance.reflect,
    });
    const comment = await commentService.emitCreateCommentEvent(commentObj);
    const getedComment = await commentService.findCommentById(
      comment.reflect.id!,
    );
    expect(getedComment?.reflect.id).toStrictEqual(comment.reflect.id);
  });

  it("must be able to acquire comments from a specific post and with pagination", async () => {
    const postInstanceId = postInstance.reflect.id!;
    for (let i = 0; i < 6; i++) {
      const commentObj = factory.getComment({
        postId: postInstanceId,
        owner: userInstance.reflect,
      });
      await commentService.emitCreateCommentEvent(commentObj);
    }
    const secondaryPostInstance = await postService.emitCreatePostEvent(
      newPost,
    );
    const commentObj = factory.getComment({
      postId: secondaryPostInstance.reflect.id!,
      owner: userInstance.reflect,
    });
    await commentService.emitCreateCommentEvent(commentObj);
    const updatedPostInstance = await postService.findPostById(postInstanceId);
    const allComments = await commentService.getComments();
    expect(allComments?.length).toStrictEqual(7);
    expect(updatedPostInstance?.reflect.commentAmount).toStrictEqual(6);
    const skip = 3;
    const pageSize = 3;
    const paginatedComments =
      await commentService.getCommentsByPostIdWithPagination({
        postId: postInstanceId,
        skip,
        pageSize,
      });
    expect(paginatedComments.length).toStrictEqual(3);
    expect(
      paginatedComments.map((comment) => comment.reflect.postId),
    ).toStrictEqual([postInstanceId, postInstanceId, postInstanceId]);
  });
});
