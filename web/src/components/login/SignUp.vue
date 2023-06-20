<script setup lang="ts">
import { computed, ref } from "vue";
import { LabelSpan, ChooseAvatarForm } from "./integrate";
import { calculateDelay } from "@/utils";
import { signUpStyles as css } from "./styles";
import { useAppStore } from "@store/index";
import { loginMethods } from "@/store/modules/login";
import useNotificator from "@/hooks/Notificator";
import { GET } from "@/http";

const emit = defineEmits(["changeToSignIn"]);

const store = useAppStore();
const { notify } = useNotificator();
const usernameSpan = "Username".split("");
const emailSpan = "Email".split("");
const passwordSpan = "Password".split("");
const confirmPasswordSpan = "Confirm Password".split("");
const nextStep = ref<boolean>(false);

const isButtonDisabled = computed(() => {
  for (const key in formData.value) {
    if (Object.prototype.hasOwnProperty.call(formData.value, key)) {
      const value = formData.value[key as keyof typeof formData.value];
      if (typeof value !== "string" || value.trim().length <= 0) {
        return true;
      }
    }
  }
  return false;
});

const formData = ref<{
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

function handleBackStep(): void {
  nextStep.value = false;
}

async function handleNextStep(): Promise<void> {
  const usernameRegex = /^(?=.*[a-z])[a-z0-9]{3,}$/;
  const passwordRegex = /^(?=.*\d).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(formData.value.email);
  const isValidUsername = usernameRegex.test(formData.value.username);
  if (!isValidUsername || formData.value.username.length > 13) {
    notify(
      "ERROR",
      `The username must contain only lowercase letters, at least 3
      characters, a maximum of 13 characters and must not contain special characters.`
    );
    return;
  }
  if (!isValidEmail) {
    notify("ERROR", `Enter a valid email address!`);
    return;
  }
  const usernameAlreadyExist = await GET.findByUsername(
    formData.value.username
  );
  const emailAlreadyExist = await GET.findEmail(formData.value.email);
  if (usernameAlreadyExist?.id) {
    notify("WARNING", "The username is already in use!");
    return;
  }
  if (emailAlreadyExist) {
    notify("WARNING", "The email is already in use!");
    return;
  }
  if (formData.value.password !== formData.value.confirmPassword) {
    notify("ERROR", "Passwords do not match!");
    return;
  }
  if (!passwordRegex.test(formData.value.password)) {
    notify("ERROR", "Password must be at least 8 characters and a number.");
    return;
  }
  store.commit(loginMethods.mutations.setSignUp, {
    ...formData.value,
    username: formData.value.username.trim(),
  });
  nextStep.value = true;
}

function handleSignIn(): void {
  emit("changeToSignIn", "SignIn");
}
</script>

<template>
  <div :class="css.wrapper">
    <form @submit.prevent="handleNextStep" v-if="nextStep === false">
      <div :class="css.headerContainer">
        <h1 :class="css.title">Sign Up</h1>
        <span :class="css.alreadyHaveAnAccountSpan"
          >Already have an account?
          <span :class="css.signInSpan" @click="handleSignIn">Sign In</span>
        </span>
      </div>
      <div :class="css.flexCenterGapX4">
        <div :class="css.formControl">
          <input v-model="formData.username" type="text" required />
          <label>
            <LabelSpan
              v-for="(letter, index) in usernameSpan"
              :letter="letter"
              :delay="calculateDelay(index)"
            />
          </label>
        </div>
        <div :class="css.formControl">
          <input v-model="formData.email" type="text" required />
          <label>
            <LabelSpan
              v-for="(letter, index) in emailSpan"
              :letter="letter"
              :delay="calculateDelay(index)"
            />
          </label>
        </div>
      </div>
      <div :class="css.flexCenterGapX4">
        <div :class="css.formControl">
          <input v-model="formData.password" type="password" required />
          <label>
            <LabelSpan
              v-for="(letter, index) in passwordSpan"
              :letter="letter"
              :delay="calculateDelay(index)"
            />
          </label>
        </div>
        <div :class="css.formControl">
          <input v-model="formData.confirmPassword" type="password" required />
          <label>
            <LabelSpan
              v-for="(letter, index) in confirmPasswordSpan"
              :letter="letter"
              :delay="calculateDelay(index)"
            />
          </label>
        </div>
      </div>
      <button type="submit" :disabled="isButtonDisabled" :class="css.nextBtn">
        Next
      </button>
    </form>
    <ChooseAvatarForm @backStep="handleBackStep" v-if="nextStep === true" />
  </div>
</template>
