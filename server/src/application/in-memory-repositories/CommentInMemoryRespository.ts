import { ICommentRepository } from "@/domain/comment/@interfaces/ICommentRepository";
import { Comment } from "@/domain/comment";

export class CommentInMemoryRepository implements ICommentRepository {
  #comments: Map<string, Comment> = new Map();

  public get comments() {
    throw new Error("Cannot access comments property directly.");
  }
  public set comments(_value: string) {
    throw new Error("Cannot modify comments property directly.");
  }

  private async replace(updatedComment: Comment): Promise<Comment> {
    const existingComment = await this.findById(updatedComment.reflect.id!);
    if (!existingComment) {
      throw new Error(`No comment found with id: ${updatedComment.reflect.id}`);
    }
    this.#comments.delete(existingComment.reflect.id!);
    this.#comments.set(updatedComment.reflect.id!, updatedComment);
    return updatedComment;
  }

  public async create(comment: Comment): Promise<Comment> {
    this.#comments.set(comment.reflect.id!, comment);
    return comment;
  }

  public async update(updatedComment: Comment): Promise<Comment> {
    const comment = await this.replace(updatedComment);
    return comment;
  }

  public async get(): Promise<Comment[]> {
    const comments: Comment[] = Array.from(this.#comments.values());
    return comments;
  }

  public async delete(commentId: string): Promise<Comment> {
    const comment = await this.findById(commentId);
    this.#comments.delete(commentId);
    return comment!;
  }

  public async findById(commentId: string): Promise<Comment | undefined> {
    const comment = this.#comments.get(commentId);
    if (!comment) {
      throw new Error(`No comment found with id: ${commentId}`);
    }
    return comment;
  }

  public async getByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    const { postId, skip, pageSize } = request;
    const comments = Array.from(this.#comments.values());
    const commentsByPostId = comments.filter(
      (comment) => comment.reflect.postId === postId,
    );
    const paginatedComments = commentsByPostId.slice(skip, skip + pageSize);
    return paginatedComments;
  }
}
