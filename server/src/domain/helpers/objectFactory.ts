import { ICommentReflectObject, OwnerMetadata } from "@typings/comment";
import { IFavoriteReflectObject } from "@typings/favorite";
import { AuthorMetadata, IPostReflectObject } from "@typings/post";
import { IUserReflectObject } from "@typings/user";

export interface IObjectFactory {
  getUser: (params?: IUserReflectObject) => IUserReflectObject;
  getPost: (params?: IPostReflectObject) => IPostReflectObject;
  getComment: (params?: ICommentReflectObject) => ICommentReflectObject;
  getFavorite: (params?: IFavoriteReflectObject) => IFavoriteReflectObject;
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
      id: params?.id && params.id,
      title: params?.title ?? "Sample Post",
      body: params?.body ?? "This is the content of the post.",
      tags: params?.tags ?? ["tag1", "tag2", "tag3"],
      coverImage: params?.coverImage ?? "https://example.com/cover-image.jpg",
      postedAt: params?.postedAt ?? new Date(),
      author:
        params?.author ??
        (user({
          id: "57efe66a-ec3a-4043-9db9-bc40ce5a6a01",
          userRole: "author",
        }) as AuthorMetadata),
    };
  };

  const comment = (params?: ICommentReflectObject): ICommentReflectObject => {
    return {
      id: params?.id && params.id,
      post: params?.post ?? {
        id: params?.post?.id
          ? params?.post?.id
          : "e8dfe910-a5b0-4b71-98e6-555506cfef1d",
        slug: "sample-post",
        title: "Sample Post",
      },
      owner:
        params?.owner ??
        (user({ id: "57efe66a-ec3a-4043-9db9-bc40ce5a6a01" }) as OwnerMetadata),
      content: params?.content ?? "Great post! I really enjoyed reading it.",
      postedAt: params?.postedAt ?? new Date(),
    };
  };

  const favorite = (
    params?: IFavoriteReflectObject
  ): IFavoriteReflectObject => {
    return {
      postId: params?.postId
        ? params?.postId
        : "e8dfe910-a5b0-4b71-98e6-555506cfef1d",
      userId: params?.userId
        ? params?.userId
        : "57efe66a-ec3a-4043-9db9-bc40ce5a6a01",
    };
  };

  return {
    getUser: (params?: IUserReflectObject) => {
      return user(params);
    },
    getPost: (params?: IPostReflectObject) => {
      return post(params);
    },
    getComment: (params?: ICommentReflectObject) => {
      return comment(params);
    },
    getFavorite: (params?: IFavoriteReflectObject) => {
      return favorite(params);
    },
  };
}
