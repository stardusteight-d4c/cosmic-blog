<script setup lang="ts">
import { ref } from "vue";
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

const formData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function handleBackStep(): void {
  nextStep.value = false;
}

async function handleNextStep(): Promise<void> {
  const usernameRegex = /^(?=.*[a-z])[a-z0-9]{3,}$/;
  const passwordRegex = /^(?=.*\d).{8,}$/;
  const isValidUsername = usernameRegex.test(formData.username);
  if (!isValidUsername) {
    notify(
      "ERROR",
      `The username must contain only lowercase letters, at least 3
      characters and must not contain special characters.`
    );
    return;
  }
  const usernameAlreadyExist = await GET.findByUsername(formData.username);
  const emailAlreadyExist = await GET.findEmail(formData.email);
  if (usernameAlreadyExist.user.id) {
    notify("WARNING", "The username is already in use!");
    return;
  }
  if (emailAlreadyExist) {
    notify("WARNING", "The email is already in use!");
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    notify("ERROR", "Passwords do not match!");
    return;
  }
  if (!passwordRegex.test(formData.password)) {
    notify("ERROR", "Password must be at least 8 characters and a number.");
    return;
  }
  store.commit(loginMethods.mutations.setSignUp, formData);
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
          <input v-model="formData.email" type="email" required />
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
      <button type="submit" :class="css.nextBtn">Next</button>
    </form>
    <ChooseAvatarForm @backStep="handleBackStep" v-if="nextStep === true" />
  </div>
</template>
