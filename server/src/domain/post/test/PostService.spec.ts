import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  IUserRepository,
  IUserService,
  User,
  UserEventObserver,
  UserService,
} from "@domain/user";
import {
  IPostReflectObject,
  IPostRepository,
  IPostService,
} from "../@interfaces";
import { Post, PostService, PostEventObserver } from "..";
import { IObjectFactory, objectFactory } from "@domain/@utils/objectFactory";
import { EventPublisher } from "@domain/@utils/EventPublisher";
import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@domain/@in-memory-repositories";
import {
  FavoriteService,
  IFavoriteRepository,
  IFavoriteService,
} from "@/domain/favorite";
import {
  CommentService,
  ICommentRepository,
  ICommentService,
} from "@/domain/comment";

let postService: IPostService;
let userService: IUserService;
let favoriteService: IFavoriteService;
let commentService: ICommentService;
let newPost: IPostReflectObject;
let userInstance: User;
let postInstance: Post;
let factory: IObjectFactory;
let postInMemoryRepository: IPostRepository;
let favoriteInMemoryRepository: IFavoriteRepository;
let userInMemoryRepository: IUserRepository;
let commentInMemoryRepository: ICommentRepository;

describe("PostService", () => {
  beforeEach(async () => {
    userInMemoryRepository = UserInMemoryRepository.getInstance();
    postInMemoryRepository = PostInMemoryRepository.getInstance();
    favoriteInMemoryRepository = FavoriteInMemoryRepository.getInstance();
    commentInMemoryRepository = CommentInMemoryRepository.getInstance();
    const eventPublisher = new EventPublisher();
    postService = new PostService({
      postRepository: postInMemoryRepository,
      publisher: eventPublisher,
    });
    userService = new UserService({
      userRepository: userInMemoryRepository,
      favoriteRepository: favoriteInMemoryRepository,
    });
    favoriteService = new FavoriteService({
      favoriteRepository: favoriteInMemoryRepository,
    });
    commentService = new CommentService({
      commentPublisher: eventPublisher,
      commentRepository: commentInMemoryRepository,
      postRepository: postInMemoryRepository,
      userRepository: userInMemoryRepository,
    });
    eventPublisher.register(new PostEventObserver(postService));
    eventPublisher.register(new UserEventObserver(userService));
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

  it("must be able to create a post", async () => {
    await userService.findUserById(userInstance.reflect.id!);
    expect(postInstance).toBeInstanceOf(Post);
  });

  it("must be able to update a post", async () => {
    const updatedPostRequest: IPostReflectObject = {
      ...postInstance.reflect,
      body: "Updating body...",
    };
    const updatedPostInstance = await postService.updatePost(
      updatedPostRequest,
    );
    expect(updatedPostInstance.reflect.body).toStrictEqual("Updating body...");
  });

  it("must be able to find a post by id", async () => {
    const findPost = await postService.findPostById(postInstance.reflect.id!);
    expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
  });

  it("must be able to find a post by title", async () => {
    const findPost = await postService.findPostByTitle(
      postInstance.reflect.title!,
    );
    expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
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
    const userFavorites = await favoriteService.getUserFavorites(
      userInstanceId,
    );
    expect(postFavoriteAmount).toStrictEqual(1);
    expect(userFavorites).toStrictEqual(1);
    await favoriteService.toggleFavoritePost(favorite);
    const updatedPostFavoriteAmount =
      await favoriteService.getPostFavoriteAmount(postInstanceId);
    const updatedUserFavorites = await favoriteService.getUserFavorites(
      userInstanceId,
    );
    expect(updatedPostFavoriteAmount).toStrictEqual(0);
    expect(updatedUserFavorites).toStrictEqual(0);
  });

  it("must be able to get all created posts", async () => {
    await postService.createPost(newPost);
    const posts = await postService.getPosts();
    expect(posts.length).toStrictEqual(2);
  });

  it("must be able to get posts by pagination", async () => {
    for (let i = 0; i < 6; i++) {
      await postService.createPost(newPost);
    }
    const skip = 3;
    const pageSize = 3;
    const allPosts = await postService.getPosts();
    const filteredPosts = allPosts.slice(skip, skip + pageSize);
    const posts = await postService.getPostsByPagination({
      skip,
      pageSize,
    });
    const postsIds = posts.map((post) => post.reflect.id);
    const filteredPostsIds = filteredPosts.map((post) => post.reflect.id);
    expect(posts).toStrictEqual(filteredPosts);
    expect(postsIds).toStrictEqual(filteredPostsIds);
    expect(postsIds[1]).toStrictEqual(filteredPostsIds[1]);
  });
});
