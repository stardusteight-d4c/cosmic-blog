import {
  IPostReflectObject,
  IPostRepository,
  PostInMemoryRepository,
  PostPublisher,
  PostService,
} from "@/domain/post";
import PostObserver from "@/domain/post/PostObserver";
import {
  IUserReflectObject,
  IUserRepository,
  UserInMemoryRepository,
  UserObserver,
  UserPublisher,
  UserService,
} from "@/domain/user";
import CreateSessionTokenAdapter from "./adapters/create-session-token";
import MyJWT from "./helpers";
import UserUsesCases from "./use-cases/UserUsesCases";
import PostUsesCases from "./use-cases/PostUsesCases";

export interface Initialization {
  services: {
    userService: UserService;
    postService: PostService;
  };
}

export class UseCasesApplication {
  #userUsesCases: UserUsesCases;
  #postUsesCases: PostUsesCases;

  constructor(
    private userRepository: IUserRepository,
    private postRepository: IPostRepository,
  ) {}

  initialization() {
    const userPublisher = new UserPublisher();
    const postPublisher = new PostPublisher();
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
    postPublisher.register(new UserObserver(userService));
    postPublisher.register(new PostObserver(postService));
    const initialization: Initialization = {
      services: {
        userService,
        postService,
      },
    };
    this.#userUsesCases = new UserUsesCases(
      initialization.services.userService,
    );
    this.#postUsesCases = new PostUsesCases(
      initialization.services.postService,
    );
  }

  public getUserUsesCases(): UserUsesCases {
    return this.#userUsesCases;
  }

  public getPostUsesCases(): PostUsesCases {
    return this.#postUsesCases;
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
  const { user } = await app
    .getUserUsesCases()
    .registerUser(myUser, createSessionTokenAdapter);
  console.log("user", user.reflect);


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
  console.log("post", post.reflect);
}

main();
