import type { IPostReflectObject, IPostService } from "@typings/post";
import type {
  IEncryptPasswordAdapter,
  ISessionTokenAdapter,
  IUserTokenInfo,
} from "@app/adapters";
import type { IUserService } from "@typings/user";
import { User } from "@domain/aggregates/user";
import { UserUseCases } from "../use-cases/UserUseCases";

namespace Validators {
  export function isSameUser(request: {
    sessionTokenAdapter: ISessionTokenAdapter;
    authToken: string;
    userId: string;
  }): void {
    const { sessionTokenAdapter, authToken, userId } = request;
    const decoded = sessionTokenAdapter.verifySessionToken(authToken);
    if (decoded && decoded.user_id != userId) {
      throw new Error("authentication token does not match this user");
    }
  }

  export function isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  export async function requestedClientInformation(request: {
    service: IPostService;
    decoded: false | IUserTokenInfo;
    post: IPostReflectObject;
  }) {
    const { decoded, post, service } = request;
    let isAuthor = false;
    let isGuest = true;
    let isFavorited = false;
    const favoriteAmount = await service.getPostFavoriteAmount(post.id);
    const commentAmount = await service.getPostCommentAmount(post.id);
    if (decoded) {
      isAuthor = decoded.user_id === post.author.id;
      isGuest = false;
      isFavorited = await service.isPostFavoritedByUser({
        userId: decoded.user_id,
        postId: post.id,
      });
    }
    return { isAuthor, isGuest, isFavorited, favoriteAmount, commentAmount };
  }

  export async function buildGetUserResponse(
    user: User,
    service: IUserService
  ) {
    return {
      ...(user.reflect as IGetUserResponse),
      favoriteAmount: await service.getUserFavoriteAmount(user.reflect.id),
      commentAmount: await service.getUserCommentAmount(user.reflect.id),
    };
  }

  export async function getUserByIdentifier(
    identifier: string,
    userService: IUserService
  ) {
    let user: User;
    if (Validators.isEmail(identifier)) {
      user = await userService.getUserByEmail(identifier);
      if (!user) {
        throw new Error("email does not exist");
      }
    } else {
      user = await userService.getUserByUsername(identifier);
      if (!user) {
        throw new Error("username does not exist");
      }
    }
    return user;
  }

  export async function buildSigninResponse(request: {
    identifier: string;
    password: string;
    sessionTokenAdapter: ISessionTokenAdapter;
    encryptPasswordAdapter: IEncryptPasswordAdapter;
    service: IUserService;
  }) {
    const user = await Validators.getUserByIdentifier(
      request.identifier,
      request.service
    );
    const isValidPassword = await request.encryptPasswordAdapter.compare({
      plainPassword: request.password,
      hashedPassword: user.reflect.password,
    });
    if (!isValidPassword) {
      throw new Error("invalid password");
    }
    const sessionToken = request.sessionTokenAdapter.createSessionToken({
      user_id: user.reflect.id!,
      email: user.reflect.email,
      username: user.reflect.username,
      avatarId: user.reflect.avatar,
      type: user.reflect.userRole,
    });
    return {
      user: user,
      sessionToken,
    };
  }

  export function getSessionData(
    userInstance: User,
    sessionTokenAdapter: ISessionTokenAdapter
  ) {
    const copyInstance = userInstance.reflect;
    delete copyInstance.password;
    const sessionToken = sessionTokenAdapter.createSessionToken({
      user_id: userInstance.reflect.id!,
      email: userInstance.reflect.email,
      type: userInstance.reflect.userRole,
      username: userInstance.reflect.username,
      avatarId: userInstance.reflect.avatar,
    });
    delete copyInstance.password;
    return { user: copyInstance as IGetUserResponse, sessionToken };
  }
}

export default Validators;
