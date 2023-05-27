import { ICommentRepository } from "./@interfaces";
import { ICommentReflectObject } from "./@interfaces/ICommentReflectObject";
import { ICommentService } from "./@interfaces/ICommentService";
import { Comment } from "./Comment";
import { commentBuilderFactory } from "./helpers";

export class CommentService implements ICommentService {
  #commentRepository: ICommentRepository;

  constructor(implementations: { commentRepository: ICommentRepository }) {
    this.#commentRepository = implementations.commentRepository;
  }

  public async createComment(comment: ICommentReflectObject): Promise<Comment> {
    const newComment = commentBuilderFactory({ comment });
    const commentInstance = await this.#commentRepository.create(newComment);
    return commentInstance;
  }

  public async deleteComment(comment: Comment): Promise<void> {
    await this.#commentRepository.delete(comment.reflect.id!);
    return;
  }

  public async deleteAllCommentsByPostId(postId: string): Promise<void> {
    return await this.#commentRepository.deleteAllByPostId(postId);
  }

  public async deleteAllCommentsByUserId(userId: string): Promise<void> {
    return await this.#commentRepository.deleteAllByUserId(userId);
  }

  public async getCommentById(commentId: string): Promise<Comment | undefined> {
    const comment = await this.#commentRepository.findById(commentId);
    return comment;
  }

  public async updateComment(
    updatedComment: ICommentReflectObject,
  ): Promise<Comment | undefined> {
    const commentInstance = commentBuilderFactory({ comment: updatedComment });
    await this.#commentRepository.update(commentInstance);
    return commentInstance;
  }

  public async getAllComments(): Promise<Comment[] | undefined> {
    const comments = await this.#commentRepository.findAll();
    return comments;
  }

  public async getCommentsByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    const { postId, skip, pageSize } = request;
    const comments = await this.#commentRepository.findByPostIdWithPagination({
      postId,
      skip,
      pageSize,
    });
    return comments;
  }

  public async getCommentsByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    const { userId, skip, pageSize } = request;
    const comments = await this.#commentRepository.findByUserIdWithPagination({
      userId,
      skip,
      pageSize,
    });
    return comments;
  }

  public async getPostCommentAmount(postId: string): Promise<number> {
    return (await this.#commentRepository.findAllByPostId(postId)).length;
  }

  public async getUserCommentAmount(userId: string): Promise<number> {
    return (await this.#commentRepository.findAllByUserId(userId)).length;
  }
}
