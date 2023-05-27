import { ICommentService } from "@/domain/comment";

export class CommentUseCases {
  constructor(private commentService: ICommentService) {}
}
