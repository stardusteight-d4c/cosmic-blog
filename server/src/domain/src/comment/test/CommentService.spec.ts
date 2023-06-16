import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CommentService } from "../CommentService";
import { objectFactory } from "@domain/helpers/objectFactory";
import {
  CommentInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@app/@in-memory-repositories";
import type { IPostRepository } from "@typings/post";
import type { ICommentRepository } from "@typings/comment";
import type { IUserRepository } from "@typings/user";
import { Comment } from "../Comment";

let commentService: CommentService;
let commentInMemoryRepository: ICommentRepository;
let postInMemoryRepository: IPostRepository;
let userInMemoryRepository: IUserRepository;
const factory = objectFactory();

describe("CommentService", () => {
  beforeEach(async () => {
    commentInMemoryRepository = CommentInMemoryRepository.getInstance();
    postInMemoryRepository = PostInMemoryRepository.getInstance();
    userInMemoryRepository = UserInMemoryRepository.getInstance();
    commentService = new CommentService({
      commentRepository: commentInMemoryRepository,
      postRepository: postInMemoryRepository,
      userRepository: userInMemoryRepository,
    });
  });
  afterEach(async () => {
    commentInMemoryRepository.deleteAll();
    postInMemoryRepository.deleteAll();
    userInMemoryRepository.deleteAll();
  });

  it("must be able create a comment", async () => {
    const comment = factory.getComment();
    expect(await commentService.createComment(comment)).toBeInstanceOf(Comment);
  });

  // it("must be able find a comment by ID", async () => {
  //   const postInstanceId = postInstance.reflect.id!;
  //   const commentObj = factory.getComment({
  //     postId: postInstanceId,
  //     owner: userInstance.reflect,
  //   });
  //   const comment = await commentService.createComment(commentObj);
  //   const getedComment = await commentService.getCommentById(
  //     comment.reflect.id!,
  //   );
  //   expect(getedComment?.reflect.id).toStrictEqual(comment.reflect.id);
  // });

  // it("it should be possible to update a comment", async () => {
  //   const postInstanceId = postInstance.reflect.id!;
  //   const commentObj = factory.getComment({
  //     postId: postInstanceId,
  //     owner: userInstance.reflect,
  //   });
  //   const comment = await commentService.createComment(commentObj);
  //   const updatedComment = commentBuilderFactory({
  //     comment: comment.reflect,
  //     update: { field: "content", newData: "Updating comment..." },
  //   });
  //   await commentService.updateComment(updatedComment.reflect);
  //   const updatedComentInstance = await commentService.getCommentById(
  //     comment.reflect.id!,
  //   );
  //   expect(comment.reflect.id).toStrictEqual(updatedComentInstance?.reflect.id);
  //   expect(updatedComentInstance?.reflect.content).toStrictEqual(
  //     updatedComment?.reflect.content,
  //   );
  // });

  // it("must be able to acquire comments with pagination from a specific post", async () => {
  //   const postInstanceId = postInstance.reflect.id!;
  //   for (let i = 0; i < 6; i++) {
  //     const commentObj = factory.getComment({
  //       postId: postInstanceId,
  //       owner: userInstance.reflect,
  //     });
  //     await commentService.createComment(commentObj);
  //   }
  //   const secondaryPostInstance = await postService.createPost(newPost);
  //   const commentObj = factory.getComment({
  //     postId: secondaryPostInstance.reflect.id!,
  //     owner: userInstance.reflect,
  //   });
  //   await commentService.createComment(commentObj);
  //   const postCommentAmount = await commentService.getPostCommentAmount(
  //     postInstanceId,
  //   );
  //   const allComments = await commentService.getAllComments();
  //   expect(allComments?.length).toStrictEqual(7);
  //   expect(postCommentAmount).toStrictEqual(6);
  //   const skip = 3;
  //   const pageSize = 3;
  //   const paginatedComments =
  //     await commentService.getCommentsByPostIdWithPagination({
  //       postId: postInstanceId,
  //       skip,
  //       pageSize,
  //     });
  //   expect(paginatedComments.length).toStrictEqual(3);
  //   expect(
  //     paginatedComments.map((comment) => comment.reflect.postId),
  //   ).toStrictEqual([postInstanceId, postInstanceId, postInstanceId]);
  // });

  // it("must be able to acquire comments with pagination from a specific user", async () => {
  //   for (let i = 0; i < 6; i++) {
  //     const commentObj = factory.getComment({
  //       postId: postInstance.reflect.id!,
  //       owner: userInstance.reflect,
  //     });
  //     await commentService.createComment(commentObj);
  //   }
  //   const user = factory.getUser();
  //   const newUser = {
  //     ...user,
  //     email: "anotheremail@email.com",
  //     username: "anotherusername",
  //   };
  //   const secondaryUserInstance = await userService.createUser(newUser);
  //   const commentObj2 = factory.getComment({
  //     postId: postInstance.reflect.id!,
  //     owner: secondaryUserInstance.reflect,
  //   });
  //   await commentService.createComment(commentObj2);
  //   const skip = 0;
  //   const pageSize = 3;
  //   const paginatedComments =
  //     await commentService.getCommentsByUserIdWithPagination({
  //       userId: secondaryUserInstance.reflect.id!,
  //       skip,
  //       pageSize,
  //     });
  //   expect(paginatedComments.length).toStrictEqual(1);
  //   expect(
  //     paginatedComments.map((comment) => comment.reflect.owner.id),
  //   ).toStrictEqual([secondaryUserInstance.reflect.id]);
  // });

  // it("must be able delete a comment", async () => {
  //   const commentObj = factory.getComment({
  //     postId: postInstance.reflect.id!,
  //     owner: userInstance.reflect,
  //   });
  //   const commentInstance = await commentService.createComment(commentObj);
  //   const postCommentAmount = await commentService.getPostCommentAmount(
  //     commentInstance.reflect.postId,
  //   );
  //   const userCommentAmount = await commentService.getUserCommentAmount(
  //     commentInstance.reflect.owner.id!,
  //   );
  //   const comments = await commentService.getAllComments();
  //   expect(postCommentAmount).toStrictEqual(1);
  //   expect(userCommentAmount).toStrictEqual(1);
  //   expect(comments?.length).toStrictEqual(1);
  //   await commentService.deleteComment(commentInstance.reflect.id);
  //   const updatedPostCommentAmount = await commentService.getPostCommentAmount(
  //     commentInstance.reflect.postId,
  //   );
  //   const updatedUserCommentAmount = await commentService.getUserCommentAmount(
  //     commentInstance.reflect.owner.id!,
  //   );
  //   const updatedComments = await commentService.getAllComments();
  //   expect(updatedPostCommentAmount).toStrictEqual(0);
  //   expect(updatedUserCommentAmount).toStrictEqual(0);
  //   expect(updatedComments?.length).toStrictEqual(0);
  // });

  // it("must be able delete all comments by postId", async () => {
  //   const firstCommentObj = factory.getComment({
  //     postId: postInstance.reflect.id!,
  //     owner: userInstance.reflect,
  //   });
  //   await commentService.createComment(firstCommentObj);
  //   await commentService.createComment(firstCommentObj);
  //   const post = factory.getPost();
  //   const newPost = {
  //     ...post,
  //     author: userInstance.reflect,
  //   };
  //   const newPostInstance = await postService.createPost(newPost);
  //   const secondCommentObj = factory.getComment({
  //     postId: newPostInstance.reflect.id,
  //     owner: userInstance.reflect,
  //   });
  //   await commentService.createComment(secondCommentObj);
  //   const comments = await commentService.getAllComments();
  //   expect(comments?.length).toStrictEqual(3);
  //   const commentsFromFirtsComments =
  //     await commentService.getCommentsByPostIdWithPagination({
  //       postId: postInstance.reflect.id!,
  //       skip: 0,
  //       pageSize: 100,
  //     });
  //   expect(commentsFromFirtsComments?.length).toStrictEqual(2);
  //   await commentService.deleteAllCommentsByPostId(postInstance.reflect.id!);
  //   const updatedComments = await commentService.getAllComments();
  //   expect(updatedComments!.length).toStrictEqual(1);
  // });
});
