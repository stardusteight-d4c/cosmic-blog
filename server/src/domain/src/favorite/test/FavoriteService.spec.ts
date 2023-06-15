import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { IObjectFactory, objectFactory } from "@/domain/helpers/objectFactory";
import {
  User,
  UserService,
} from "@domain/src/user";
import {
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@app/@in-memory-repositories";
import {
  Post,
  PostService,
} from "@domain/src/post";
import { IFavoriteRepository, IFavoriteService } from "@/@typings/favorite";
import { IUserRepository, IUserService } from "@/@typings/user";
import { IPostReflectObject, IPostRepository, IPostService } from "@/@typings/post";
import { FavoriteService } from "../FavoriteService";

let favoriteService: IFavoriteService;
let userService: IUserService;
let postService: IPostService;
let newPost: IPostReflectObject;
let userInstance: User;
let postInstance: Post;
let factory: IObjectFactory;
let postRepository: IPostRepository;
let favoriteRepository: IFavoriteRepository;
let userRepository: IUserRepository;

describe("FavoriteService", () => {
  beforeEach(async () => {
    userRepository = UserInMemoryRepository.getInstance();
    postRepository = PostInMemoryRepository.getInstance();
    favoriteRepository = FavoriteInMemoryRepository.getInstance();
    postService = new PostService({
      favoriteRepository,
      postRepository,
      userRepository,
    });
    userService = new UserService({
      userRepository,
    });
    favoriteService = new FavoriteService({
      favoriteRepository,
      postRepository,
      userRepository,
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
    await postRepository.deleteAll();
    await favoriteRepository.deleteAll();
    await userRepository.deleteAll();
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
    const user = factory.getUser();
    const post = factory.getPost();
    const secondUserInstance = await userService.createUser({
      ...user,
      email: "newemail@email.com",
      username: "newusername",
    });
    const newPost = {
      ...post,
      author: secondUserInstance.reflect,
    };
    const thirdPostInstance = await postService.createPost(newPost);
    const firstFavorite = factory.getFavorite({
      userId: userInstanceId,
      postId: postInstanceId,
    });
    const secondFavorite = factory.getFavorite({
      userId: secondUserInstance.reflect.id,
      postId: postInstanceId,
    });
    const thirdFavorite = factory.getFavorite({
      userId: userInstanceId,
      postId: thirdPostInstance.reflect.id,
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
