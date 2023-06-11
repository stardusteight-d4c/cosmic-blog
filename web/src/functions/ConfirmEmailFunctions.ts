import { IRegisterUserData, ISignUpData } from "@/@interfaces/login";
import { NotificationType } from "@/@interfaces/notification";
import router from "@/router";
import { store } from "@/store";
import { loginMethods } from "@/store/modules/login";
import { notificationMethods } from "@/store/modules/notification";
import bcryptjs from "bcryptjs";
import { ComputedRef, Ref } from "vue";

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

  async confirmCode() {
    const code = this.getCombinedInputValue();
    const isCodeValid = bcryptjs.compareSync(code, this.#encryptedCode);
    if (isCodeValid) {
      this.notify("SUCCESS", "A valid code was entered!");
      const registerData: IRegisterUserData = {
        email: this.#signUpData.value.email,
        avatar: this.#signUpData.value.selectedAvatar!,
        username: this.#signUpData.value.username,
        password: this.#signUpData.value.password,
        userRole: "reader",
      };
      const data = await store.dispatch(
        loginMethods.actions.registerUser,
        registerData
      );
      if (data) {
        router.push(`/profile/${data.user.id}`);
      }
    } else {
      this.notify("ERROR", "The code does not match the code sent!");
    }
  }
}
