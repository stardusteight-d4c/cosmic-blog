<script setup lang="ts">
import { calculateDelay } from "@/utils";
import { LabelSpan } from "./integrate";
import { signInStyles as css } from "./styles";
import { useAppStore } from "@/store";
import { loginMethods } from "@/store/modules/login";
import useNotificator from "@/hooks/Notificator";
import { useRouter } from "vue-router";

const emit = defineEmits(["changeToSignUp"]);

const store = useAppStore();
const router = useRouter()
const { notify } = useNotificator();
const usernameOrEmailSpan = "Username or Email".split("");
const passwordSpan = "Password".split("");

const formData = {
  usernameOrEmail: "",
  password: "",
};

async function signIn() {
  try {
    const data = await store.dispatch(loginMethods.actions.sign, {
      identifier: formData.usernameOrEmail.toLowerCase(),
      password: formData.password,
    });
    if (data) {
      router.push(`/profile/${data.user.username}`);
    }
  } catch (error) {
    notify("ERROR", "Incorrect username or password!");
  }
}

function handleSignUp(): void {
  emit("changeToSignUp", "SignUp");
}
</script>

<template>
  <div :class="css.wrapper">
    <form>
      <div :class="css.headerContainer">
        <h1 :class="css.title">Sign In</h1>
        <span :class="css.dontHaveAccountSpan"
          >Don't have an account?
          <span :class="css.signUpSpan" @click="handleSignUp">Sign Up</span>
        </span>
      </div>
      <div :class="css.flexCenterGapX4">
        <div :class="css.formControl">
          <input v-model="formData.usernameOrEmail" type="text" required />
          <label>
            <LabelSpan
              v-for="(letter, index) in usernameOrEmailSpan"
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
      </div>
      <button @click="signIn" type="button" :class="css.submitBtn">
        Sign In
      </button>
    </form>
  </div>
</template>
