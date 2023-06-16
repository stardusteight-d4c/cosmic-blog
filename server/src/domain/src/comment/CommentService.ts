import type {
  ICommentReflectObject,
  ICommentRepository,
  ICommentService,
} from "@typings/comment";
import type { IPostRepository } from "@typings/post";
import type { IUserRepository } from "@typings/user";
import { Comment } from "./Comment";
import { commentBuilderFactory } from "./helpers";
import FindByIdCommand from "@/domain/GlobalsCommand";
import { UserObserver } from "../user/UserObserver";

export class CommentService implements ICommentService {
  #commentRepository: ICommentRepository;
  #postRepository: IPostRepository;
  #userRepository: IUserRepository;
  #publisher?: IPublisher;

  constructor(implementations: {
    commentRepository: ICommentRepository;
    userRepository: IUserRepository;
    postRepository: IPostRepository;
    publisher?: IPublisher;
  }) {
    this.#commentRepository = implementations.commentRepository;
    this.#postRepository = implementations.postRepository;
    this.#userRepository = implementations.userRepository;
    this.#publisher = implementations.publisher;
  }

  public async createComment(comment: ICommentReflectObject): Promise<Comment> {
 
    await this.#userRepository.findById(comment.owner.id);
    await this.#postRepository.findById(comment.post.id);

    // if (this.#publisher) {
    //   const findUserCommand = new FindByIdCommand(comment.owner.id);
    //   await this.#publisher.emit(findUserCommand, targetObserver: UserObserver);
    // }

    const newComment = commentBuilderFactory({ comment });
    const commentInstance = await this.#commentRepository.create(newComment);
    return commentInstance;
  }

  public async deleteComment(commentId: string): Promise<void> {
    await this.#commentRepository.delete(commentId);
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
    updatedComment: ICommentReflectObject
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
    const comments = await this.#commentRepository.findByPostIdWithPagination(
      request
    );
    return comments;
  }

  public async getCommentsByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]> {
    const comments = await this.#commentRepository.findByUserIdWithPagination(
      request
    );
    return comments;
  }

  public async getPostCommentAmount(postId: string): Promise<number> {
    return (await this.#commentRepository.findAllByPostId(postId)).length;
  }

  public async getUserCommentAmount(userId: string): Promise<number> {
    return (await this.#commentRepository.findAllByUserId(userId)).length;
  }
}
