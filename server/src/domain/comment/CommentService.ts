import { IEventPublisher } from "../@interfaces";
import { IPostRepository } from "../post";
import { IUserRepository } from "../user";
import { ICommentRepository } from "./@interfaces";
import { ICommentReflectObject } from "./@interfaces/ICommentReflectObject";
import { ICommentService } from "./@interfaces/ICommentService";
import { Comment } from "./Comment";
import { CommentEventPublisher } from "./CommentEventPublisher";
import { CommentPostEvent } from "./CommentEvents";
import { commentBuilderFactory } from "./helpers";

export class CommentService implements ICommentService {
  #commentPublisher: IEventPublisher;
  #commentRespository: ICommentRepository;
  #postRepository: IPostRepository;
  #userRepository: IUserRepository;

  constructor(implementations: {
    commentPublisher: CommentEventPublisher;
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
    const commentInstance = commentBuilderFactory({ comment });
    const commentPostEvent = new CommentPostEvent(commentInstance);
    const responses = await this.#commentPublisher.emit(commentPostEvent);
    const response = responses.find(
      (response) => response instanceof Comment,
    ) as Comment;
    return response;
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

  public async handlerCommentPostEvent(
    event: CommentPostEvent,
  ): Promise<Comment | undefined> {
    const { comment } = event;
    const commentInstance = await this.#commentRespository.create(comment);
    return commentInstance;
  }
}
