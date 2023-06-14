import type { ICommentRepository } from "@typings/comment";
import { Comment } from "@domain/src/comment";

export class CommentInMemoryRepository implements ICommentRepository {
  private static instance: CommentInMemoryRepository;
  #comments: Map<string, Comment> = new Map();

  private constructor() {}

  private async replace(updatedComment: Comment): Promise<Comment> {
    const existingComment = await this.findById(updatedComment.reflect.id!);
    if (!existingComment) {
      throw new Error(`No comment found with id: ${updatedComment.reflect.id}`);
    }
    this.#comments.delete(existingComment.reflect.id!);
    this.#comments.set(updatedComment.reflect.id!, updatedComment);
    return updatedComment;
  }

  public static getInstance(): CommentInMemoryRepository {
    if (!CommentInMemoryRepository.instance) {
      CommentInMemoryRepository.instance = new CommentInMemoryRepository();
    }
    return CommentInMemoryRepository.instance;
  }

  public async create(comment: Comment): Promise<Comment> {
    this.#comments.set(comment.reflect.id!, comment);
    return comment;
  }

  public async update(updatedComment: Comment): Promise<Comment> {
    const comment = await this.replace(updatedComment);
    return comment;
  }

  public async findAll(): Promise<Comment[]> {
    const comments: Comment[] = Array.from(this.#comments.values());
    return comments;
  }

  public async delete(commentId: string): Promise<Comment> {
    const comment = await this.findById(commentId);
    this.#comments.delete(commentId);
    return comment!;
  }

  public async deleteAll(): Promise<void> {
    this.#comments.clear();
  }

  public async deleteAllByPostId(postId: string): Promise<void> {
    for (const [commentId, comment] of this.#comments.entries()) {
      if (comment.reflect.post.id === postId) {
        this.#comments.delete(commentId);
      }
    }
  }

  public async deleteAllByUserId(userId: string): Promise<void> {
    for (const [commentId, comment] of this.#comments.entries()) {
      if (comment.reflect.owner.id === userId) {
        this.#comments.delete(commentId);
      }
    }
  }

  public async findById(commentId: string): Promise<Comment | undefined> {
    const comment = this.#comments.get(commentId);
    if (!comment) {
      throw new Error(`No comment found with id: ${commentId}`);
    }
    return comment;
  }

  public async findByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    const { postId, skip, pageSize } = request;
    const comments = Array.from(this.#comments.values());
    const commentsByPostId = comments.filter(
      (comment) => comment.reflect.post.id === postId
    );
    const sortedComments = commentsByPostId.sort((a, b) => {
      const aPostedAt = new Date(a.reflect.postedAt);
      const bPostedAt = new Date(b.reflect.postedAt);
      return bPostedAt.getTime() - aPostedAt.getTime();
    });
    const paginatedComments = sortedComments.slice(
      Number(skip),
      Number(skip) + Number(pageSize)
    );
    return paginatedComments;
  }

  public async findByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    const { userId, skip, pageSize } = request;
    const comments = Array.from(this.#comments.values());
    const commentsByUserId = comments.filter(
      (comment) => comment.reflect.owner.id === userId
    );
    const sortedComments = commentsByUserId.sort((a, b) => {
      const aPostedAt = new Date(a.reflect.postedAt);
      const bPostedAt = new Date(b.reflect.postedAt);
      return bPostedAt.getTime() - aPostedAt.getTime();
    });
    const paginatedComments = sortedComments.slice(
      Number(skip),
      Number(skip) + Number(pageSize)
    );
    return paginatedComments;
  }

  public async findAllByPostId(postId: string): Promise<Comment[]> {
    const comments: Comment[] = [];
    for (const comment of this.#comments.values()) {
      if (comment.reflect.post.id === postId) {
        comments.push(comment);
      }
    }
    return comments;
  }

  public async findAllByUserId(userId: string): Promise<Comment[]> {
    const comments: Comment[] = [];
    for (const comment of this.#comments.values()) {
      if (comment.reflect.owner.id === userId) {
        comments.push(comment);
      }
    }
    return comments;
  }

  public get comments() {
    throw new Error("Cannot access comments property directly.");
  }
  public set comments(_value: string) {
    throw new Error("Cannot modify comments property directly.");
  }
}
