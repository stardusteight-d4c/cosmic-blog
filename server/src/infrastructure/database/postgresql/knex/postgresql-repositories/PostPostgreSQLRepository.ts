import type { AuthorMetadata, IPostRepository } from "@typings/post";
import { Post } from "@domain/aggregates/post";
import { knex } from "../config";

export class PostPostgreSQLRepository implements IPostRepository {
  private static instance: PostPostgreSQLRepository;

  private constructor() {}

  private deletingAuthorUndefinedFields(
    author: AuthorMetadata
  ): AuthorMetadata {
    return Object.fromEntries(
      Object.entries(author).filter(([_, value]) => value !== undefined)
    ) as AuthorMetadata;
  }

  private async replace(updatedPost: Post): Promise<Post> {
    const copyUpdate = updatedPost.reflect;
    delete copyUpdate.author;
    delete copyUpdate.postedAt;
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
    return knex.transaction(async (trx) => {
      const author = this.deletingAuthorUndefinedFields(post.reflect.author);
      return trx("posts")
        .insert({
          ...post.reflect,
          postedAt: new Date(post.reflect.postedAt),
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
    return this.replace(updatedPost)
      .then((post) => post)
      .catch((err) => {
        throw new Error(`error updating post: ${err}`);
      });
  }

  public async delete(postId: string): Promise<void> {
    await knex("posts")
      .where({ id: postId })
      .delete()
      .catch((err) => {
        throw new Error(`error deleting post: ${err}`);
      });
  }

  public async deleteAll(): Promise<void> {
    await knex("posts")
      .del()
      .catch((err) => {
        throw new Error(`error deleting all posts: ${err}`);
      });
  }

  public async findById(postId: string): Promise<Post | undefined> {
    return knex("posts")
      .where({ id: postId })
      .first()
      .then((post) => new Post(post))
      .catch((err) => {
        throw new Error(`error finding post by id: ${err}`);
      });
  }

  public async findBySlug(slug: string): Promise<Post | undefined> {
    return knex("posts")
      .where({ slug })
      .first()
      .then((post) => (post ? new Post(post) : undefined))
      .catch((err) => {
        throw new Error(`error finding post by slug: ${err}`);
      });
  }

  public async findManyByTitle(postTitle: string): Promise<Post[]> {
    return knex("posts")
      .whereRaw("LOWER(title) LIKE ?", `%${postTitle.toLowerCase()}%`)
      .limit(6)
      .then((posts) => posts.map((post) => new Post(post)))
      .catch((err) => {
        throw new Error(`error finding posts by title: ${err}`);
      });
  }

  public async findAll(): Promise<Post[]> {
    return knex("posts")
      .then((posts) => posts.map((post) => new Post(post)))
      .catch((err) => {
        throw new Error(`error finding all posts: ${err}`);
      });
  }

  public async findWithPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    return knex("posts")
      .limit(request.pageSize)
      .offset(request.skip)
      .orderBy("created_at", "desc")
      .then((posts) => posts.map((post) => new Post(post)))
      .catch((err) => {
        throw new Error(`error finding posts with pagination: ${err}`);
      });
  }

  public async findByIds(postIds: string[]): Promise<Post[]> {
    return knex("posts")
      .whereIn("id", postIds)
      .orderByRaw(`position(id::text in '${postIds.join(",")}')`)
      .then((posts) => posts.map((post) => new Post(post)))
      .catch((err) => {
        throw new Error(`error finding posts by ids: ${err}`);
      });
  }

  public async findPostTitleById(postId: string): Promise<string> {
    return knex("posts")
      .select("title")
      .where({ id: postId })
      .first()
      .then((post) => (post ? post.title : undefined))
      .catch((err) => {
        throw new Error(`error finding post title by id: ${err}`);
      });
  }

  public async findPostsByTag(request: {
    tag: string;
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    return knex("posts")
      .distinct("posts.*")
      .innerJoin(
        knex.raw("jsonb_array_elements_text(posts.tags) AS tag"),
        knex.raw("lower(tag) like lower(?)", `%${request.tag}%`)
      )
      .orderBy("created_at", "desc")
      .offset(request.skip)
      .limit(request.pageSize)
      .then((posts) => posts.map((post) => new Post(post)))
      .catch((err) => {
        throw new Error(`error finding posts by tag: ${err}`);
      });
  }
}
