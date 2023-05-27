import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { IObjectFactory, objectFactory } from "@domain/@utils/objectFactory";
import {
  IUserRepository,
  IUserService,
  User,
  UserService,
} from "@domain/src/user";
import {
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@domain/@in-memory-repositories";
import {
  FavoriteService,
  IFavoriteRepository,
  IFavoriteService,
} from "@domain/src/favorite";
import {
  IPostReflectObject,
  IPostRepository,
  IPostService,
  Post,
  PostService,
} from "@domain/src/post";

let favoriteService: IFavoriteService;
let userService: IUserService;
let postService: IPostService;
let newPost: IPostReflectObject;
let userInstance: User;
let postInstance: Post;
let factory: IObjectFactory;
let postInMemoryRepository: IPostRepository;
let favoriteInMemoryRepository: IFavoriteRepository;
let userInMemoryRepository: IUserRepository;

describe("PostService", () => {
  beforeEach(async () => {
    userInMemoryRepository = UserInMemoryRepository.getInstance();
    postInMemoryRepository = PostInMemoryRepository.getInstance();
    favoriteInMemoryRepository = FavoriteInMemoryRepository.getInstance();
    postService = new PostService({
      postRepository: postInMemoryRepository,
    });
    userService = new UserService({
      userRepository: userInMemoryRepository,
    });
    favoriteService = new FavoriteService({
      favoriteRepository: favoriteInMemoryRepository,
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
    await favoriteInMemoryRepository.deleteAll();
    await userInMemoryRepository.deleteAll();
  });

  it("must be able to favorite a post", async () => {
    const postInstanceId = postInstance.reflect.id!;
    const userInstanceId = userInstance.reflect.id!;
    const favorite = factory.getFavorite({
      userId: userInstanceId,
      postId: postInstanceId,
    });
    await favoriteService.toggleFavoritePost(favorite);
    const postFavoriteAmount = await favoriteService.getPostFavoriteAmount(
      postInstanceId,
    );
    const userFavorites = await favoriteService.getUserFavoriteAmount(
      userInstanceId,
    );
    expect(postFavoriteAmount).toStrictEqual(1);
    expect(userFavorites).toStrictEqual(1);
    await favoriteService.toggleFavoritePost(favorite);
    const updatedPostFavoriteAmount =
      await favoriteService.getPostFavoriteAmount(postInstanceId);
    const updatedUserFavorites = await favoriteService.getUserFavoriteAmount(
      userInstanceId,
    );
    expect(updatedPostFavoriteAmount).toStrictEqual(0);
    expect(updatedUserFavorites).toStrictEqual(0);
  });

  it("must be able delete all favorites by postId", async () => {
    const postInstanceId = postInstance.reflect.id!;
    const userInstanceId = userInstance.reflect.id!;
    const firstFavorite = factory.getFavorite({
      userId: userInstanceId,
      postId: postInstanceId,
    });
    const secondFavorite = factory.getFavorite({
      userId: "another-user",
      postId: postInstanceId,
    });
    const thirdFavorite = factory.getFavorite({
      userId: userInstanceId,
      postId: "another-post",
    });
    await favoriteService.toggleFavoritePost(firstFavorite);
    await favoriteService.toggleFavoritePost(secondFavorite);
    await favoriteService.toggleFavoritePost(thirdFavorite);
    const favoritesFromPost = await favoriteService.getAllFavoritesByPostId(
      postInstanceId,
    );
    expect(favoritesFromPost.length).toStrictEqual(2);
    await favoriteService.deleteAllFavoritesByPostId(postInstanceId);
    const updatedFavoritesFromPost =
      await favoriteService.getAllFavoritesByPostId(postInstanceId);
    expect(updatedFavoritesFromPost.length).toStrictEqual(0);
  });
});
