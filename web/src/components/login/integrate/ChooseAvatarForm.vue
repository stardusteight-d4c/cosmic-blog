<script setup lang="ts">
import { ref, computed } from "vue";
import { ChooseAvatarPopUp } from "@/components/pop-ups";
import avatarPlaceholder from "@/assets/avatar-placeholder.svg";
import { ArrowUUPLeft } from "@/components/@globals/atoms/icons";
import { chooseAvatarFormStyles as css } from "./styles";
import ConfirmEmail from "../ConfirmEmail.vue";
import useNotificator from "@/hooks/Notificator";
import { useAppStore } from "@/store";
import { getAvatarUrlById } from "@/utils";
import { loginMethods } from "@/store/modules/login";
import Loader from "@/components/@globals/Loader.vue";

const emit = defineEmits(["backStep"]);

const { notify } = useNotificator();
const store = useAppStore();
const proceedToChooseAvatar = ref(false);
const proceedToConfirmEmail = ref(false);
const encryptedCode = ref();
const selectedAvatar = ref<null | string>(null);
const signUpData = computed(() => store.state.login.signUp);
const loading = ref<boolean>(false);

async function handleProceedToConfirmEmail() {
  loading.value = true;
  encryptedCode.value = await store.dispatch(
    loginMethods.actions.verifyEmail,
    signUpData.value.email
  );
  loading.value = false;
  notify("SUCCESS", "Code sent to registered email!");
  proceedToConfirmEmail.value = true;
}

function onClosedChooseAvatar(): void {
  proceedToChooseAvatar.value = false;
}

function onSelectedChooseAvatarPopUp(payload: { id: string }): void {
  selectedAvatar.value = payload.id;
}

function handleBackStep(): void {
  emit("backStep");
}

const avatarUrl = computed((): string | undefined => {
  store.commit(loginMethods.mutations.setSignUp, {
    ...signUpData.value,
    selectedAvatar: selectedAvatar.value,
  });
  return getAvatarUrlById(selectedAvatar.value!);
});
</script>

<template>
  <ConfirmEmail
    v-if="proceedToConfirmEmail === true"
    :encryptedCode="encryptedCode"
  />
  <main v-if="proceedToConfirmEmail === false">
    <h2 :class="css.title">Choose your avatar!</h2>
    <div :class="css.avatarWrapper">
      <div :class="css.avatarContainer">
        <img
          v-if="selectedAvatar === null"
          @click="proceedToChooseAvatar = true"
          :src="avatarPlaceholder"
          :class="css.placeholderAvatarImage"
        />
        <ChooseAvatarPopUp
          @selectedChooseAvatarPopUp="onSelectedChooseAvatarPopUp"
          @closedChooseAvatarPopUp="onClosedChooseAvatar"
          v-if="proceedToChooseAvatar"
        />
        <div
          @click="proceedToChooseAvatar = true"
          v-if="selectedAvatar"
          :class="css.selectedAvatarContainer"
        >
          <img :src="avatarUrl!" :class="css.avatarImage" />
          <div :class="css.boxAnimate" />
          <div :class="css.backgroundOverlay" />
        </div>
      </div>
    </div>
    <div :class="css.buttonsContainer">
      <button @click="handleBackStep" :class="css.backStepBtn">
        <ArrowUUPLeft width="20" height="20" /> Back
      </button>
      <button
        @click="handleProceedToConfirmEmail"
        :disabled="selectedAvatar === null"
        :class="css.createBtn"
      >
        <span v-if="!loading">Create</span>
        <Loader v-show="loading" />
      </button>
    </div>
  </main>
</template>
