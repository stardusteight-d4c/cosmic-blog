import {
  IPostReflectObject,
  IPostRepository,
  PostEventPublisher,
  PostEventObserver,
  PostService,
} from "@/domain/post";
import {
  IUserReflectObject,
  IUserRepository,
  UserEventObserver,
  UserEventPublisher,
  UserService,
} from "@/domain/user";
import { CreateSessionTokenAdapter } from "./adapters/create-session-token";
import { MyJWT } from "./helpers";
import { UserUseCases } from "./use-cases/UserUseCases";
import { PostUseCases } from "./use-cases/PostUseCases";
import { UserInMemoryRepository } from "./in-memory-repositories/UserInMemoryRepository";
import { PostInMemoryRepository } from "./in-memory-repositories/PostInMemoryRepository";

export interface Initialization {
  services: {
    userService: UserService;
    postService: PostService;
  };
}

export class UseCasesApplication {
  #userUseCases: UserUseCases;
  #postUseCases: PostUseCases;

  constructor(
    private userRepository: IUserRepository,
    private postRepository: IPostRepository,
  ) {}

  initialization() {
    const userPublisher = new UserEventPublisher();
    const postPublisher = new PostEventPublisher();
    const userService = new UserService({
      userPublisher: userPublisher,
      userRepository: this.userRepository,
      postRepository: this.postRepository,
    });
    const postService = new PostService({
      postPublisher: postPublisher,
      postRepository: this.postRepository,
      userRepository: this.userRepository,
    });
    postPublisher.register(new UserEventObserver(userService));
    postPublisher.register(new PostEventObserver(postService));
    const initialization: Initialization = {
      services: {
        userService,
        postService,
      },
    };
    this.#userUseCases = new UserUseCases(initialization.services.userService);
    this.#postUseCases = new PostUseCases(initialization.services.postService);
  }

  public getUserUsesCases(): UserUseCases {
    return this.#userUseCases;
  }

  public getPostUsesCases(): PostUseCases {
    return this.#postUseCases;
  }
}

async function main() {
  const userInMemoryRepository = new UserInMemoryRepository();
  const postInMemoryRepository = new PostInMemoryRepository();

  const app = new UseCasesApplication(
    userInMemoryRepository,
    postInMemoryRepository,
  );

  // Initialize Application
  app.initialization();

  // Create User
  const myUser: IUserReflectObject = {
    username: "johndoe8",
    email: "johndoe@example.com",
    password: "pa$$word1",
  };

  const jwt = new MyJWT();
  const createSessionTokenAdapter = new CreateSessionTokenAdapter(jwt);
  const { user, sessionToken } = await app
    .getUserUsesCases()
    .registerUser(myUser, createSessionTokenAdapter);
  console.log("user", user.reflect);
  console.log("sessionToken", sessionToken);

  // Create Post
  const postObject: IPostReflectObject = {
    title: "Título doaaa post!",
    body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
    tags: ["nodejs", "typescript", "ddd"],
    coverImage:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
    postedIn: new Date(),
    author: user.reflect,
  };

  const post = await app.getPostUsesCases().createPost(postObject);
  // console.log("post", post.reflect);

  await app
    .getPostUsesCases()
    .toggleFavoritePost({ userId: user.reflect.id!, postId: post.reflect.id! });

  console.log(
    await app
      .getPostUsesCases()
      .findPostById(post.reflect.id!)
      .then((data) => data?.reflect),
  );

  const updatedUser = await app
    .getUserUsesCases()
    .findUser({ option: "id", by: user.reflect.id! });

  console.log("updatedUser", updatedUser?.reflect);
}

main();
