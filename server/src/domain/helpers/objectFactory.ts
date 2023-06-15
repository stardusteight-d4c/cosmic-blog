import { ICommentReflectObject } from "@/@typings/comment";
import { IFavoriteReflectObject } from "@/@typings/favorite";
import { IPostReflectObject } from "@/@typings/post";
import { IUserReflectObject, TUserRole } from "@/@typings/user";

export interface IObjectFactory {
  getUser: (params?: IUserReflectObject) => IUserReflectObject;
  getPost: (params?: IPostReflectObject) => IPostReflectObject;
  // getComment: (data: {
  //   postId: string;
  //   postTitle?: string;
  //   owner?: IUserReflectObject;
  //   content?: string;
  // }) => ICommentReflectObject;
  // getFavorite: (data: {
  //   userId: string;
  //   postId: string;
  // }) => IFavoriteReflectObject;
}

export function objectFactory(): IObjectFactory {
  const user = (params?: IUserReflectObject): IUserReflectObject => {
    return {
      id: params?.id && params.id,
      username: params?.username ?? "link",
      email: params?.email ?? "email@email.com",
      password: params?.password ?? "password07",
      avatar: params?.avatar ?? "Favatar02",
      userRole: params?.userRole ?? "reader",
    };
  };

  const post = (params?: IPostReflectObject): IPostReflectObject => {
    return {
      title: params?.title ?? "Sample Post",
      body: params?.body ?? "This is the content of the post.",
      tags: params?.tags ?? ["tag1", "tag2", "tag3"],
      coverImage: params?.coverImage ?? "https://example.com/cover-image.jpg",
      postedAt: params?.postedAt ?? new Date(),
      author:
        params?.author ??
        user({
          id: "57efe66a-ec3a-4043-9db9-bc40ce5a6a01",
          userRole: "author",
        }),
    };
  };

  // const comment = (data: {
  //   postId: string;
  //   postTitle?: string;
  //   owner?: IUserReflectObject;
  //   content?: string;
  // }): ICommentReflectObject => {
  //   return {
  //     postId: data.postId,
  //     postTitle: data.postTitle ?? "Fake title",
  //     owner: data.owner ?? user,
  //     content: data.content ?? "Great post! I really enjoyed reading it.",
  //     postedAt: new Date(),
  //   };
  // };

  // const favorite = (data: {
  //   userId: string;
  //   postId: string;
  // }): IFavoriteReflectObject => {
  //   return {
  //     userId: data.userId,
  //     postId: data.postId,
  //   };
  // };

  return {
    getUser: (params?: IUserReflectObject) => {
      return user(params);
    },
    getPost: (params?: IPostReflectObject) => {
      return post(params);
    },
    // getComment: (data: {
    //   postId: string;
    //   postTitle?: string;
    //   owner?: IUserReflectObject;
    //   content?: string;
    // }) => {
    //   return comment({
    //     postId: data.postId,
    //     postTitle: data.postTitle,
    //     owner: data?.owner,
    //     content: data?.content,
    //   });
    // },
    // getFavorite: (data: { userId: string; postId: string }) => {
    //   return favorite({ userId: data.userId, postId: data.postId });
    // },
  };
}
