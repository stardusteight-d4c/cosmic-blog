import type { AuthorMetadata, IPostRepository } from "@typings/post";
import { Post } from "@domain/src/post";
import { knex } from "../config";

export class PostPostgreSQLRepository implements IPostRepository {
  private static instance: PostPostgreSQLRepository;

  private constructor() {}

  private deletingAuthorUndefinedFields(
    author: AuthorMetadata
  ): AuthorMetadata {
    return Object.fromEntries(
      Object.entries(author).filter(([key, value]) => value !== undefined)
    ) as AuthorMetadata;
  }

  private async replace(updatedPost: Post): Promise<Post> {
    const copyUpdate = updatedPost.reflect
    delete copyUpdate.author
    delete copyUpdate.postedAt
    await knex("posts")
      .where("id", updatedPost.reflect.id)
      .update({
        ...copyUpdate,
        tags: JSON.stringify(copyUpdate.tags) as any,
      })
      .catch((err) => console.error(err));
    return updatedPost;
  }

  public static getInstance(): PostPostgreSQLRepository {
    if (!PostPostgreSQLRepository.instance) {
      PostPostgreSQLRepository.instance = new PostPostgreSQLRepository();
    }
    return PostPostgreSQLRepository.instance;
  }

  public async create(post: Post): Promise<Post> {
    const author = this.deletingAuthorUndefinedFields(post.reflect.author);
    return knex.transaction(async (trx) => {
      return await trx("posts")
        .insert({
          ...post.reflect,
          tags: JSON.stringify(post.reflect.tags) as unknown as string[],
          author: JSON.stringify(author) as unknown as AuthorMetadata,
        })
        .returning("*")
        .then(([createdPost]) => new Post(createdPost))
        .catch((err) => {
          throw new Error(`error creating post: ${err}`);
        });
    });
  }

  public async update(updatedPost: Post): Promise<Post> {
    return await this.replace(updatedPost)
      .then((post) => post)
      .catch((err) => {
        throw new Error(`error updating post: ${err}`);
      });
  }

  public async delete(postId: string): Promise<Post> {
    try {
      const post = await this.findById(postId);
      await knex("posts").where({ id: postId }).delete();
      return post;
    } catch (error) {
      throw new Error(`error deleting post: ${error}`);
    }
  }

  public async deleteAll(): Promise<void> {
    try {
      await knex("posts").del();
    } catch (error) {
      throw new Error(`error deleting all posts: ${error}`);
    }
  }

  public async findById(postId: string): Promise<Post | undefined> {
    try {
      const post = await knex("posts").where({ id: postId }).first();
      if (post) {
        return new Post(post);
      }
      return undefined;
    } catch (error) {
      throw new Error(`error finding post by id: ${error}`);
    }
  }

  public async findBySlug(slug: string): Promise<Post | undefined> {
    try {
      const post = await knex("posts").where({ slug }).first();
      if (post) {
        return new Post(post);
      }
      return undefined;
    } catch (error) {
      throw new Error(`error finding post by slug: ${error}`);
    }
  }

  public async findManyByTitle(postTitle: string): Promise<Post[]> {
    try {
      const normalizedPostTitle = postTitle.toLowerCase();
      const posts = await knex("posts")
        .whereRaw("LOWER(title) LIKE ?", `%${normalizedPostTitle}%`)
        .limit(6);
      return posts.map((post) => new Post(post));
    } catch (error) {
      throw new Error(`error finding posts by title: ${error}`);
    }
  }

  public async findAll(): Promise<Post[]> {
    try {
      const posts = await knex("posts");
      return posts.map((post) => new Post(post));
    } catch (error) {
      throw new Error(`error finding all posts: ${error}`);
    }
  }

  public async findWithPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    try {
      const { skip, pageSize } = request;
      const posts = await knex("posts")
        .orderBy("postedAt", "desc")
        .limit(pageSize)
        .offset(skip);
      return posts.map((post) => new Post(post));
    } catch (error) {
      throw new Error(`error finding posts with pagination: ${error}`);
    }
  }

  public async findByIds(postIds: string[]): Promise<Post[]> {
    try {
      const posts = await knex("posts").whereIn("id", postIds);
      return posts.map((post) => new Post(post));
    } catch (error) {
      throw new Error(`error finding posts by ids: ${error}`);
    }
  }

  public async findPostTitleById(postId: string): Promise<string> {
    try {
      const post = await knex("posts")
        .select("title")
        .where({ id: postId })
        .first();
      if (post) {
        return post.title;
      }
    } catch (error) {
      throw new Error(`error finding post title by id: ${error}`);
    }
  }
}
