import type {
  ICommentReflectObject,
  ICommentRepository,
  ICommentService,
} from "@typings/comment";
import { Comment } from "./Comment";
import { commentBuilderFactory } from "./helpers";
import { CommentHandler } from "./CommentHandler";
import { Publisher } from "@/domain/Publisher";

export class CommentService implements ICommentService {
  #handler: CommentHandler;

  constructor(readonly commentRepository: ICommentRepository) {
    const publisher = Publisher.getInstance();
    this.#handler = new CommentHandler({ commentRepository, publisher });
  }

  public async createComment(comment: ICommentReflectObject): Promise<Comment> {
    return this.#handler
      .findUserIdOrThrowError(comment.owner.id)
      .then(async () => {
        await this.#handler.findPostIdOrThrowError(comment.post.id);
        return await this.commentRepository.create(
          commentBuilderFactory(comment)
        );
      });
  }

  public async updateComment(
    updatedComment: ICommentReflectObject
  ): Promise<Comment | undefined> {
    return this.#handler
      .findCommentIdOrThrowError(updatedComment.id)
      .then(async (existingComment) => {
        return await this.commentRepository.update(
          new Comment(updatedComment),
          existingComment
        );
      });
  }

  public async deleteComment(commentId: string): Promise<void> {
    return await this.commentRepository.delete(commentId);
  }

  public async deleteAllCommentsByPostId(postId: string): Promise<void> {
    return await this.commentRepository.deleteAllByPostId(postId);
  }

  public async deleteAllCommentsByUserId(userId: string): Promise<void> {
    return await this.commentRepository.deleteAllByUserId(userId);
  }

  public async getCommentById(commentId: string): Promise<Comment | undefined> {
    return await this.commentRepository.findById(commentId);
  }

  public async getAllComments(): Promise<Comment[] | undefined> {
    return await this.commentRepository.findAll();
  }

  public async getCommentsByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    return await this.commentRepository.findByPostIdWithPagination(request);
  }

  public async getCommentsByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    return await this.commentRepository.findByUserIdWithPagination(request);
  }

  public async getPostCommentAmount(postId: string): Promise<number> {
    return (await this.commentRepository.findAllByPostId(postId)).length;
  }

  public async getUserCommentAmount(userId: string): Promise<number> {
    return (await this.commentRepository.findAllByUserId(userId)).length;
  }
}
