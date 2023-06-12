import { ICommentReflectObject } from "@/@typings/comment";
import { IFavoriteReflectObject } from "@/@typings/favorite";
import { IPostReflectObject } from "@/@typings/post";
import { IUserReflectObject } from "@/@typings/user";

export interface IObjectFactory {
  getUser: () => IUserReflectObject;
  getPost: () => IPostReflectObject;
  getComment: (data: {
    postId: string;
    postTitle?: string;
    owner?: IUserReflectObject;
    content?: string;
  }) => ICommentReflectObject;
  getFavorite: (data: {
    userId: string;
    postId: string;
  }) => IFavoriteReflectObject;
}

export function objectFactory(): IObjectFactory {
  const user: IUserReflectObject = {
    username: "johndoe",
    email: "johndoe@email.com",
    password: "pa$$word1",
  };

  const post: IPostReflectObject = {
    title: "Sample Post",
    body: "This is the content of the post.",
    tags: ["tag1", "tag2", "tag3"],
    coverImage: "https://example.com/cover-image.jpg",
    postedIn: new Date(),
    author: user,
  };

  const comment = (data: {
    postId: string;
    postTitle?: string;
    owner?: IUserReflectObject;
    content?: string;
  }): ICommentReflectObject => {
    return {
      postId: data.postId,
      postTitle: data.postTitle ?? "Fake title",
      owner: data.owner ?? user,
      content: data.content ?? "Great post! I really enjoyed reading it.",
      postedAt: new Date(),
    };
  };

  const favorite = (data: {
    userId: string;
    postId: string;
  }): IFavoriteReflectObject => {
    return {
      userId: data.userId,
      postId: data.postId,
    };
  };

  return {
    getUser: () => {
      return user;
    },
    getPost: () => {
      return post;
    },
    getComment: (data: {
      postId: string;
      postTitle?: string;
      owner?: IUserReflectObject;
      content?: string;
    }) => {
      return comment({
        postId: data.postId,
        postTitle: data.postTitle,
        owner: data?.owner,
        content: data?.content,
      });
    },
    getFavorite: (data: { userId: string; postId: string }) => {
      return favorite({ userId: data.userId, postId: data.postId });
    },
  };
}
