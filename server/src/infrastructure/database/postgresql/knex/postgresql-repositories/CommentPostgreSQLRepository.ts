import type { ICommentRepository } from "@typings/comment";
import { Comment } from "@domain/aggregates/comment";
import { knex } from "../config";

export class CommentPostgreSQLRepository implements ICommentRepository {
  private static instance: CommentPostgreSQLRepository;

  private constructor() {}

  private async replace(updatedComment: Comment): Promise<Comment> {
    return knex("comments")
      .where("id", updatedComment.reflect.id)
      .update(updatedComment.reflect)
      .then(() => updatedComment)
      .catch((err) => {
        throw new Error(`error replacing comment: ${err}`);
      });
  }

  public static getInstance(): CommentPostgreSQLRepository {
    if (!CommentPostgreSQLRepository.instance) {
      CommentPostgreSQLRepository.instance = new CommentPostgreSQLRepository();
    }
    return CommentPostgreSQLRepository.instance;
  }

  public async create(comment: Comment): Promise<Comment> {
    return knex("comments")
      .insert(comment.reflect)
      .returning("*")
      .then(([createdComment]) => new Comment(createdComment))
      .catch((err) => {
        throw new Error(`error creating comment: ${err}`);
      });
  }

  public async update(updatedComment: Comment): Promise<Comment> {
    return this.replace(updatedComment)
      .then((updatedComment) => updatedComment)
      .catch((err) => {
        throw new Error(`error updating comment: ${err}`);
      });
  }

  public async delete(commentId: string): Promise<void> {
    await knex("comments")
      .where({ id: commentId })
      .delete()
      .catch((err) => {
        throw new Error(`error deleting comment: ${err}`);
      });
  }

  public async deleteAll(): Promise<void> {
    await knex("comments")
      .delete()
      .catch((err) => {
        throw new Error(`error deleting all comments: ${err}`);
      });
  }

  public async deleteAllByPostId(postId: string): Promise<void> {
    await knex("comments")
      .whereRaw("post->>'id' = ?", [postId])
      .delete()
      .catch((err) => {
        throw new Error(`error deleting comments by post id: ${err}`);
      });
  }

  public async deleteAllByUserId(userId: string): Promise<void> {
    await knex("comments")
      .whereRaw("owner->>'id' = ?", [userId])
      .delete()
      .catch((err) => {
        throw new Error(`error deleting comments by user id: ${err}`);
      });
  }

  public async findAll(): Promise<Comment[]> {
    return knex("comments")
      .select("*")
      .then((comments) => comments.map((comment) => new Comment(comment)))
      .catch((err) => {
        throw new Error(`error finding all comments: ${err}`);
      });
  }

  public async findById(commentId: string): Promise<Comment> {
    return knex("comments")
      .where({ id: commentId })
      .first()
      .then((comment) => new Comment(comment))
      .catch((err) => {
        throw new Error(`error finding comment by id: ${err}`);
      });
  }

  public async findAllByPostId(postId: string): Promise<Comment[]> {
    return knex("comments")
      .whereRaw("post->>'id' = ?", [postId])
      .select("*")
      .then((comments) => comments.map((comment) => new Comment(comment)))
      .catch((err) => {
        throw new Error(`error finding comments by post id: ${err}`);
      });
  }

  public async findAllByUserId(userId: string): Promise<Comment[]> {
    return knex("comments")
      .whereRaw("owner->>'id' = ?", [userId])
      .select("*")
      .then((comments) => comments.map((comment) => new Comment(comment)))
      .catch((err) => {
        throw new Error(`error finding comments by user id: ${err}`);
      });
  }

  public async findByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    return knex("comments")
      .whereRaw("post->>'id' = ?", [request.postId])
      .orderBy("created_at", "desc")
      .offset(request.skip)
      .limit(request.pageSize)
      .select("*")
      .then((comments) => comments.map((comment) => new Comment(comment)))
      .catch((err) => {
        throw new Error(
          `error finding comments by post id with pagination: ${err}`
        );
      });
  }

  public async findByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    return knex("comments")
      .whereRaw("owner->>'id' = ?", [request.userId])
      .orderBy("created_at", "desc")
      .offset(request.skip)
      .limit(request.pageSize)
      .select("*")
      .then((comments) => comments.map((comment) => new Comment(comment)))
      .catch((err) => {
        throw new Error(
          `error finding comments by user id with pagination: ${err}`
        );
      });
  }
}
