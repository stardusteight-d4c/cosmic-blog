import type {
  ICommentReflectObject,
  ICommentRepository,
  ICommentService,
} from "@typings/comment";
import { Comment } from "./Comment";
import { commentBuilderFactory } from "./helpers";
import ServiceHandlers from "./helpers/ServiceHandlers";

export class CommentService implements ICommentService {
  #commentRepository: ICommentRepository;
  #publisher: IPublisher;

  constructor(implementations: {
    commentRepository: ICommentRepository;
    publisher: IPublisher;
  }) {
    this.#commentRepository = implementations.commentRepository;
    this.#publisher = implementations.publisher;
  }

  private async validateCommentOwner(ownerId: string): Promise<void> {
    await ServiceHandlers.findUserIdOrThrowError({
      id: ownerId,
      publisher: this.#publisher,
    });
  }

  private async validateCommentPost(postId: string): Promise<void> {
    await ServiceHandlers.findPostIdOrThrowError({
      id: postId,
      publisher: this.#publisher,
    });
  }

  public async createComment(comment: ICommentReflectObject): Promise<Comment> {
    await this.validateCommentOwner(comment.owner.id);
    await this.validateCommentPost(comment.post.id);
    const newComment = commentBuilderFactory({ comment });
    return await this.#commentRepository
      .create(newComment)
      .then((comment) => comment);
  }

  public async updateComment(
    updatedComment: ICommentReflectObject
  ): Promise<Comment | undefined> {
    const existingComment = await ServiceHandlers.findCommentIdOrThrowError({
      id: updatedComment.id,
      commentRepository: this.#commentRepository,
    });
    return this.#commentRepository
      .update(new Comment(updatedComment), existingComment)
      .then((comment) => comment);
  }

  public async deleteComment(commentId: string): Promise<void> {
    return this.#commentRepository.delete(commentId);
  }

  public async deleteAllCommentsByPostId(postId: string): Promise<void> {
    return await this.#commentRepository.deleteAllByPostId(postId);
  }

  public async deleteAllCommentsByUserId(userId: string): Promise<void> {
    return await this.#commentRepository.deleteAllByUserId(userId);
  }

  public async getCommentById(commentId: string): Promise<Comment | undefined> {
    return await this.#commentRepository.findById(commentId);
  }

  public async getAllComments(): Promise<Comment[] | undefined> {
    return await this.#commentRepository.findAll();
  }

  public async getCommentsByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    return await this.#commentRepository.findByPostIdWithPagination(request);
  }

  public async getCommentsByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    return await this.#commentRepository.findByUserIdWithPagination(request);
  }

  public async getPostCommentAmount(postId: string): Promise<number> {
    return (await this.#commentRepository.findAllByPostId(postId)).length;
  }

  public async getUserCommentAmount(userId: string): Promise<number> {
    return (await this.#commentRepository.findAllByUserId(userId)).length;
  }
}
