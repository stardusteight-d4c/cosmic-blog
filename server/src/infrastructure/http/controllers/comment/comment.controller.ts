import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Headers,
  Query,
} from "@nestjs/common";
import type { ICommentReflectObject } from "@typings/comment";
import { CommentUseCases } from "@app/use-cases/CommentUseCases";
import { JWTSessionTokenAdapter } from "@infra/adapters";
import { app } from "@infra/index";
import { errorHandler } from "../../helpers/errorHandler";

@Controller("comment")
export class CommentController {
  #commentUseCases: CommentUseCases;

  constructor() {
    this.#commentUseCases = app.getCommentUsesCases();
  }

  @Post("")
  async create(
    @Body() comment: ICommentReflectObject,
    @Headers("authorization") authorization: string
  ): Promise<ICommentReflectObject> {
    return this.#commentUseCases
      .create(comment, {
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
        authToken: authorization,
        userId: comment.owner.id,
      })
      .then((comment) => comment.reflect)
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("amount")
  async getAmount(
    @Query() query: { of: "post" | "user"; id: string }
  ): Promise<number> {
    return this.#commentUseCases
      .getAmount(query)
      .then((amount) => amount)
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("pagination")
  async getWithPagination(
    @Query()
    query: {
      by: "userId" | "postId";
      value: string;
      skip: number;
      pageSize: number;
    }
  ): Promise<ICommentReflectObject[]> {
    return this.#commentUseCases
      .getWithPagination(query)
      .then((comments) => comments?.map((comment) => comment?.reflect))
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Put("")
  async edit(
    @Body() updatedComment: ICommentReflectObject,
    @Headers("authorization") authorization: string
  ): Promise<ICommentReflectObject> {
    return this.#commentUseCases
      .edit(updatedComment, {
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
        authToken: authorization,
        userId: updatedComment.owner.id,
      })
      .then((comment) => comment.reflect)
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Delete(":commentId")
  async delete(
    @Param("commentId") commentId: string,
    @Query("ownerId") ownerId: string,
    @Headers("authorization") authorization: string
  ): Promise<void> {
    return this.#commentUseCases
      .delete(commentId, {
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
        authToken: authorization,
        userId: ownerId,
      })
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }
}
