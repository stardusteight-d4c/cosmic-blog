import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { AuthorMetadata } from "@typings/post";
import type { OwnerMetadata, PostMetadata } from "@typings/comment";
import { objectFactory } from "@domain/helpers/objectFactory";
import {
  IRepositories,
  IServices,
  initializeInMemoryServices,
} from "@domain/helpers/initializeServices";
import { Comment } from "../Comment";
import { Post } from "../../post";
import { userErrors } from "../../user/helpers";
import { postErrors } from "../../post/helpers";

let repositories: IRepositories;
let services: IServices;
let postMetadata: PostMetadata;
let ownerMetadata: OwnerMetadata;
let postInstance: Post;
const factory = objectFactory();

describe("CommentService", () => {
  beforeEach(async () => {
    const data: { services: IServices; repositories: IRepositories } =
      initializeInMemoryServices();
    services = data.services;
    repositories = data.repositories;
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    const post = factory.getPost({
      author: {
        ...user,
        id: userInstance.reflect.id,
        userRole: "author",
      } as AuthorMetadata,
    });
    postInstance = await services.post.createPost(post);
    postMetadata = {
      id: postInstance.reflect.id,
      slug: postInstance.reflect.slug,
      title: postInstance.reflect.title,
    };
    ownerMetadata = {
      id: userInstance.reflect.id,
      username: userInstance.reflect.username,
      avatar: userInstance.reflect.avatar,
    };
  });
  afterEach(async () => {
    for (const repositoryKey in repositories) {
      if (repositories.hasOwnProperty(repositoryKey)) {
        const repository = repositories[repositoryKey];
        await repository.deleteAll();
      }
    }
  });

  it("must be able create a comment", async () => {
    const comment = factory.getComment({
      post: postMetadata,
      owner: ownerMetadata,
    });
    expect(await services.comment.createComment(comment)).toBeInstanceOf(
      Comment
    );
  });

  it("must throw an error when trying to create a comment without an existing owner id in the repository", async () => {
    const comment = factory.getComment({
      post: postMetadata,
    });
    await expect(services.comment.createComment(comment)).rejects.toThrowError(
      userErrors.userNotFoundWithId(comment.owner.id)
    );
  });

  it("must throw an error when trying to create a comment without an existing post id in the repository", async () => {
    const comment = factory.getComment({
      owner: ownerMetadata,
    });
    await expect(services.comment.createComment(comment)).rejects.toThrowError(
      postErrors.postNotFoundWithId(comment.post.id)
    );
  });

  it("must be able find a comment by ID", async () => {
    const comment = factory.getComment({
      post: postMetadata,
      owner: ownerMetadata,
    });
    const commentInstance = await services.comment.createComment(comment);
    const commentFound = await services.comment.getCommentById(
      commentInstance.reflect.id
    );
    expect(commentFound.reflect.id).toStrictEqual(commentInstance.reflect.id);
  });

  it("must be possible to update a comment partially", async () => {
    const comment = factory.getComment({
      post: postMetadata,
      owner: ownerMetadata,
    });
    const commentInstance = await services.comment.createComment(comment);
    const commentId = commentInstance.reflect.id;
    delete comment.owner;
    delete comment.post;
    const newContent = "New comment!";
    const updatedComment = await services.comment.updateComment({
      ...comment,
      id: commentId,
      content: newContent,
    });
    const finalCommentState = await services.comment.getCommentById(commentId);
    const initialState = commentInstance.reflect;
    const finalState = finalCommentState.reflect;
    expect(updatedComment.reflect.content).toStrictEqual(newContent);
    expect(updatedComment.reflect.id).toStrictEqual(commentInstance.reflect.id);
    expect(finalState["owner"]).toStrictEqual(initialState["owner"]);
    expect(finalState["post"]).toStrictEqual(initialState["post"]);
  });

  it("must be able to get the amount of comments of a post", async () => {
    const comment = factory.getComment({
      post: postMetadata,
      owner: ownerMetadata,
    });
    const postInstanceId = postInstance.reflect.id!;
    for (let i = 0; i < 6; i++) {
      await services.comment.createComment(comment);
    }
    const postCommentAmount = await services.comment.getPostCommentAmount(
      postInstanceId
    );
    expect(postCommentAmount).toStrictEqual(6);
  });

  it("must be able to acquire comments with pagination from a specific post", async () => {
    const comment = factory.getComment({
      post: postMetadata,
      owner: ownerMetadata,
    });
    const postInstanceId = postInstance.reflect.id!;
    for (let i = 0; i < 6; i++) {
      await services.comment.createComment(comment);
    }
    const skip = 3;
    const pageSize = 3;
    const paginatedComments =
      await services.comment.getCommentsByPostIdWithPagination({
        postId: postInstanceId,
        skip,
        pageSize,
      });
    expect(paginatedComments.length).toStrictEqual(3);
  });

  it("must be able to acquire comments with pagination from a specific user", async () => {
    const comment = factory.getComment({
      post: postMetadata,
      owner: ownerMetadata,
    });
    for (let i = 0; i < 6; i++) {
      await services.comment.createComment(comment);
    }
    const skip = 3;
    const pageSize = 3;
    const paginatedComments =
      await services.comment.getCommentsByUserIdWithPagination({
        userId: ownerMetadata.id,
        skip,
        pageSize,
      });
    expect(paginatedComments.length).toStrictEqual(3);
  });

  it("must be able delete a comment", async () => {
    const comment = factory.getComment({
      post: postMetadata,
      owner: ownerMetadata,
    });
    for (let i = 0; i < 6; i++) {
      await services.comment.createComment(comment);
    }
    const commentInstance = await services.comment.createComment(comment);
    expect(await services.comment.getAllComments()).toHaveLength(7);
    expect(await services.comment.getAllComments()).contain(commentInstance);
    await services.comment.deleteComment(commentInstance.reflect.id);
    expect(await services.comment.getAllComments()).toHaveLength(6);
    expect(await services.comment.getAllComments()).not.contain(
      commentInstance
    );
  });

  it("must be able delete all comments by postId", async () => {
    const comment = factory.getComment({
      post: postMetadata,
      owner: ownerMetadata,
    });
    for (let i = 0; i < 6; i++) {
      await services.comment.createComment(comment);
    }
    await services.comment.deleteAllCommentsByPostId(postInstance.reflect.id);
    expect(await services.comment.getAllComments()).toHaveLength(0);
  });
});
