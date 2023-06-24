<script setup lang="ts">
import NotFound from "@/components/@globals/NotFound.vue";
import {
  InteractionsWithPosts,
  UserPresentation,
  BaseLayoutSlot,
} from "@/components/profile";
import { useAppStore } from "@/store";
import { profileMethods } from "@/store/modules/profile";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const loading = ref(true);
const route = useRoute();
const username = route.params.username;
const store = useAppStore();
const notFound = ref(false);

onMounted(async () => {
  try {
    const user = await store.dispatch(profileMethods.actions.getUserData, {
      username,
    });
    console.log(user);
    
    if (!user?.id) {
      notFound.value = true;
    }
    loading.value = false;
  } catch (error) {
    console.error("Error loading user data:", error);
    loading.value = false;
  }
});
</script>

<template>
  <BaseLayoutSlot v-if="!loading && !notFound">
    <template #main>
      <UserPresentation />
      <InteractionsWithPosts />
    </template>
  </BaseLayoutSlot>
  <NotFound v-if="notFound" />
</template>
