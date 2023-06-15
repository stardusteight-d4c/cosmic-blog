import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { objectFactory } from "@domain/helpers/objectFactory";
import { IPostRepository, IPostService } from "@typings/post";
import { IUserRepository, IUserService } from "@typings/user";
import { IFavoriteRepository, IFavoriteService } from "@typings/favorite";
import { ICommentRepository, ICommentService } from "@typings/comment";
import { initializeInMemoryServices } from "../helpers/initializeServices";
import { Post } from "../Post";
import { err } from "../helpers/errors";

interface IRepositories {
  post: IPostRepository;
  user: IUserRepository;
  comment: ICommentRepository;
  favorite: IFavoriteRepository;
}

interface IServices {
  post: IPostService;
  user: IUserService;
  comment: ICommentService;
  favorite: IFavoriteService;
}

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
      },
    });
    expect(await services.post.createPost(post)).toBeInstanceOf(Post);
  });

  it("must be not able to create a post if the author id not exists in user repository", async () => {
    const user = factory.getUser();
    const post = factory.getPost({
      author: {
        ...user,
        userRole: "author",
      },
    });
    await expect(services.post.createPost(post)).rejects.toThrowError(
      err.userNotFoundWithId(undefined)
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
    ).rejects.toThrowError(err.postNotFoundWithId(undefined));
  });

  it("must be able to update a post partially", async () => {
    const user = factory.getUser();
    const userInstance = await services.user.createUser(user);
    const post = factory.getPost({
      author: {
        ...user,
        id: userInstance.reflect.id,
        userRole: "author",
      },
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
  });

  // it("must be able to find a post by id", async () => {
  //   const findPost = await postService.getPostById(postInstance.reflect.id!);
  //   expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
  //   expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
  // });

  // // it("must be able to find a post by title", async () => {
  // //   const findPost = await postService.getPostsByTitle(
  // //     postInstance.reflect.title!,
  // //   );
  // //   expect(findPost!.reflect.id).toStrictEqual(postInstance.reflect.id);
  // //   expect(findPost!.reflect).toStrictEqual(postInstance.reflect);
  // // });

  // it("must be able to get all created posts", async () => {
  //   await postService.createPost(newPost);
  //   const posts = await postService.getPosts();
  //   expect(posts.length).toStrictEqual(2);
  // });

  // it("must be able to get posts by pagination", async () => {
  //   for (let i = 0; i < 6; i++) {
  //     await postService.createPost(newPost);
  //   }
  //   const skip = 3;
  //   const pageSize = 3;
  //   const allPosts = await postService.getPosts();
  //   const filteredPosts = allPosts.slice(skip, skip + pageSize);
  //   const posts = await postService.getPostsByPagination({
  //     skip,
  //     pageSize,
  //   });
  //   const postsIds = posts.map((post) => post.reflect.id);
  //   const filteredPostsIds = filteredPosts.map((post) => post.reflect.id);
  //   expect(posts).toStrictEqual(filteredPosts);
  //   expect(postsIds).toStrictEqual(filteredPostsIds);
  //   expect(postsIds[1]).toStrictEqual(filteredPostsIds[1]);
  // });

  // // delete post with FavoriteObserver and CommentObserver
  // it("must be able delete a post", async () => {
  //   const postInstanceId = postInstance.reflect.id!;
  //   const userInstanceId = userInstance.reflect.id!;
  //   const allPosts = await postService.getPosts();
  //   const favorite = factory.getFavorite({
  //     userId: userInstanceId,
  //     postId: postInstanceId,
  //   });
  //   await favoriteService.toggleFavoritePost(favorite);
  //   const postFavoriteAmount = await favoriteService.getPostFavoriteAmount(
  //     postInstanceId,
  //   );
  //   const userFavorites = await favoriteService.getUserFavoriteAmount(
  //     userInstanceId,
  //   );
  //   const commentObj = factory.getComment({
  //     postId: postInstanceId,
  //     owner: userInstance.reflect,
  //   });
  //   await commentService.createComment(commentObj);
  //   const postCommentAmount = await commentService.getPostCommentAmount(
  //     postInstanceId,
  //   );
  //   const userCommentAmount = await commentService.getUserCommentAmount(
  //     userInstance.reflect.id!,
  //   );
  //   expect(allPosts.length).toStrictEqual(1);
  //   expect(postFavoriteAmount).toStrictEqual(1);
  //   expect(userFavorites).toStrictEqual(1);
  //   expect(postCommentAmount).toStrictEqual(1);
  //   expect(userCommentAmount).toStrictEqual(1);
  //   await postService.deletePost(postInstance.reflect.id!);
  //   const updatedPosts = await postService.getPosts();
  //   const updatedPostFavoriteAmount =
  //     await favoriteService.getPostFavoriteAmount(postInstanceId);
  //   const updatedUserFavorites = await favoriteService.getUserFavoriteAmount(
  //     userInstanceId,
  //   );
  //   const updatedPostCommentAmount = await commentService.getPostCommentAmount(
  //     postInstanceId,
  //   );
  //   const updatedUserCommentAmount = await commentService.getUserCommentAmount(
  //     userInstance.reflect.id!,
  //   );
  //   expect(updatedPosts.length).toStrictEqual(0);
  //   expect(updatedPostFavoriteAmount).toStrictEqual(0);
  //   expect(updatedUserFavorites).toStrictEqual(0);
  //   expect(updatedPostCommentAmount).toStrictEqual(0);
  //   expect(updatedUserCommentAmount).toStrictEqual(0);
  // });
});
