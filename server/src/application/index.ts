import {
  IPostReflectObject,
  IPostRepository,
  PostService,
} from "@/domain/post";
import {
  IUserReflectObject,
  IUserRepository,
  UserService,
} from "@/domain/user";
import { CreateSessionTokenAdapter } from "./adapters/create-session-token";
import { MyJWT } from "./helpers";
import { UserUseCases } from "./use-cases/UserUseCases";
import { PostUseCases } from "./use-cases/PostUseCases";
import {
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@/domain/@in-memory-repositories";
import { objectFactory } from "@/domain/@utils/objectFactory";

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
    const userService = new UserService({
      userRepository: this.userRepository,
    });
    const postService = new PostService({
      postRepository: this.postRepository,
    });
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
  const userInMemoryRepository = UserInMemoryRepository.getInstance();
  const postInMemoryRepository = PostInMemoryRepository.getInstance();
  const factory = objectFactory();

  const app = new UseCasesApplication(
    userInMemoryRepository,
    postInMemoryRepository,
  );

  // Initialize Application
  app.initialization();
  const userUseCases = app.getUserUsesCases();
  const postUseCases = app.getPostUsesCases();

  const user = factory.getUser();
  const post = factory.getPost();
  const jwt = new MyJWT();
  const createSessionTokenAdapter = new CreateSessionTokenAdapter(jwt);
  const { user: userInstance, sessionToken } = await userUseCases.register({
    user,
    createSessionTokenAdapter,
  });
  const newPost = {
    ...post,
    author: userInstance.reflect,
  };
  const postInstance = await postUseCases.create(newPost);

  console.log("user", userInstance.reflect);
  console.log("sessionToken", sessionToken);
  console.log(postInstance.reflect);
  console.log(userInstance.reflect);
}

main();
