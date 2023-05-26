import {
  Post,
  IPostReflectObject,
  IPostRepository,
  IPostService,
  postBuilderFactory,
} from ".";
import Validators from "@/domain/@utils/validators";
import { IEventPublisher } from "../@interfaces";

export class PostService implements IPostService {
  #postRepository: IPostRepository;
  #publisher?: IEventPublisher;

  constructor(implementations: {
    postRepository: IPostRepository;
    publisher?: IEventPublisher;
  }) {
    this.#postRepository = implementations.postRepository;
    if (implementations.publisher) {
      this.#publisher = implementations.publisher;
    }
  }

  public async createPost(post: IPostReflectObject): Promise<Post> {
    const newPost = postBuilderFactory({ post });
    const postInstance = await this.#postRepository.create(newPost);
    return postInstance;
  }

  public async updatePost(post: IPostReflectObject): Promise<Post> {
    const updatedPost = postBuilderFactory({ post });
    const updatedPostInstance = await this.#postRepository.update(updatedPost);
    return updatedPostInstance;
  }

  public async findPostById(postId: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    const post = await this.#postRepository.findById(postId);
    return post;
  }

  public async findPostByTitle(postTitle: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postTitle, type: "string" });
    const post = await this.#postRepository.findByTitle(postTitle);
    return post;
  }

  public async getPosts(): Promise<Post[]> {
    const posts = await this.#postRepository.get();
    return posts;
  }

  public async getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    const posts = await this.#postRepository.getByPagination({
      skip,
      pageSize,
    });
    return posts;
  }
}
