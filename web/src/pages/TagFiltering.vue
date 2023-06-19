<script setup lang="ts">
import BaseLayoutSlot from "@/components/tag-filtering/BaseLayoutSlot.vue";
import Results from "@/components/tag-filtering/Results.vue";
import { useAppStore } from "@/store";
import { postMethods } from "@/store/modules/post";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const loading = ref(true);
const route = useRoute();
const tag = route.query.equals;
const store = useAppStore();

onMounted(async () => {
  try {
    const payload = {
      tag,
      skip: 0,
    };
    await store.dispatch(postMethods.actions.getFilteringPosts, payload);
    loading.value = false;
  } catch (error) {
    console.error("Error loading filtered posts data:", error);
    loading.value = false;
  }
});
</script>

<template>
  <BaseLayoutSlot>
    <template #main>
      <Results />
    </template>
  </BaseLayoutSlot>
</template>
