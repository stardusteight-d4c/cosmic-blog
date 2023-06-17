import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { AuthorMetadata } from "@typings/post";
import type { OwnerMetadata } from "@typings/comment";
import {
  initializeInMemoryServices,
  type IRepositories,
  type IServices,
} from "@domain/helpers/initializeServices";
import { objectFactory } from "@domain/helpers/objectFactory";
import { postErrors } from "../helpers";
import { Post } from "../Post";
import { userErrors } from "../../user/helpers";

let repositories: IRepositories;
let services: IServices;
const factory = objectFactory();

describe("PostService", () => {
  beforeEach(async () => {
    const data: { services: IServices; repositories: IRepositories } =
      initializeInMemoryServices();
    services = data.services;
    repositories = data.repositories;
  });

  afterEach(async () => {
    for (const repositoryKey in repositories) {
      if (repositories.hasOwnProperty(repositoryKey)) {
        const repository = repositories[repositoryKey];
        await repository.deleteAll();
      }
    }
  });

  it("must be able to create a post", async () => {
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    const post = factory.getPost({
      author: {
        ...user,
        id: userInstance.reflect.id,
        userRole: "author",
      } as AuthorMetadata,
    });
    expect(await services.post.createPost(post)).toBeInstanceOf(Post);
  });

  it("must be not able to create a post with the same slug", async () => {
    repositories.post.deleteAll();
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    const post = factory.getPost({
      author: {
        ...user,
        id: userInstance.reflect.id,
        userRole: "author",
      } as AuthorMetadata,
    });
    const postInstance = await services.post.createPost(post);
    await expect(services.post.createPost(post)).rejects.toThrowError(
      postErrors.slugAlreadyExists(postInstance.reflect.slug)
    );
  });

  it("must be not able to create a post if the author id not exists in user repository", async () => {
    const user = factory.getUser();
    const post = factory.getPost({
      author: {
        ...user,
        id: "57efe66a-ec3a-4043-9db9-bc40ce5a6a01",
        userRole: "author",
      } as AuthorMetadata,
    });
    await expect(services.post.createPost(post)).rejects.toThrowError(
      userErrors.userNotFoundWithId("57efe66a-ec3a-4043-9db9-bc40ce5a6a01")
    );
  });

  it("must be mandatory to use the id when updating a post", async () => {
    const post = factory.getPost();
    const newTitle = "Domain-driven Design";
    await expect(
      services.post.updatePost({
        ...post,
        title: newTitle,
      })
    ).rejects.toThrowError(postErrors.postNotFoundWithId(undefined));
  });

  it("must be able to update a post partially", async () => {
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    const post = factory.getPost({
      author: {
        ...user,
        id: userInstance.reflect.id,
        userRole: "author",
      } as AuthorMetadata,
    });
    const postInstance = await services.post.createPost(post);
    const postId = postInstance.reflect.id;
    const newTitle = "Domain-driven Design";
    delete post.body;
    delete post.author;
    delete post.tags;
    delete post.coverImage;
    delete post.postedAt;
    delete post.lastChange;
    const updatedPost = await services.post.updatePost({
      ...post,
      id: postInstance.reflect.id,
      title: newTitle,
    });
    delete post.slug;
    delete post.title;
    const newUpdatedPost = await services.post.updatePost({
      ...post,
      id: postId,
    });
    const finalPostState = await services.post.getPostById(postId);
    const initialState = postInstance.reflect;
    const finalState = finalPostState.reflect;
    expect(updatedPost.reflect.title).toStrictEqual(newTitle);
    expect(updatedPost.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(finalState["body"]).toStrictEqual(initialState["body"]);
    expect(finalState["author"]).toStrictEqual(initialState["author"]);
    expect(finalState["tags"]).toStrictEqual(initialState["tags"]);
    expect(finalState["coverImage"]).toStrictEqual(initialState["coverImage"]);
    expect(finalState["postedAt"]).toStrictEqual(initialState["postedAt"]);
    expect(finalState["lastChange"]).toStrictEqual(initialState["lastChange"]);
    expect(newUpdatedPost.reflect["title"]).toStrictEqual(finalState["title"]);
    expect(newUpdatedPost.reflect["slug"]).toStrictEqual(finalState["slug"]);
    expect(newUpdatedPost.reflect["slug"]).not.toBeUndefined();
  });

  it("must be able to find a post by id", async () => {
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    const post = factory.getPost({
      author: {
        ...user,
        id: userInstance.reflect.id,
        userRole: "author",
      } as AuthorMetadata,
    });
    const postInstance = await services.post.createPost(post);
    const postFound = await services.post.getPostById(postInstance.reflect.id);
    expect(postFound.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(postFound.reflect).toStrictEqual(postInstance.reflect);
  });

  it("must be return undefined if looking for a post whose id does not exist in the repository", async () => {
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    const post = factory.getPost({
      author: {
        ...user,
        id: userInstance.reflect.id,
        userRole: "author",
      } as AuthorMetadata,
    });
    const postInstance = await services.post.createPost(post);
    const postFound = await services.post.getPostById(
      `${postInstance.reflect.id}-78a`
    );
    expect(postFound).toBeUndefined();
  });

  it("must be able to find a post by slug", async () => {
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    const post = factory.getPost({
      author: {
        ...user,
        id: userInstance.reflect.id,
        userRole: "author",
      } as AuthorMetadata,
    });
    const postInstance = await services.post.createPost(post);
    const postFound = await services.post.getPostBySlug(
      postInstance.reflect.slug
    );
    expect(postFound.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(postFound.reflect).toStrictEqual(postInstance.reflect);
  });

  it("must be able to find many posts by title", async () => {
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    for (let i = 0; i < 3; i++) {
      const post = factory.getPost({
        title: `Title${i}`,
        author: {
          ...user,
          id: userInstance.reflect.id,
          userRole: "author",
        } as AuthorMetadata,
      });
      await services.post.createPost(post);
    }
    expect(await services.post.getPostsByTitle("title")).toHaveLength(3);
  });

  it("must be able to get all created posts", async () => {
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    for (let i = 0; i < 2; i++) {
      const post = factory.getPost({
        title: `Title${i}`,
        author: {
          ...user,
          id: userInstance.reflect.id,
          userRole: "author",
        } as AuthorMetadata,
      });
      await services.post.createPost(post);
    }
    expect(await services.post.getPosts()).toHaveLength(2);
  });

  it("must be able to get posts by pagination", async () => {
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    for (let i = 1; i < 7; i++) {
      const post = factory.getPost({
        title: `Title${i}`,
        postedAt: new Date(`2023-06-1${i}T00:36:54.579Z`),
        author: {
          ...user,
          id: userInstance.reflect.id,
          userRole: "author",
        } as AuthorMetadata,
      });
      await services.post.createPost(post);
    }
    const skip = 3;
    const pageSize = 3;
    const paginatedPosts = await services.post.getPostsByPagination({
      skip,
      pageSize,
    });
    const allPosts = await services.post.getPosts();
    expect(paginatedPosts).toHaveLength(3);
    expect(paginatedPosts).toStrictEqual(allPosts.slice(skip, pageSize + skip));
  });

  it("must be able delete a post", async () => {
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    const post = factory.getPost({
      author: {
        ...user,
        id: userInstance.reflect.id,
        userRole: "author",
      } as AuthorMetadata,
    });
    const postInstance = await services.post.createPost(post);
    const favorite = factory.getFavorite({
      postId: postInstance.reflect.id,
      userId: userInstance.reflect.id,
    });
    await services.favorite.toggleFavoritePost(favorite);
    const postFavoriteAmount = await services.favorite.getPostFavoriteAmount(
      postInstance.reflect.id
    );
    const userFavorites = await services.favorite.getUserFavoriteAmount(
      userInstance.reflect.id
    );
    const comment = factory.getComment({
      post: {
        id: postInstance.reflect.id!,
        slug: postInstance.reflect.slug!,
        title: postInstance.reflect.title!,
      },
      owner: userInstance.reflect as OwnerMetadata,
    });
    await services.comment.createComment(comment);
    const postCommentAmount = await services.comment.getPostCommentAmount(
      postInstance.reflect.id
    );
    const userCommentAmount = await services.comment.getUserCommentAmount(
      userInstance.reflect.id
    );
    const allPosts = await services.post.getPosts();
    expect(allPosts.length).toStrictEqual(1);
    expect(postFavoriteAmount).toStrictEqual(1);
    expect(userFavorites).toStrictEqual(1);
    expect(postCommentAmount).toStrictEqual(1);
    expect(userCommentAmount).toStrictEqual(1);
    await services.post.deletePost(postInstance.reflect.id);
    const updatedPosts = await services.post.getPosts();
    const updatedPostFavoriteAmount =
      await services.favorite.getPostFavoriteAmount(postInstance.reflect.id);
    const updatedUserFavorites = await services.favorite.getUserFavoriteAmount(
      userInstance.reflect.id
    );
    const updatedPostCommentAmount =
      await services.comment.getPostCommentAmount(postInstance.reflect.id);
    const updatedUserCommentAmount =
      await services.comment.getUserCommentAmount(userInstance.reflect.id!);
    expect(updatedPosts.length).toStrictEqual(0);
    expect(updatedPostFavoriteAmount).toStrictEqual(0);
    expect(updatedUserFavorites).toStrictEqual(0);
    expect(updatedPostCommentAmount).toStrictEqual(0);
    expect(updatedUserCommentAmount).toStrictEqual(0);
  });
});
