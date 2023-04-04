import {
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
import { RegisterUser } from "./use-cases/register-user-use-case";

export interface Initialization {
  services: {
    userService: UserService;
    postService: PostService;
  };
}

export class UserUseCasesApplication {
  #registerUserUseCase: RegisterUser;
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
    this.#registerUserUseCase = new RegisterUser(
      initialization.services.userService,
    );
  }

  public getRegisterUserUseCase(): RegisterUser {
    return this.#registerUserUseCase;
  }
}

const userInMemoryRepository = new UserInMemoryRepository();
const postInMemoryRepository = new PostInMemoryRepository();

const userApp = new UserUseCasesApplication(
  userInMemoryRepository,
  postInMemoryRepository,
);

userApp.initialization();

const myUser: IUserReflectObject = {
  username: "johndoe8",
  email: "johndoe@example.com",
  password: "pa$$word1",
};

userApp
  .getRegisterUserUseCase()
  .execute(myUser)
  .then((data) => console.log(data.reflect));




