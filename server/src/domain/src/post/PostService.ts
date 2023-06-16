import type {
  IPostReflectObject,
  IPostRepository,
  IPostService,
} from "@typings/post";
import { Post, postBuilderFactory } from ".";
import { DeletePostCommand } from "./PostCommands";
import { ServiceHandlers } from "./helpers";

export class PostService implements IPostService {
  #postRepository: IPostRepository;
  #publisher: IPublisher;

  constructor(implementations: {
    postRepository: IPostRepository;
    publisher: IPublisher;
  }) {
    this.#postRepository = implementations.postRepository;
    this.#publisher = implementations.publisher;
  }

  public async createPost(post: IPostReflectObject): Promise<Post> {
    await ServiceHandlers.findUserIdOrThrowError({
      id: post.author.id,
      publisher: this.#publisher,
    });
    const postInstance = postBuilderFactory({ post });
    await ServiceHandlers.findSlugAndThrowError({
      postRepository: this.#postRepository,
      slug: postInstance.reflect.slug,
    });
    return this.#postRepository.create(postInstance).then((post) => post);
  }

  public async updatePost(post: IPostReflectObject): Promise<Post> {
    const existingPost = await ServiceHandlers.findPostIdOrThrowError({
      postRepository: this.#postRepository,
      id: post.id,
    });
    return this.#postRepository
      .update(new Post(post), existingPost)
      .then((post) => post);
  }

  public async deletePost(id: string): Promise<void> {
    await this.#postRepository.delete(id);
    const deletePostCommand = new DeletePostCommand(id);
    await this.#publisher.publish({ command: deletePostCommand });
  }

  public async getPostById(id: string): Promise<Post | undefined> {
    return this.#postRepository.findById(id).then((post) => post);
  }

  public async getPostBySlug(slug: string): Promise<Post | undefined> {
    return this.#postRepository.findBySlug(slug).then((post) => post);
  }

  public async getPostsByTitle(title: string): Promise<Post[]> {
    return this.#postRepository.findManyByTitle(title, 6).then((post) => post);
  }

  public async getPosts(): Promise<Post[]> {
    return this.#postRepository.findAll().then((post) => post);
  }

  public async getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    return await this.#postRepository.findWithPagination({
      skip,
      pageSize,
    });
  }

  public async getUserFavoritePostsByPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { userId, skip, pageSize } = request;
    return ServiceHandlers.getAllUserFavoritedPosts({
      postRepository: this.#postRepository,
      publisher: this.#publisher,
      userId,
    }).then((favoritedPosts) =>
      favoritedPosts.slice(Number(skip), Number(skip) + Number(pageSize))
    );
  }
}
