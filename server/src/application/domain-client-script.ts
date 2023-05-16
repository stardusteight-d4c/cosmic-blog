import {
  UserPublisher,
  IUserReflectObject,
  UserObserver,
  UserService,
} from "@/domain/user";
import { IPostReflectObject, PostPublisher, PostService } from "@/domain/post";
import PostObserver from "@/domain/post/PostObserver";
import UserInMemoryRepository from "./in-memory-repositories/UserInMemoryRepository";
import PostInMemoryRepository from "./in-memory-repositories/PostInMemoryRepository";

const UserinMemoryRepository = new UserInMemoryRepository();
const PostinMemoryRepository = new PostInMemoryRepository();
const userPublisher = new UserPublisher();
const postPublisher = new PostPublisher();

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

postPublisher.register(new UserObserver(userService));
postPublisher.register(new PostObserver(postService));

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

  const postInstance = await postService.createPost(postObject);

  postService.publishFavoritePostCommand(
    userInstance.reflect.id!,
    postInstance.reflect.id!,
  );

  const response2 = await postService.publishFavoritePostCommand(
    userInstance2.reflect.id!,
    postInstance.reflect.id!,
  );

const updatedPostRequest: IPostReflectObject = {
  ...response2?.reflect!,
  body: 'body atualizado!'
} 

 const updatedPostInstance = await postService.updatePost(updatedPostRequest)
 

  console.log(response2?.reflect);
  console.log('updatedPostInstance', updatedPostInstance.reflect);
  

  // console.log(
  //   await userService.findUserById(userInstance.reflect.id!).then((data) => data?.reflect)
  // )
};

asyncFunction();
