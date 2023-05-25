import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { User, UserEventObserver, UserService } from "@domain/user";
import { IPostReflectObject, IPostRepository } from "../@interfaces";
import { Post, PostService, PostEventObserver } from "..";
import { IObjectFactory, objectFactory } from "@domain/@utils/objectFactory";
import { EventPublisher } from "@domain/@utils/EventPublisher";
import {
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@domain/@in-memory-repositories";
import { FavoriteService, IFavoriteRepository } from "@/domain/favorite";

let postService: PostService;
let userService: UserService;
let favoriteService: FavoriteService;
let newPost: IPostReflectObject;
let userInstance: User;
let postInstance: Post;
let factory: IObjectFactory;
let postInMemoryRepository: IPostRepository;
let favoriteInMemoryRepository: IFavoriteRepository;

describe("PostService", () => {
  beforeEach(async () => {
    const userInMemoryRepository = new UserInMemoryRepository();
    postInMemoryRepository = PostInMemoryRepository.getInstance();
    favoriteInMemoryRepository = FavoriteInMemoryRepository.getInstance();
    const eventPublisher = new EventPublisher();
    postService = new PostService({
      publisher: eventPublisher,
      postRepository: postInMemoryRepository,
      favoriteRepository: favoriteInMemoryRepository,
    });
    userService = new UserService({
      userPublisher: eventPublisher,
      userRepository: userInMemoryRepository,
      postRepository: postInMemoryRepository,
    });
    favoriteService = new FavoriteService({
      favoriteRepository: favoriteInMemoryRepository,
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
    const updatedPostFavoriteAmount = await postService
      .findPostById(postInstanceId)
      .then((post) => post?.reflect.favoriteAmount);

    expect(updatedPostFavoriteAmount).toStrictEqual(1);
    // favorites user tbm deve estar atualizado
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
