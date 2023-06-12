import { IPostRepository, Post } from "@/domain/src/post";
import { knex } from "../config";

export class PostPostgreSQLRepository implements IPostRepository {
  private static instance: PostPostgreSQLRepository;

  private constructor() { }

  public static getInstance(): PostPostgreSQLRepository {
    if (!PostPostgreSQLRepository.instance) {
      PostPostgreSQLRepository.instance = new PostPostgreSQLRepository();
    }
    return PostPostgreSQLRepository.instance;
  }

  async create(post: Post): Promise<Post> {
    return await knex.transaction(async (trx) => {
      const createdPost = await trx('posts')
        .insert(post.reflect)
        .returning('*')
        .then((result) => result[0]);
      return new Post(createdPost)
    });
  }

  update(updatedPost: Post): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  delete(postId: string): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  deleteAll(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(postId: string): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  findManyByTitle(postTitle: string): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  findWithPagination(request: { skip: number; pageSize: number; }): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  findByIds(postIds: string[]): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  findPostTitleById(postId: string): Promise<string> {
    throw new Error("Method not implemented.");
  }





}
