import { CommentUseCases } from "@/application/use-cases/CommentUseCases";
import { appInMemory, appPostgreSQL } from "@/infrastructure";
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { errorHandler } from "../../@utils/errorHandler";
import type { ICommentReflectObject } from "@typings/comment";

@Controller("comment")
export class CommentController {
  #commentUseCases: CommentUseCases;

  constructor() {
    // this.#commentUseCases = appInMemory.getCommentUsesCases();
    this.#commentUseCases = appPostgreSQL.getCommentUsesCases();
  }

  @Post("")
  async comment(
    @Body() comment: ICommentReflectObject,
  ): Promise<ICommentReflectObject> {
    try {
      return await this.#commentUseCases
        .create(comment)
        .then((comment) => comment.reflect);
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("")
  async amount(
    @Query() query: { of: "post" | "user"; id: string },
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
    },
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
  ): Promise<ICommentReflectObject> {
    try {
      return await this.#commentUseCases
        .edit(updatedComment)
        .then((comment) => comment.reflect);
    } catch (error) {
      errorHandler(error);
    }
  }

  @Delete(":commentId")
  async delete(@Param("commentId") commentId: string): Promise<void> {
    try {
      await this.#commentUseCases.delete(commentId)
    } catch (error) {
      errorHandler(error)
    }
  }
}
