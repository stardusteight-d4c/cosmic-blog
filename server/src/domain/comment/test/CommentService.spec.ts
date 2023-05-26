import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { IUserRepository, User, UserService } from "@domain/user";
import { IObjectFactory, objectFactory } from "@domain/@utils/objectFactory";
import {
  IPostReflectObject,
  IPostRepository,
  Post,
  PostService,
} from "@domain/post";
import { CommentService } from "../CommentService";
import { Comment } from "../Comment";
import { commentBuilderFactory } from "../helpers";
import {
  CommentInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@domain/@in-memory-repositories";
import { ICommentRepository } from "../@interfaces";

let commentService: CommentService;
let postService: PostService;
let userService: UserService;
let newPost: IPostReflectObject;
let userInstance: User;
let postInstance: Post;
let factory: IObjectFactory;
let userInMemoryRepository: IUserRepository;
let postInMemoryRepository: IPostRepository;
let commentInMemoryRepository: ICommentRepository;

describe("CommentService", () => {
  beforeEach(async () => {
    userInMemoryRepository = UserInMemoryRepository.getInstance();
    postInMemoryRepository = PostInMemoryRepository.getInstance();
    commentInMemoryRepository = CommentInMemoryRepository.getInstance();
    commentService = new CommentService({
      commentRepository: commentInMemoryRepository,
    });
    postService = new PostService({
      postRepository: postInMemoryRepository,
    });
    userService = new UserService({
      userRepository: userInMemoryRepository,
    });
    factory = objectFactory();
    const user = factory.getUser();
    const post = factory.getPost();
    userInstance = await userService.createUser(user);
    newPost = {
      ...post,
      author: userInstance.reflect,
    };
    postInstance = await postService.createPost(newPost);
  });
  afterEach(async () => {
    await postInMemoryRepository.deleteAll();
    await userInMemoryRepository.deleteAll();
    await commentInMemoryRepository.deleteAll();
  });

  it("must be able comment on a post", async () => {
    const postInstanceId = postInstance.reflect.id!;
    const commentObj = factory.getComment({
      postId: postInstanceId,
      owner: userInstance.reflect,
    });
    const comment = await commentService.createComment(commentObj);
    const updatedCommentInstanceReflect = await commentService
      .findCommentById(comment.reflect.id!)
      .then((comment) => comment?.reflect);
    expect(updatedCommentInstanceReflect?.content).toStrictEqual(
      commentObj.content,
    );
    const postCommentAmount = await commentService.getPostCommentAmount(
      postInstanceId,
    );
    expect(comment).toBeInstanceOf(Comment);
    expect(postCommentAmount).toStrictEqual(1);
    const commentObj2 = factory.getComment({
      postId: postInstanceId,
      owner: userInstance.reflect,
      content: "This post is amazing! Great job!",
    });
    await commentService.createComment(commentObj2);
    const updatedPostCommentAmount = await commentService.getPostCommentAmount(
      postInstanceId,
    );
    const updatedUserCommentAmount = await commentService.getUserCommentAmount(
      userInstance.reflect.id!,
    );
    expect(updatedPostCommentAmount).toStrictEqual(2);
    expect(updatedUserCommentAmount).toStrictEqual(2);
  });

  it("must be able find a comment by ID", async () => {
    const postInstanceId = postInstance.reflect.id!;
    const commentObj = factory.getComment({
      postId: postInstanceId,
      owner: userInstance.reflect,
    });
    const comment = await commentService.createComment(commentObj);
    const getedComment = await commentService.findCommentById(
      comment.reflect.id!,
    );
    expect(getedComment?.reflect.id).toStrictEqual(comment.reflect.id);
  });

  it("it should be possible to update a comment", async () => {
    const postInstanceId = postInstance.reflect.id!;
    const commentObj = factory.getComment({
      postId: postInstanceId,
      owner: userInstance.reflect,
    });
    const comment = await commentService.createComment(commentObj);
    const updatedComment = commentBuilderFactory({
      comment: comment.reflect,
      update: { field: "content", newData: "Updating comment..." },
    });
    await commentService.updateComment(updatedComment.reflect);
    const updatedComentInstance = await commentService.findCommentById(
      comment.reflect.id!,
    );
    expect(comment.reflect.id).toStrictEqual(updatedComentInstance?.reflect.id);
    expect(updatedComentInstance?.reflect.content).toStrictEqual(
      updatedComment?.reflect.content,
    );
  });

  it("must be able to acquire comments from a specific post and with pagination", async () => {
    const postInstanceId = postInstance.reflect.id!;
    for (let i = 0; i < 6; i++) {
      const commentObj = factory.getComment({
        postId: postInstanceId,
        owner: userInstance.reflect,
      });
      await commentService.createComment(commentObj);
    }
    const secondaryPostInstance = await postService.createPost(newPost);
    const commentObj = factory.getComment({
      postId: secondaryPostInstance.reflect.id!,
      owner: userInstance.reflect,
    });
    await commentService.createComment(commentObj);
    const postCommentAmount = await commentService.getPostCommentAmount(
      postInstanceId,
    );
    const allComments = await commentService.getAllComments();
    expect(allComments?.length).toStrictEqual(7);
    expect(postCommentAmount).toStrictEqual(6);
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

  it("must be able to acquire comments from a specific user and with pagination", async () => {
    for (let i = 0; i < 6; i++) {
      const commentObj = factory.getComment({
        postId: postInstance.reflect.id!,
        owner: userInstance.reflect,
      });
      await commentService.createComment(commentObj);
    }
    const user = factory.getUser();
    const secondaryUserInstance = await userService.createUser(user);
    const commentObj2 = factory.getComment({
      postId: postInstance.reflect.id!,
      owner: secondaryUserInstance.reflect,
    });
    await commentService.createComment(commentObj2);
    const skip = 0;
    const pageSize = 3;
    const paginatedComments =
      await commentService.getCommentsByUserIdWithPagination({
        userId: secondaryUserInstance.reflect.id!,
        skip,
        pageSize,
      });
    expect(paginatedComments.length).toStrictEqual(1);
    expect(
      paginatedComments.map((comment) => comment.reflect.owner.id),
    ).toStrictEqual([secondaryUserInstance.reflect.id]);
  });

  it("must be able delete a comment", async () => {
    const commentObj = factory.getComment({
      postId: postInstance.reflect.id!,
      owner: userInstance.reflect,
    });
    const commentInstance = await commentService.createComment(commentObj);
    const postCommentAmount = await commentService.getPostCommentAmount(
      commentInstance.reflect.postId,
    );
    const userCommentAmount = await commentService.getUserCommentAmount(
      commentInstance.reflect.owner.id!,
    );
    const comments = await commentService.getAllComments();
    expect(postCommentAmount).toStrictEqual(1);
    expect(userCommentAmount).toStrictEqual(1);
    expect(comments?.length).toStrictEqual(1);
    await commentService.deleteComment(commentInstance);
    const updatedPostCommentAmount = await commentService.getPostCommentAmount(
      commentInstance.reflect.postId,
    );
    const updatedUserCommentAmount = await commentService.getUserCommentAmount(
      commentInstance.reflect.owner.id!,
    );
    const updatedComments = await commentService.getAllComments();
    expect(updatedPostCommentAmount).toStrictEqual(0);
    expect(updatedUserCommentAmount).toStrictEqual(0);
    expect(updatedComments?.length).toStrictEqual(0);
  });

  it("must be able delete all comments by postId", async () => {
    const firstCommentObj = factory.getComment({
      postId: postInstance.reflect.id!,
      owner: userInstance.reflect,
    });
    await commentService.createComment(firstCommentObj);
    await commentService.createComment(firstCommentObj);
    const secondCommentObj = factory.getComment({
      postId: "another-post-id",
      owner: userInstance.reflect,
    });
    await commentService.createComment(secondCommentObj);
    const comments = await commentService.getAllComments();
    expect(comments?.length).toStrictEqual(3);
    const commentsFromFirtsComments =
      await commentService.getCommentsByPostIdWithPagination({
        postId: postInstance.reflect.id!,
        skip: 0,
        pageSize: 100,
      });
    expect(commentsFromFirtsComments?.length).toStrictEqual(2);
    await commentService.deleteCommentsByPostId(postInstance.reflect.id!)
    const updatedComments = await commentService.getAllComments();
    expect(updatedComments!.length).toStrictEqual(1);
  });
});
