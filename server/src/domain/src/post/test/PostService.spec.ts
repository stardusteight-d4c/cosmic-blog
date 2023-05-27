import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  IUserRepository,
  IUserService,
  User,
  UserService,
} from "@domain/src/user";
import {
  IPostReflectObject,
  IPostRepository,
  IPostService,
} from "../@interfaces";
import { Post, PostService } from "..";
import { IObjectFactory, objectFactory } from "@domain/@utils/objectFactory";
import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@domain/@in-memory-repositories";
import { Publisher } from "@/domain/@utils/Publisher";
import {
  FavoriteObserver,
  FavoriteService,
  IFavoriteService,
} from "@domain/src/favorite";
import {
  CommentObserver,
  CommentService,
  ICommentService,
} from "@domain/src/comment";

let postService: IPostService;
let userService: IUserService;
let favoriteService: IFavoriteService;
let commentService: ICommentService;
let newPost: IPostReflectObject;
let userInstance: User;
let postInstance: Post;
let factory: IObjectFactory;
let postInMemoryRepository: IPostRepository;
let userInMemoryRepository: IUserRepository;

describe("PostService", () => {
  beforeEach(async () => {
    userInMemoryRepository = UserInMemoryRepository.getInstance();
    postInMemoryRepository = PostInMemoryRepository.getInstance();
    const favoriteRepository = FavoriteInMemoryRepository.getInstance();
    const commentRepository = CommentInMemoryRepository.getInstance();
    const publisher = new Publisher();
    favoriteService = new FavoriteService({ favoriteRepository });
    commentService = new CommentService({ commentRepository });
    publisher.register(new FavoriteObserver(favoriteService));
    publisher.register(new CommentObserver(commentService));
    postService = new PostService({
      postRepository: postInMemoryRepository,
      publisher: publisher,
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
  });

  it("must be able to create a post", async () => {
    await userService.getUserById(userInstance.reflect.id!);
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
    const findPost = await postService.getPostById(postInstance.reflect.id!);
    expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
  });

  it("must be able to find a post by title", async () => {
    const findPost = await postService.getPostByTitle(
      postInstance.reflect.title!,
    );
    expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
    expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
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

  // delete post with FavoriteObserver and CommentObserver
  it("must be able delete a post", async () => {
    const postInstanceId = postInstance.reflect.id!;
    const userInstanceId = userInstance.reflect.id!;
    const allPosts = await postService.getPosts();
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
    const commentObj = factory.getComment({
      postId: postInstanceId,
      owner: userInstance.reflect,
    });
    await commentService.createComment(commentObj);
    const postCommentAmount = await commentService.getPostCommentAmount(
      postInstanceId,
    );
    const userCommentAmount = await commentService.getUserCommentAmount(
      userInstance.reflect.id!,
    );
    expect(allPosts.length).toStrictEqual(1);
    expect(postFavoriteAmount).toStrictEqual(1);
    expect(userFavorites).toStrictEqual(1);
    expect(postCommentAmount).toStrictEqual(1);
    expect(userCommentAmount).toStrictEqual(1);
    await postService.deletePost(postInstance.reflect.id!);
    const updatedPosts = await postService.getPosts();
    const updatedPostFavoriteAmount =
      await favoriteService.getPostFavoriteAmount(postInstanceId);
    const updatedUserFavorites = await favoriteService.getUserFavoriteAmount(
      userInstanceId,
    );
    const updatedPostCommentAmount = await commentService.getPostCommentAmount(
      postInstanceId,
    );
    const updatedUserCommentAmount = await commentService.getUserCommentAmount(
      userInstance.reflect.id!,
    );
    expect(updatedPosts.length).toStrictEqual(0);
    expect(updatedPostFavoriteAmount).toStrictEqual(0);
    expect(updatedUserFavorites).toStrictEqual(0);
    expect(updatedPostCommentAmount).toStrictEqual(0);
    expect(updatedUserCommentAmount).toStrictEqual(0);
  });
});
