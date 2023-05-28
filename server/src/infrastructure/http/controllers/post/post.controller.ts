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
import { IPostReflectObject } from "@/domain/src/post";
import { PostUseCases } from "@app/use-cases/PostUseCases";
import { appInMemory } from "@/infrastructure";
import { errorHandler } from "../../@utils/errorHandler";

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
      const response = await this.#postUseCases.create(post);
      return response.reflect;
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("byId/:postId")
  async findById(@Param("postId") postId: string): Promise<IPostReflectObject> {
    try {
      const response = await this.#postUseCases.getById(postId);
      if (response) {
        return response.reflect;
      }
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("byTitle/:title")
  async findByTitle(
    @Param("title") title: string,
  ): Promise<IPostReflectObject> {
    try {
      const response = await this.#postUseCases.getByTitle(title);
      if (response) {
        return response.reflect;
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
      const response = await this.#postUseCases.update(updatedPost);
      if (response) {
        return response.reflect;
      }
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("pagination")
  async getWithPagination(
    @Query() request: { skip: number; pageSize: number },
  ): Promise<IPostReflectObject[]> {
    try {
      const response = await this.#postUseCases.getWithPagination(request);
      if (response) {
        return response.map((post) => post.reflect);
      }
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("")
  async all(): Promise<IPostReflectObject[]> {
    try {
      const response = await this.#postUseCases.getAll();
      if (response) {
        return response.map((post) => post.reflect);
      }
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
