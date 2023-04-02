import { PostBuilder } from "../builders/PostBuilder";
import {
  IPostReflectObject,
  IPostRepository,
  IPostService,
  Post,
} from "../entities/Post";
import { User } from "../entities/User";

export default class PostService implements IPostService {
  #postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.#postRepository = postRepository;
  }

  public async createPost(post: IPostReflectObject): Promise<Post> {
    const newPost = new PostBuilder()
      .setTitle(post.title)
      .setBody(post.body)
      .setTags(post.tags)
      .setCoverImage(post.coverImage)
      .setPostedIn(post.postedIn)
      .setAuthor(new User(post.author))
      .build();
    const postInstance = await this.#postRepository.createPost(newPost);
    return postInstance;
  }
}
