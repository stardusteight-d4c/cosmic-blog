import type { ICommentRepository } from "@typings/comment";
import { Comment } from "@domain/src/comment";
import { knex } from "../config";

export class CommentPostgreSQLRepository implements ICommentRepository {
  private static instance: CommentPostgreSQLRepository;

  private constructor() {}

  private async replace(updatedComment: Comment): Promise<Comment> {
    const existingComment = await this.findById(updatedComment.reflect.id!);
    if (!existingComment) {
      throw new Error(`No comment found with id: ${updatedComment.reflect.id}`);
    }
    try {
      await knex("comments")
        .where("id", updatedComment.reflect.id)
        .update(updatedComment.reflect);
      return updatedComment;
    } catch (error) {
      throw new Error(`Error replacing comment: ${error}`);
    }
  }

  public static getInstance(): CommentPostgreSQLRepository {
    if (!CommentPostgreSQLRepository.instance) {
      CommentPostgreSQLRepository.instance = new CommentPostgreSQLRepository();
    }
    return CommentPostgreSQLRepository.instance;
  }

  public async create(comment: Comment): Promise<Comment> {
    try {
      const createdComment = await knex("comments")
        .insert(comment.reflect)
        .returning("*")
        .then((result) => result[0]);
      return new Comment(createdComment);
    } catch (error) {
      throw new Error(`Error creating comment: ${error}`);
    }
  }

  public async update(updatedComment: Comment): Promise<Comment> {
    try {
      const comment = await this.replace(updatedComment);
      return comment;
    } catch (error) {
      throw new Error(`Error updating comment: ${error}`);
    }
  }

  public async delete(commentId: string): Promise<Comment> {
    try {
      const comment = await this.findById(commentId);
      await knex("comments").where({ id: commentId }).delete();
      return comment;
    } catch (error) {
      throw new Error(`Error deleting comment: ${error}`);
    }
  }

  public async deleteAll(): Promise<void> {
    try {
      await knex("comments").delete();
    } catch (error) {
      throw new Error(`Error deleting all comments: ${error}`);
    }
  }

  public async deleteAllByPostId(postId: string): Promise<void> {
    try {
      await knex("comments").whereRaw("post->>'id' = ?", [postId]).delete();
    } catch (error) {
      throw new Error(`Error deleting comments by post ID: ${error}`);
    }
  }

  public async deleteAllByUserId(userId: string): Promise<void> {
    try {
      await knex("comments").whereRaw("owner->>'id' = ?", [userId]).delete();
    } catch (error) {
      throw new Error(`Error deleting comments by user ID: ${error}`);
    }
  }

  public async findAll(): Promise<Comment[]> {
    try {
      const comments = await knex("comments").select("*");
      return comments.map((comment) => new Comment(comment));
    } catch (error) {
      throw new Error(`Error finding all comments: ${error}`);
    }
  }

  public async findById(commentId: string): Promise<Comment> {
    try {
      const comment = await knex("comments").where({ id: commentId }).first();
      if (!comment) {
        throw new Error(`No comment found with id: ${commentId}`);
      }
      return new Comment(comment);
    } catch (error) {
      throw new Error(`Error finding comment by id: ${error}`);
    }
  }

  public async findAllByPostId(postId: string): Promise<Comment[]> {
    try {
      const comments = await knex("comments")
        .whereRaw("post->>'id' = ?", [postId])
        .select("*");
      return comments.map((comment) => new Comment(comment));
    } catch (error) {
      throw new Error(`Error finding comments by post ID: ${error}`);
    }
  }

  public async findAllByUserId(userId: string): Promise<Comment[]> {
    try {
      const comments = await knex("comments")
        .whereRaw("owner->>'id' = ?", [userId])
        .select("*");
      return comments.map((comment) => new Comment(comment));
    } catch (error) {
      throw new Error(`Error finding comments by user ID: ${error}`);
    }
  }

  public async findByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    try {
      const { postId, skip, pageSize } = request;
      const comments = await knex("comments")
        .whereRaw("post->>'id' = ?", [postId])
        .orderBy("postedAt", "desc")
        .offset(skip)
        .limit(pageSize)
        .select("*");
      return comments.map((comment) => new Comment(comment));
    } catch (error) {
      throw new Error(
        `Error finding comments by post ID with pagination: ${error}`
      );
    }
  }

  public async findByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    try {
      const { userId, skip, pageSize } = request;
      const comments = await knex("comments")
        .whereRaw("owner->>'id' = ?", [userId])
        .orderBy("postedAt", "desc")
        .offset(skip)
        .limit(pageSize)
        .select("*");
      return comments.map((comment) => new Comment(comment));
    } catch (error) {
      throw new Error(
        `Error finding comments by user ID with pagination: ${error}`
      );
    }
  }
}
