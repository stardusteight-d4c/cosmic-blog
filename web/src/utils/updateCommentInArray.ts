import { IComment } from "@/@interfaces/comment";

export function updateCommentInArray(commentsArray: IComment[], updatedComment: IComment) {
  for (let i = 0; i < commentsArray.length; i++) {
    if (commentsArray[i].id === updatedComment.id) {
      commentsArray[i] = updatedComment;
      break;
    }
  }

  return commentsArray;
}