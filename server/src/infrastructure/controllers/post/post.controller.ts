import { Body, Controller, Post } from "@nestjs/common";
import { IPostReflectObject } from "@/domain/src/post";
import { ApplicationUseCases } from "@app/ApplicationUseCases";
import { PostInMemoryRepository } from "@app/@in-memory-repositories";
import { PostUseCases } from "@app/use-cases/PostUseCases";

@Controller("post")
export class PostController {
  #postUseCases: PostUseCases;

  constructor() {
    this.#postUseCases = new ApplicationUseCases({
      postRepository: PostInMemoryRepository.getInstance(),
    }).getPostUsesCases();
  }

  @Post("create")
  async publicPost(
    @Body() body: IPostReflectObject,
  ): Promise<IPostReflectObject> {
    try {
      const response = await this.#postUseCases.create(body);
      return response.reflect;
    } catch (error) {
      console.error(error);
    }
  }
}
