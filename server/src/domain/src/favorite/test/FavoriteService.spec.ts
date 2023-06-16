import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { AuthorMetadata } from "@typings/post";
import { objectFactory } from "@domain/helpers/objectFactory";
import { initializeInMemoryServices } from "@domain/helpers";
import { IRepositories, IServices } from "@domain/helpers/initializeServices";
import { Post } from "@domain/src/post";
import { User } from "../../user";
import { favoriteErrors } from "../helpers";
import { postErrors } from "../../post/helpers";
import { userErrors } from "../../user/helpers";

let repositories: IRepositories;
let services: IServices;
let userInstance: User;
let postInstance: Post;
const factory = objectFactory();

describe("FavoriteService", () => {
  beforeEach(async () => {
    const data: { services: IServices; repositories: IRepositories } =
      initializeInMemoryServices();
    services = data.services;
    repositories = data.repositories;
    const user = factory.getUser();
    userInstance = await services.user.createUser(user);
    const post = factory.getPost({
      author: {
        ...user,
        id: userInstance.reflect.id,
        userRole: "author",
      } as AuthorMetadata,
    });
    postInstance = await services.post.createPost(post);
  });
  afterEach(async () => {
    for (const repositoryKey in repositories) {
      if (repositories.hasOwnProperty(repositoryKey)) {
        const repository = repositories[repositoryKey];
        await repository.deleteAll();
      }
    }
  });

  it("must be able to favorite a post", async () => {
    const favorite = factory.getFavorite({
      postId: postInstance.reflect.id,
      userId: userInstance.reflect.id,
    });
    await services.favorite.toggleFavoritePost(favorite);
    const postFavorites = await services.favorite.getAllFavoritesByPostId(
      postInstance.reflect.id
    );
    expect(postFavorites).toHaveLength(1);
  });

  it("must be able to remove favorite from a post", async () => {
    const favorite = factory.getFavorite({
      postId: postInstance.reflect.id,
      userId: userInstance.reflect.id,
    });
    await services.favorite.toggleFavoritePost(favorite);
    expect(
      await services.favorite.getAllFavoritesByPostId(postInstance.reflect.id)
    ).toHaveLength(1);
    await services.favorite.toggleFavoritePost(favorite);
    expect(
      await services.favorite.getAllFavoritesByPostId(postInstance.reflect.id)
    ).toHaveLength(0);
  });

  it("must be able to throw an error if postId does not exist in the repository", async () => {
    const favorite = factory.getFavorite({
      postId: "e8dfe910-a5b0-4b71-98e6-555506cfef1d-123",
      userId: userInstance.reflect.id,
    });
    await expect(
      services.favorite.toggleFavoritePost(favorite)
    ).rejects.toThrowError(postErrors.postNotFoundWithId(favorite.postId));
  });

  it("must be able to throw an error if userId does not exist in the repository", async () => {
    const favorite = factory.getFavorite({
      postId: postInstance.reflect.id,
      userId: "e8dfe910-a5b0-4b71-98e6-555506cfef1d-123",
    });
    await expect(
      services.favorite.toggleFavoritePost(favorite)
    ).rejects.toThrowError(userErrors.userNotFoundWithId(favorite.userId));
  });

  it("must be able to get the amount of favorites of a post", async () => {
    for (let i = 0; i < 6; i++) {
      const user = factory.getUser({
        email: `myemail${i}@email.com`,
        username: `2${i}pilots`,
      });
      userInstance = await services.user.createUser(user);
      const favorite = factory.getFavorite({
        postId: postInstance.reflect.id,
        userId: userInstance.reflect.id,
      });
      await services.favorite.toggleFavoritePost(favorite);
    }
    expect(
      await services.favorite.getAllFavoritesByPostId(postInstance.reflect.id)
    ).toHaveLength(6);
  });

  it("must be able to get the amount of favorite posts by a user", async () => {
    for (let i = 0; i < 6; i++) {
      const user = factory.getUser({
        email: `myemail${i}@email.com`,
        username: `2${i}pilots`,
      });
      userInstance = await services.user.createUser(user);
      const favorite = factory.getFavorite({
        postId: postInstance.reflect.id,
        userId: userInstance.reflect.id,
      });
      await services.favorite.toggleFavoritePost(favorite);
    }
    expect(
      await services.favorite.getAllFavoritesByUserId(userInstance.reflect.id)
    ).toHaveLength(1);
  });

  it("must be able delete all favorites by postId", async () => {
    for (let i = 0; i < 6; i++) {
      const user = factory.getUser({
        email: `myemail${i}@email.com`,
        username: `2${i}pilots`,
      });
      userInstance = await services.user.createUser(user);
      const favorite = factory.getFavorite({
        postId: postInstance.reflect.id,
        userId: userInstance.reflect.id,
      });
      await services.favorite.toggleFavoritePost(favorite);
    }
    await services.favorite.deleteAllFavoritesByPostId(postInstance.reflect.id);
    expect(
      await services.favorite.getAllFavoritesByPostId(postInstance.reflect.id)
    ).toHaveLength(0);
  });

  it("must be able delete all favorites by userId", async () => {
    for (let i = 0; i < 6; i++) {
      const user = factory.getUser()
      const post = factory.getPost({
        title: `title${i}`,
        author: {
          ...user,
          id: userInstance.reflect.id,
          userRole: "author",
        } as AuthorMetadata,
      });
      postInstance = await services.post.createPost(post);
      const favorite = factory.getFavorite({
        postId: postInstance.reflect.id,
        userId: userInstance.reflect.id,
      });
      await services.favorite.toggleFavoritePost(favorite);
    }
    expect(
      await services.favorite.getAllFavoritesByUserId(userInstance.reflect.id)
    ).toHaveLength(6);
    await services.favorite.deleteAllFavoritesByUserId(userInstance.reflect.id);
    expect(
      await services.favorite.getAllFavoritesByUserId(userInstance.reflect.id)
    ).toHaveLength(0);
  });
});
