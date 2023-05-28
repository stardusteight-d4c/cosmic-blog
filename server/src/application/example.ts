import { CreateSessionTokenAdapter } from "./adapters/create-session-token";
import { MyJWT } from "./helpers";
import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@app/@in-memory-repositories";
import { objectFactory } from "@domain/@utils/objectFactory";
import { ApplicationUseCases } from "./ApplicationUseCases";

async function main() {
  const postInMemoryRepository = PostInMemoryRepository.getInstance();
  const userInMemoryRepository = UserInMemoryRepository.getInstance();
  const commentInMemoryRepository = CommentInMemoryRepository.getInstance();
  const favoriteInMemoryRepository = FavoriteInMemoryRepository.getInstance();
  const factory = objectFactory();

  const app = new ApplicationUseCases({
    userRepository: userInMemoryRepository,
    postRepository: postInMemoryRepository,
    commentRepository: commentInMemoryRepository,
    favoriteRepository: favoriteInMemoryRepository,
  });

  // Initialize Application
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
