import { store } from "@/store";
import { notificationMethods } from "@/store/modules/notification";
import { postMethods } from "@/store/modules/post";
import { detectClickOutsideElement } from "@/utils";
import { ComputedRef, Ref, nextTick } from "vue";

export class SubmitCommentFunctions {
  #session: ComputedRef<ISession>;

  constructor(params: { session: ComputedRef<ISession> }) {
    this.#session = params.session;
  }

  private notify(
    type: NotificationType,
    content: string,
    title?: string | undefined
  ) {
    store.commit(notificationMethods.mutations.notify, {
      title,
      content,
      type,
    });
  }

  async submitComment(request: {
    emit: (event: "submitComment", ...args: any[]) => void;
    comment: Ref<string>;
    postId: ComputedRef<string | undefined>;
    postTitle: ComputedRef<string>;
    postSlug: ComputedRef<string>;
    handledAvatarString:  any;
  }) {
    const {
      emit,
      comment,
      postId,
      postTitle,
      postSlug,
      handledAvatarString,
    } = request;
    if (comment.value.length > 500) {
      this.notify("ERROR", "The comment exceeds the 500 character limit!");
      return;
    }
    emit("submitComment");
    const session = this.#session.value.decodedToken!;
    const payload: IComment = {
      content: comment.value,
      postedAt: new Date(),
      post: {
        id: postId.value!,
        title: postTitle.value,
        slug: postSlug.value,
      },
      owner: {
        id: session.user_id,
        avatar: handledAvatarString,
        username: session.username,
      },
    };
    console.log(payload.owner);
    
    comment.value = "";
    await store.dispatch(postMethods.actions.leaveComment, payload);
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

  private notify(
    type: NotificationType,
    content: string,
    title?: string | undefined
  ) {
    store.commit(notificationMethods.mutations.notify, {
      title,
      content,
      type,
    });
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

  async editComment(request: { propsComment: IComment; edit: Ref<any> }) {
    const { propsComment, edit } = request;
    const textarea = document.getElementById(
      `textarea-${propsComment.id}`
    )! as HTMLTextAreaElement;
    if (textarea.value.length > 500) {
      this.notify("ERROR", "The comment exceeds the 500 character limit!");
      return;
    }
    const comment = document.getElementById(`comment-${propsComment.id}`)!;
    const editValue = textarea.value;
    comment.innerText = editValue;
    edit.value = editValue;
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
    if (clickedOutside && elementCliked) {
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
}
