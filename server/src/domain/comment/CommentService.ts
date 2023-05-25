import { IEventPublisher } from "../@interfaces";
import { IPostRepository } from "../post";
import { IUserRepository } from "../user";
import { ICommentRepository } from "./@interfaces";
import { ICommentReflectObject } from "./@interfaces/ICommentReflectObject";
import { ICommentService } from "./@interfaces/ICommentService";
import { Comment } from "./Comment";
import { CreateCommentEvent, DeleteCommentEvent } from "./CommentEvents";
import { commentBuilderFactory } from "./helpers";

export class CommentService implements ICommentService {
  #commentPublisher: IEventPublisher;
  #commentRespository: ICommentRepository;
  #postRepository: IPostRepository;
  #userRepository: IUserRepository;

  constructor(implementations: {
    commentPublisher: IEventPublisher;
    commentRepository: ICommentRepository;
    userRepository: IUserRepository;
    postRepository: IPostRepository;
  }) {
    this.#commentPublisher = implementations.commentPublisher;
    this.#commentRespository = implementations.commentRepository;
    this.#postRepository = implementations.postRepository;
    this.#userRepository = implementations.userRepository;
  }

  public async emitCreateCommentEvent(
    comment: ICommentReflectObject,
  ): Promise<Comment> {
    await this.#userRepository.findById(comment.owner.id!);
    await this.#postRepository.findById(comment.postId);
    const newComment = commentBuilderFactory({ comment });
    const commentInstance = await this.#commentRespository.create(newComment);
    const createCommentEvent = new CreateCommentEvent(commentInstance);
    await this.#commentPublisher.emit(createCommentEvent);
    return commentInstance;
  }

  public async emitDeleteCommentEvent(comment: Comment): Promise<void> {
    await this.#commentRespository.delete(comment.reflect.id!);
    const deleteCommentEvent = new DeleteCommentEvent(comment);
    await this.#commentPublisher.emit(deleteCommentEvent);
  }

  public async findCommentById(
    commentId: string,
  ): Promise<Comment | undefined> {
    const comment = await this.#commentRespository.findById(commentId);
    return comment;
  }

  public async updateComment(
    updatedComment: ICommentReflectObject,
  ): Promise<Comment | undefined> {
    const commentInstance = commentBuilderFactory({ comment: updatedComment });
    await this.#commentRespository.update(commentInstance);
    return commentInstance;
  }

  public async getComments(): Promise<Comment[] | undefined> {
    const comments = await this.#commentRespository.get();
    return comments;
  }

  public async getCommentsByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    const { postId, skip, pageSize } = request;
    const comments = await this.#commentRespository.getByPostIdWithPagination({
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
    const comments = await this.#commentRespository.getByUserIdWithPagination({
      userId,
      skip,
      pageSize,
    });
    return comments;
  }
}
