import { IArticleData } from "@/@interfaces/article";
import { ISession } from "@/@interfaces/auth";
import { NotificationType } from "@/@interfaces/notification";
import { IPostResponse } from "@/@interfaces/post";
import { store } from "@/store";
import { editorMethods } from "@/store/modules/editor";
import { notificationMethods } from "@/store/modules/notification";
import { postMethods } from "@/store/modules/post";
import { handleMarkdown, uploadImageToFirebase } from "@/utils";
import ShortUniqueId from "short-unique-id";
import { ComputedRef, Ref } from "vue";

export class HeaderFunctions {
  #editorData: ComputedRef<IArticleData>;
  #editMode: ComputedRef<boolean>;
  #fileUploadedOnEditMode: Ref<FileList | null>;
  #fileUploaded: Ref<FileList | null>;
  #tag: Ref<string>;
  #term: Ref<string>;
  #posts: Ref<IPostResponse[]>;

  constructor(params: {
    editorData: ComputedRef<IArticleData>;
    editMode: ComputedRef<boolean>;
    fileUploadedOnEditMode: Ref<FileList | null>;
    fileUploaded: Ref<FileList | null>;
    tag: Ref<string>;
    term: Ref<string>;
    posts: Ref<IPostResponse[]>;
  }) {
    this.#editorData = params.editorData;
    this.#editMode = params.editMode;
    this.#fileUploadedOnEditMode = params.fileUploadedOnEditMode;
    this.#fileUploaded = params.fileUploaded;
    this.#tag = params.tag;
    this.#term = params.term;
    this.#posts = params.posts;
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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files as FileList;
    const maxFileSize = 3 * 1024 * 1024; // 3MB
    const file = files[0];
    if (file && file.size > maxFileSize) {
      this.notify("ERROR", "The selected file is larger than 3MB!");
      input.value = "";
    } else {
      const reader = new FileReader();
      if (this.#editMode.value === true) {
        this.#fileUploadedOnEditMode.value = files;
      } else {
        this.#fileUploaded.value = files;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result;
        this.#editorData.value.coverImage = String(base64);
      };
    }
  }

  handleTags(): void {
    if (this.#tag.value.length > 15 || this.#tag.value.length < 3) {
      this.notify("WARNING", "Tags must contain between 3 and 15 characters.");
      return;
    }
    if (this.#editorData.value.tags.length === 4) {
      this.notify("WARNING", "You have reached the tag limit.");
      return;
    }
    this.#editorData.value.tags.push(this.#tag.value);
    this.#tag.value = "";
  }

  onClickUpload(): void {
    const inputFile = document.getElementById("inputFile")!;
    const clickEvent = new MouseEvent("click", { bubbles: true });
    inputFile.dispatchEvent(clickEvent);
  }

  onKeyDownInTagInput(event: KeyboardEvent): void {
    if (event.key === "Backspace" && this.#tag.value === "") {
      this.#editorData.value.tags.pop();
    }
  }

  async search() {
    if (this.#term.value.length > 3) {
      this.#posts.value = await store.dispatch(
        postMethods.actions.searchByTitle,
        {
          title: this.#term.value,
        }
      );
    }
  }

  handleSelectedToEdit(post: IPostResponse) {
    store.commit(editorMethods.mutations.setEditMode, true);
    this.#fileUploaded.value = null;
    this.#posts.value = [];
    this.#term.value = "";
    this.#editorData.value.postId = post.id;
    this.#editorData.value.coverImage = post.coverImage;
    this.#editorData.value.title = post.title;
    this.#editorData.value.tags = post.tags;
    this.#editorData.value.coverImage = post.coverImage;
    this.#editorData.value.date = new Date(post.postedAt);
    this.#editorData.value.body = post.body;
    store.commit(
      editorMethods.mutations.setRichTextEditor,
      this.#editorData.value
    );
  }
}

export class RichTextEditorFunctions {
  #editorData: ComputedRef<IArticleData>;
  #session: ISession;

  constructor(params: {
    editorData: ComputedRef<IArticleData>;
    session: ISession;
  }) {
    this.#editorData = params.editorData;
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

  async submitPost() {
    this.notify("WARNING", "Sending post...");
    const uid = new ShortUniqueId({ length: 10 });
    const fileName = uid();
    const publicImageURL = await uploadImageToFirebase(
      this.#editorData.value.coverImage,
      fileName
    );
    const post = {
      title: this.#editorData.value.title,
      body: this.#editorData.value.body,
      tags: this.#editorData.value.tags,
      postedAt: new Date(),
      coverImage: publicImageURL,
      author: {
        id: this.#session.decodedToken!.user_id,
        email: this.#session.decodedToken!.email,
      },
    };
    await store.dispatch(editorMethods.actions.publishPost, post);
    store.commit(editorMethods.mutations.setRichTextEditor, {
      postId: undefined,
      tags: [],
      coverImage: "",
      title: "",
      date: new Date(),
      body: "",
    });
    this.notify("SUCCESS", "Post sent!");
  }
}

export class EditorFunctions {
  #textarea: Ref<HTMLTextAreaElement | undefined>;

  constructor(params: { textarea: Ref<HTMLTextAreaElement | undefined> }) {
    this.#textarea = params.textarea;
  }

  insertTab(event: KeyboardEvent): void {
    event.preventDefault();
    const textareaElement = this.#textarea.value;
    if (!textareaElement) {
      return;
    }
    handleMarkdown(textareaElement, "tab");
  }
}

export class EditModeButtonsFunctions {
  #editorData: ComputedRef<IArticleData>;
  #session: ISession;

  constructor(params: {
    editorData: ComputedRef<IArticleData>;
    session: ISession;
  }) {
    this.#editorData = params.editorData;
    this.#session = params.session;
  }

  handleCancelEdit() {
    store.commit(editorMethods.mutations.setEditMode, false);
    store.commit(editorMethods.mutations.setRichTextEditor, {
      postId: undefined,
      tags: [],
      coverImage: "",
      title: "",
      date: new Date(),
      body: "",
    });
  }

  async updatePost() {
    let coverImage = this.#editorData.value.coverImage;
    if (!this.#editorData.value.coverImage.includes("https://")) {
      const uid = new ShortUniqueId({ length: 10 });
      const fileName = uid();
      const publicImageURL = await uploadImageToFirebase(
        this.#editorData.value.coverImage,
        fileName
      );
      coverImage = publicImageURL;
    }
    const post = {
      id: this.#editorData.value.postId,
      title: this.#editorData.value.title,
      body: this.#editorData.value.body,
      tags: this.#editorData.value.tags,
      postedAt: this.#editorData.value.date,
      coverImage: coverImage,
      author: {
        id: this.#session.decodedToken!.user_id,
        email: this.#session.decodedToken!.email,
      },
    };
    await store.dispatch(editorMethods.actions.updatePost, post);
    store.commit(editorMethods.mutations.setRichTextEditor, {
      postId: undefined,
      tags: [],
      coverImage: "",
      title: "",
      date: new Date(),
      body: "",
    });
    store.commit(editorMethods.mutations.setEditMode, false);
  }
}
