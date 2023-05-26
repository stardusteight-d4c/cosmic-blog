import {
  Post,
  IPostReflectObject,
  IPostRepository,
  IPostService,
  postBuilderFactory,
} from ".";
import Validators from "@/domain/@utils/validators";
import { IPublisher } from "../@interfaces";
import DeletePostCommand from "./PostCommands";

export class PostService implements IPostService {
  #postRepository: IPostRepository;
  #publisher?: IPublisher;

  constructor(implementations: {
    postRepository: IPostRepository;
    publisher?: IPublisher;
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

  public async deletePost(postId: string): Promise<void> {
    await this.#postRepository.delete(postId);
    if (this.#publisher) {
      const deletePostCommand = new DeletePostCommand(postId);
      await this.#publisher.emit(deletePostCommand);
    }
  }

  public async getPostById(postId: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    const post = await this.#postRepository.findById(postId);
    return post;
  }

  public async getPostByTitle(postTitle: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postTitle, type: "string" });
    const post = await this.#postRepository.findByTitle(postTitle);
    return post;
  }

  public async getPosts(): Promise<Post[]> {
    const posts = await this.#postRepository.findAll();
    return posts;
  }

  public async getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    const posts = await this.#postRepository.findWithPagination({
      skip,
      pageSize,
    });
    return posts;
  }
}
