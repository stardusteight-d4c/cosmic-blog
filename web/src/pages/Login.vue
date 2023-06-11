<script setup lang="ts">
import { ref } from "vue";
import { BaseLayoutSlot } from "@/components/login";
import SignUp from "@/components/login/SignUp.vue";
import SignIn from "@/components/login/SignIn.vue";

const typeOfLogin = ref<"SignIn" | "SignUp">("SignIn");

function changeToSignIn(payload: "SignIn") {
  typeOfLogin.value = payload;
}
function changeToSignUp(payload: "SignIn") {
  typeOfLogin.value = payload;
}
</script>

<template>
  <BaseLayoutSlot>
    <template #main>
      <SignIn
        @changeToSignUp="changeToSignUp"
        v-if="typeOfLogin === 'SignIn'"
      />
      <SignUp
        @changeToSignIn="changeToSignIn"
        v-if="typeOfLogin === 'SignUp'"
      />
    </template>
  </BaseLayoutSlot>
</template>
