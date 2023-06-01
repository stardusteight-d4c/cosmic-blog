import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@app/@in-memory-repositories";
import { objectFactory } from "@domain/@utils/objectFactory";
import { ApplicationUseCases } from "./ApplicationUseCases";
import { SessionTokenAdapter } from "./adapters/SessionTokenAdapter";
import { MyPluginJWT } from "./@utils/MyPluginJWT";
import { MyPluginSendMail } from "./@utils/MyPluginSendMail";
import { SendMailAdapter } from "./adapters/SendMailAdapter";

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
  const jwtPlugin = new MyPluginJWT();
  const sessionTokenAdapter = new SessionTokenAdapter(jwtPlugin);
  const sendMailPlugin = new MyPluginSendMail();
  const sendMailAdapter = new SendMailAdapter(sendMailPlugin);
  await userUseCases.verifyEmail({ email: "meu@email.com", sendMailAdapter });
  const { user: userInstance, sessionToken } = await userUseCases.register({
    user,
    sessionTokenAdapter,
  });
  const newPost = {
    ...post,
    author: userInstance.reflect,
  };
  const postInstance = await postUseCases.create(newPost);

  console.log("user", userInstance.reflect);
  console.log("sessionToken", sessionToken);
  console.log(
    "decodedToken",
    sessionTokenAdapter.verifySessionToken(sessionToken),
  );
  console.log(postInstance.reflect);
  console.log(userInstance.reflect);
}

main();
