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
import Validators from "../../helpers/validators";

@Controller("comment")
export class CommentController {
  #commentUseCases: CommentUseCases;

  constructor() {
    this.#commentUseCases = app.getCommentUsesCases();
  }

  @Post("")
  async comment(
    @Body() comment: ICommentReflectObject,
    @Headers("authorization") authorization: string
  ): Promise<ICommentReflectObject> {
    try {
      Validators.isSameUser({
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
        authToken: authorization,
        userId: comment.owner.id,
      });
      return await this.#commentUseCases
        .create(comment)
        .then((comment) => comment.reflect);
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("amout")
  async amount(
    @Query() query: { of: "post" | "user"; id: string }
  ): Promise<number> {
    try {
      const { of, id } = query;
      if (of == "post") {
        return await this.#commentUseCases.getPostAmount(id);
      } else if (of === "user") {
        return await this.#commentUseCases.getUserAmount(id);
      }
    } catch (error) {
      errorHandler(error);
    }
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
    try {
      return await this.#commentUseCases
        .getWithPagination(query)
        .then((comments) => comments?.map((comment) => comment?.reflect));
    } catch (error) {
      errorHandler(error);
    }
  }

  @Put("")
  async edit(
    @Body() updatedComment: ICommentReflectObject,
    @Headers("authorization") authorization: string
  ): Promise<ICommentReflectObject> {
    Validators.isSameUser({
      sessionTokenAdapter: new JWTSessionTokenAdapter(),
      authToken: authorization,
      userId: updatedComment.owner.id,
    });
    try {
      return await this.#commentUseCases
        .edit(updatedComment)
        .then((comment) => comment.reflect);
    } catch (error) {
      errorHandler(error);
    }
  }

  @Delete(":commentId")
  async delete(
    @Param("commentId") commentId: string,
    @Query("ownerId") ownerId: string,
    @Headers("authorization") authorization: string
  ): Promise<void> {
    try {
      Validators.isSameUser({
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
        authToken: authorization,
        userId: ownerId,
      });
      await this.#commentUseCases.delete(commentId);
    } catch (error) {
      errorHandler(error);
    }
  }
}
