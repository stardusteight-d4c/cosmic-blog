import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { IPostReflectObject } from "@domain/src/post";
import { PostUseCases } from "@app/use-cases/PostUseCases";
import { appInMemory } from "@infra/index";
import { errorHandler } from "@infra/http/@utils/errorHandler";

@Controller("post")
export class PostController {
  #postUseCases: PostUseCases;

  constructor() {
    this.#postUseCases = appInMemory.getPostUsesCases();
  }

  @Post("create")
  async publishPost(
    @Body() post: IPostReflectObject,
  ): Promise<IPostReflectObject> {
    try {
      return await this.#postUseCases
        .create(post)
        .then((post) => post?.reflect);
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("search")
  async search(
    @Query() request: { by: "id" | "title"; field: string },
  ): Promise<IPostReflectObject> {
    try {
      const { by, field } = request;
      if (by === "id") {
        return await this.#postUseCases
          .getById(field)
          .then((post) => post?.reflect);
      } else if (by === "title") {
        return await this.#postUseCases
          .getByTitle(field)
          .then((post) => post?.reflect);
      }
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Put("update")
  async edit(
    @Body() updatedPost: IPostReflectObject,
  ): Promise<IPostReflectObject> {
    try {
      return await this.#postUseCases
        .update(updatedPost)
        .then((post) => post?.reflect);
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("pagination")
  async getWithPagination(
    @Query() request: { skip: number; pageSize: number },
  ): Promise<IPostReflectObject[]> {
    try {
      return await this.#postUseCases
        .getWithPagination(request)
        .then((posts) => posts?.map((post) => post?.reflect));
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("")
  async all(): Promise<IPostReflectObject[]> {
    try {
      return await this.#postUseCases
        .getAll()
        .then((posts) => posts?.map((post) => post?.reflect));
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Delete(":postId")
  async delete(@Param("postId") postId: string): Promise<void> {
    try {
      await this.#postUseCases.delete(postId);
    } catch (error: any) {
      errorHandler(error);
    }
  }
}
