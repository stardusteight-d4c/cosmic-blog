import { IArticleData } from "@/@interfaces/article";
import { ISession } from "@/@interfaces/auth";
import { NotificationType } from "@/@interfaces/notification";
import { IPostResponse } from "@/@interfaces/post";
import { AppState } from "@/store";
import { editorMethods } from "@/store/modules/editor";
import { postMethods } from "@/store/modules/post";
import { uploadImageToFirebase } from "@/utils/uploadImageToFirebase";
import ShortUniqueId from "short-unique-id";
import { ComputedRef, Ref } from "vue";
import { Store } from "vuex";

export class Functions {
  constructor() {}

  static async submitPost(request: {
    editorData: IArticleData;
    session: ISession;
    store: Store<AppState>;
  }) {
    const { editorData, session, store } = request;
    const uid = new ShortUniqueId({ length: 10 });
    const fileName = uid();
    const publicImageURL = await uploadImageToFirebase(
      editorData.coverImage,
      fileName
    );
    const post = {
      title: editorData.title,
      body: editorData.body,
      tags: editorData.tags,
      postedIn: new Date(),
      coverImage: publicImageURL,
      author: {
        id: session.decodedToken!.user_id,
        email: session.decodedToken!.email,
      },
    };
    await store.dispatch(editorMethods.actions.publishPost, post);
  }

  static onFileChange(
    event: Event,
    request: {
      notify: (
        type: NotificationType,
        content: string,
        title?: string | undefined
      ) => void;
      editMode: boolean;
      fileUploadedOnEditMode: Ref<{
        [x: number]: File;
        readonly length: number;
        item: (index: number) => File | null;
      } | null>;
      fileUploaded: Ref<{
        [x: number]: File;
        readonly length: number;
        item: (index: number) => File | null;
      } | null>;
      editorData: ComputedRef<IArticleData>;
    }
  ): void {
    const {
      notify,
      editMode,
      fileUploadedOnEditMode,
      fileUploaded,
      editorData,
    } = request;
    const input = event.target as HTMLInputElement;
    const files = input.files as FileList;
    const maxFileSize = 3 * 1024 * 1024; // 3MB
    const file = files[0];
    if (file && file.size > maxFileSize) {
      notify("ERROR", "The selected file is larger than 3MB!");
      input.value = "";
    } else {
      const reader = new FileReader();
      if (editMode === true) {
        fileUploadedOnEditMode.value = files;
      } else {
        fileUploaded.value = files;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result;
        editorData.value.coverImage = String(base64);
      };
    }
  }

  static handleTags(request: {
    tag: Ref<string>;
    notify: (
      type: NotificationType,
      content: string,
      title?: string | undefined
    ) => void;
    editorData: IArticleData;
  }): void {
    const { tag, notify, editorData } = request;
    if (tag.value.length > 15 || tag.value.length < 3) {
      notify("WARNING", "Tags must contain between 3 and 15 characters.");
      return;
    }
    if (editorData.tags.length === 4) {
      notify("WARNING", "You have reached the tag limit.");
      return;
    }
    editorData.tags.push(tag.value);
    tag.value = "";
  }

  static onClickUpload(): void {
    const inputFile = document.getElementById("inputFile")!;
    const clickEvent = new MouseEvent("click", { bubbles: true });
    inputFile.dispatchEvent(clickEvent);
  }

  static onKeyDownInTagInput(
    event: KeyboardEvent,
    request: { editorData: ComputedRef<IArticleData>; tag: string }
  ): void {
    const { editorData, tag } = request;
    if (event.key === "Backspace" && tag === "") {
      editorData.value.tags.pop();
    }
  }

  static async search(request: {
    term: Ref<string>;
    posts: Ref<IPostResponse[]>;
    store: Store<AppState>;
  }) {
    const { term, posts, store } = request;
    if (term.value.length > 3) {
      posts.value = await store.dispatch(postMethods.actions.searchByTitle, {
        title: term.value,
      });
    }
  }

  static handleSelectedToEdit(request: {
    post: IPostResponse;
    posts: Ref<IPostResponse[]>;
    store: Store<AppState>;
    fileUploaded: Ref<FileList | null>;
    term: Ref<string>;
    editorData: ComputedRef<IArticleData>;
  }) {
    const { post, posts, store, fileUploaded, term, editorData } = request;
    store.commit(editorMethods.mutations.setEditMode, true);
    fileUploaded.value = null;
    posts.value = [];
    term.value = "";
    editorData.value.postId = post.id;
    editorData.value.coverImage = post.coverImage;
    editorData.value.title = post.title;
    editorData.value.tags = post.tags;
    editorData.value.coverImage = post.coverImage;
    editorData.value.date = new Date(post.postedIn);
    editorData.value.body = post.body;
    store.commit(editorMethods.mutations.setRichTextEditor, editorData.value);
  }
}
