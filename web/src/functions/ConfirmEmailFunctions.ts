import { store } from "@/store";
import { loginMethods } from "@/store/modules/login";
import { notificationMethods } from "@/store/modules/notification";
import bcryptjs from "bcryptjs";
import { ComputedRef, Ref } from "vue";
import { Router } from "vue-router";

export class ConfirmEmailFunctions {
  #pastedCode: Ref<number[]>;
  #encryptedCode: string;
  #signUpData: ComputedRef<ISignUpData>;

  constructor(params: {
    pastedCode: Ref<number[]>;
    encryptedCode: string;
    signUpData: ComputedRef<ISignUpData>;
  }) {
    this.#pastedCode = params.pastedCode;
    this.#encryptedCode = params.encryptedCode;
    this.#signUpData = params.signUpData;
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

  handlePaste(event: ClipboardEvent) {
    const pastedText = event.clipboardData?.getData("text");
    if (!pastedText) {
      return;
    }
    if (pastedText?.length != 6) {
      this.notify("ERROR", "A valid code was not entered!");
    }
    const arrayOfNumber = pastedText.split("").map((item) => Number(item));
    const isAllNumbers = arrayOfNumber.every(
      (elemento) => typeof elemento === "number" && !Number.isNaN(elemento)
    );
    if (isAllNumbers) {
      this.#pastedCode.value = arrayOfNumber;
    } else {
      this.notify("ERROR", "A valid code was not entered!");
    }
  }

  getCombinedInputValue() {
    let combinedString = "";
    for (let i = 1; i <= 6; i++) {
      const inputId = `input-${i}`;
      const inputElement = document.getElementById(inputId) as HTMLInputElement;
      if (inputElement) {
        const inputValue = inputElement.value;
        combinedString += inputValue;
      }
    }
    return combinedString;
  }

  async confirmCode(loading: Ref<Boolean>, router: Router) {
    loading.value = true;
    const code = this.getCombinedInputValue();
    const isCodeValid = bcryptjs.compareSync(code, this.#encryptedCode);
    if (isCodeValid) {
      const registerData: IRegisterUserData = {
        email: this.#signUpData.value.email,
        avatar: this.#signUpData.value.selectedAvatar!,
        username: this.#signUpData.value.username,
        password: this.#signUpData.value.password,
        userRole: "author",
      };
      const data = await store.dispatch(
        loginMethods.actions.registerUser,
        registerData
      );
      loading.value = false;
      if (data) {
        router.push(`/profile/${data.user.username}`);
      }
    } else {
      loading.value = false;
      this.notify("ERROR", "The code does not match the code sent!");
    }
  }
}
