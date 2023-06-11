import { ISession } from "@/@interfaces/auth";
import { IComment } from "@/@interfaces/comment";
import { store } from "@/store";
import { postMethods } from "@/store/modules/post";
import { detectClickOutsideElement } from "@/utils";
import { ComputedRef, Ref, nextTick } from "vue";

export class SubmitCommentFunctions {
  #session: ComputedRef<ISession>;

  constructor(params: { session: ComputedRef<ISession> }) {
    this.#session = params.session;
  }

  async submitComment(request: {
    emit: (event: "submitComment", ...args: any[]) => void;
    comment: Ref<string>;
    postId: ComputedRef<string | undefined>;
    postTitle: ComputedRef<string>;
    handledAvatarString: string;
    currentMemoji: number;
  }) {
    const {
      emit,
      comment,
      postId,
      postTitle,
      handledAvatarString,
      currentMemoji,
    } = request;
    emit("submitComment");
    const session = this.#session.value.decodedToken!;
    const payload: IComment = {
      content: comment.value,
      postedAt: new Date(),
      postId: postId.value ?? "",
      postTitle: postTitle.value,
      owner: {
        id: session.user_id,
        avatar: `${handledAvatarString}${currentMemoji}.png`,
        username: session.username,
      },
    };
    await store.dispatch(postMethods.actions.leaveComment, payload);
    comment.value = "";
  }
}

export class CommentFunctions {
  #commentId: string;
  #selectedEditComment: Ref<boolean>;
  #commentElement: Ref<HTMLDivElement | null>;
  #commentEditableElement: Ref<HTMLTextAreaElement | null>;

  constructor(params: {
    commentId: string;
    selectedEditComment: Ref<boolean>;
    commentElement: Ref<HTMLDivElement | null>;
    commentEditableElement: Ref<HTMLTextAreaElement | null>;
  }) {
    this.#commentId = params.commentId;
    this.#selectedEditComment = params.selectedEditComment;
    this.#commentElement = params.commentElement;
    this.#commentEditableElement = params.commentEditableElement;
  }

  adjustTextarea(request: { textareaHeight: Ref<string> }): void {
    const { textareaHeight } = request;
    nextTick(() => {
      const textarea = document.getElementById(`textarea-${this.#commentId}`)!;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      textareaHeight.value = `${textarea.scrollHeight}px`;
    });
  }

  showCommentTextarea(): void {
    this.#selectedEditComment.value = !this.#selectedEditComment.value;
    const commentDivHeight = this.#commentElement.value!.offsetHeight;
    if (!this.#selectedEditComment) return;
    this.#commentEditableElement.value!.style.minHeight = `${commentDivHeight}px`;
  }

  async editComment(request: { propsComment: IComment }) {
    const { propsComment } = request;
    const textarea = document.getElementById(
      `textarea-${propsComment.id}`
    )! as HTMLTextAreaElement;
    const comment = document.getElementById(`comment-${propsComment.id}`)!;
    const editValue = textarea.value;
    comment.innerText = editValue;
    this.#selectedEditComment.value = false;
    const updatedComment: IComment = {
      ...propsComment,
      content: editValue,
    };
    await store.dispatch(postMethods.actions.updateComment, updatedComment);
  }

  handleClickOutsideOfEdit(event: MouseEvent): void {
    const { clickedOutside, elementCliked } = detectClickOutsideElement(
      event,
      this.#commentId
    );
    const elementToExclude = this.#commentEditableElement.value;
    if (
      clickedOutside &&
      this.#selectedEditComment.value === true &&
      elementCliked !== elementToExclude
    ) {
      this.#selectedEditComment.value = false;
    }
  }
}
