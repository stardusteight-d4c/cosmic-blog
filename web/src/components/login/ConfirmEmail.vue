<script setup lang="ts">
import { computed, ref } from "vue";
import CodeInput from "./integrate/CodeInput.vue";
import { useAppStore } from "@/store";
import { confirmEmailStyles as css } from "./styles";
import { ConfirmEmailFunctions } from "@/functions/ConfirmEmailFunctions";
import Loader from "../@globals/Loader.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  encryptedCode: {
    type: String,
    required: true,
  },
});

const store = useAppStore();
const pastedCode = ref<number[]>([]);
const signUpData = computed(() => store.state.login.signUp);
const loading = ref<Boolean>(false);
const router = useRouter();

const refs = {
  loading,
};

const functions = new ConfirmEmailFunctions({
  encryptedCode: props.encryptedCode,
  pastedCode,
  signUpData,
});
</script>

<template>
  <main>
    <h2 :class="css.title">Confirm your email address!</h2>
    <div :class="css.inputsContainer">
      <div :class="css.inputContainer">
        <CodeInput
          v-for="index in 3"
          :index="index"
          :key="index"
          :pastedCode="pastedCode"
          @paste="functions.handlePaste($event)"
        />
      </div>
      <div :class="css.inputContainer">
        <CodeInput
          v-for="index in 3"
          :index="index + 3"
          :key="index + 3"
          :pastedCode="pastedCode"
          @paste="functions.handlePaste($event)"
        />
      </div>
    </div>
    <button
      @click="functions.confirmCode(refs.loading, router)"
      :class="css.confirmBtn"
    >
      <span v-if="!loading">Confirm</span>
      <Loader v-show="loading" />
    </button>
  </main>
</template>
