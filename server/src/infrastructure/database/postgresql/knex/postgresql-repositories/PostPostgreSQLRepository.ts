import type { IPostRepository } from "@typings/post";
import { Post } from "@domain/src/post";
import { knex } from "../config";

export class PostPostgreSQLRepository implements IPostRepository {
  private static instance: PostPostgreSQLRepository;

  private constructor() {}

  private async replace(updatedPost: Post): Promise<Post> {
    const existingPost = await knex("posts")
      .where("id", updatedPost.reflect.id)
      .first();
    if (!existingPost) {
      throw new Error(`No post found with id: ${updatedPost.reflect.id}`);
    }
    await knex("posts")
      .where("id", updatedPost.reflect.id)
      .update({
        ...updatedPost.reflect,
        tags: JSON.stringify(updatedPost.reflect.tags) as any,
        author: JSON.stringify(updatedPost.reflect.author) as any,
      });
    return updatedPost;
  }

  public static getInstance(): PostPostgreSQLRepository {
    if (!PostPostgreSQLRepository.instance) {
      PostPostgreSQLRepository.instance = new PostPostgreSQLRepository();
    }
    return PostPostgreSQLRepository.instance;
  }

  public async create(post: Post): Promise<Post> {
    // jsonb does not accept undefined fields
    const cleanAuthor = Object.fromEntries(
      Object.entries(post.reflect.author).filter(
        ([key, value]) => value !== undefined
      )
    );
    try {
      return await knex.transaction(async (trx) => {
        const createdPost = await trx("posts")
          .insert({
            ...post.reflect,
            tags: JSON.stringify(post.reflect.tags) as any,
            author: JSON.stringify(cleanAuthor) as any,
          })
          .returning("*")
          .then((result) => result[0]);
        return new Post(createdPost);
      });
    } catch (error) {
      throw new Error(`Error creating post: ${error}`);
    }
  }

  public async update(updatedPost: Post): Promise<Post> {
    try {
      const post = await this.replace(updatedPost);
      return post;
    } catch (error) {
      throw new Error(`Error updating post: ${error}`);
    }
  }

  public async delete(postId: string): Promise<Post> {
    try {
      const post = await this.findById(postId);
      await knex("posts").where({ id: postId }).delete();
      return post;
    } catch (error) {
      throw new Error(`Error deleting post: ${error}`);
    }
  }

  public async deleteAll(): Promise<void> {
    try {
      await knex("posts").del();
    } catch (error) {
      throw new Error(`Error deleting all posts: ${error}`);
    }
  }

  public async findById(postId: string): Promise<Post | undefined> {
    try {
      const post = await knex("posts").where({ id: postId }).first();
      if (!post) {
        throw new Error(`No post found with id: ${postId}`);
      }
      return new Post(post);
    } catch (error) {
      throw new Error(`Error finding post by id: ${error}`);
    }
  }

  public async findBySlug(slug: string): Promise<Post | undefined> {
    try {
      const post = await knex("posts").where({ slug }).first();
      if (!post) {
        throw new Error(`No post found with slug: ${slug}`);
      }
      return new Post(post);
    } catch (error) {
      throw new Error(`Error finding post by slug: ${error}`);
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
      throw new Error(`Error finding posts by title: ${error}`);
    }
  }

  public async findAll(): Promise<Post[]> {
    try {
      const posts = await knex("posts");
      return posts.map((post) => new Post(post));
    } catch (error) {
      throw new Error(`Error finding all posts: ${error}`);
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
      throw new Error(`Error finding posts with pagination: ${error}`);
    }
  }

  public async findByIds(postIds: string[]): Promise<Post[]> {
    try {
      const posts = await knex("posts").whereIn("id", postIds);
      return posts.map((post) => new Post(post));
    } catch (error) {
      throw new Error(`Error finding posts by ids: ${error}`);
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
      } else {
        throw new Error(`Post not found for ID: ${postId}`);
      }
    } catch (error) {
      throw new Error(`Error finding post title by id: ${error}`);
    }
  }
}
