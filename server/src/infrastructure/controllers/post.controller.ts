import { Body, Controller, Post } from "@nestjs/common";
import { IPostReflectObject, Post as PostEntity } from "@/domain/src/post";
import { PostUseCases } from "@/application/use-cases/PostUseCases";
import { UseCasesApplication } from "@/application";

@Controller("post")
export class PostController {
  #postUseCases: PostUseCases;

  constructor(useCasesApplitcation: UseCasesApplication) {
    this.#postUseCases = useCasesApplitcation.getPostUsesCases();
  }

  @Post("create")
  async publicPost(@Body() body: IPostReflectObject): Promise<PostEntity> {
    return {} as any
  }
}
