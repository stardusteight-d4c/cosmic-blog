import {
  IUserReflectObject,
  UserEventObserver,
  UserEventPublisher,
  UserService,
} from "@/domain/user";
import {
  IPostReflectObject,
  PostEventObserver,
  PostEventPublisher,
  PostService,
} from "@/domain/post";
import { UserInMemoryRepository } from "./in-memory-repositories/UserInMemoryRepository";
import { PostInMemoryRepository } from "./in-memory-repositories/PostInMemoryRepository";
import { Comment, ICommentReflectObject } from "@/domain/comment";

const UserinMemoryRepository = new UserInMemoryRepository();
const PostinMemoryRepository = new PostInMemoryRepository();
const userPublisher = new UserEventPublisher();
const postPublisher = new PostEventPublisher();

const userService = new UserService({
  userPublisher: userPublisher,
  userRepository: UserinMemoryRepository,
  postRepository: PostinMemoryRepository,
});

const postService = new PostService({
  postPublisher: postPublisher,
  postRepository: PostinMemoryRepository,
  userRepository: UserinMemoryRepository,
});

postPublisher.register(new UserEventObserver(userService));
postPublisher.register(new PostEventObserver(postService));

const myUser: IUserReflectObject = {
  username: "johndoe8",
  email: "johndoe@example.com",
  password: "pa$$word1",
};

const asyncFunction = async () => {
  const userInstance = await userService.createUser(myUser);
  const userInstance2 = await userService.createUser(myUser);
  const postObject: IPostReflectObject = {
    title: "Título doaaa post!",
    body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
    tags: ["nodejs", "typescript", "ddd"],
    coverImage:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
    postedIn: new Date(),
    author: userInstance.reflect,
  };

  const postInstance = await postService.emitCreatePostEvent(postObject);

  postService.emitFavoritePostEvent(
    userInstance.reflect.id!,
    postInstance.reflect.id!,
  );

  const response2 = await postService.emitFavoritePostEvent(
    userInstance2.reflect.id!,
    postInstance.reflect.id!,
  );

  const updatedPostRequest: IPostReflectObject = {
    ...response2?.reflect!,
    body: "body atualizado!",
  };

  const updatedPostInstance = await postService.updatePost(updatedPostRequest);

  const commentObj: ICommentReflectObject = {
    owner: userInstance.reflect,
    content: "hehe post bem massa!",
    postedAt: new Date(),
  };
  const commentInstance = new Comment(commentObj);

  const comment = await postService.emitCommentPostEvent(
    commentInstance,
    updatedPostInstance.reflect.id!,
  );
};

asyncFunction();
