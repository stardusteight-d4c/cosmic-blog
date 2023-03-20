<script lang="ts">
import { defineComponent } from 'vue'
import { removeScrollBehavior } from '@/utils/remove-scroll-behavior'
import { restoreScrollBehavior } from '@/utils/restore-scroll-behavior'

export default defineComponent({
  name: 'SavePopUp',
  setup(_props, { emit }) {
    function saveText() {
      const textareaElement: HTMLTextAreaElement = document.getElementById(
        'textarea'
      ) as HTMLTextAreaElement
      localStorage.setItem('saveText', textareaElement.value)
      emit('closedSavePopUp')
    }

    removeScrollBehavior()

    function handleCancel() {
      restoreScrollBehavior()
      emit('closedSavePopUp')
    }

    return {
      handleCancel,
      saveText,
    }
  },
})
</script>

<template>
  <portal to="savePopUp">
    <div class="inset-0 bg-black/40 z-[950] fixed" />
    <div
      class="bg-[#1a1a1a]/50 transform backdrop-blur-sm text-[#F2F2F2] w-[450px] border border-[#F2F2F220] shadow-lg shadow-black/70 fixed left-1/2 z-[1000] p-8 rounded-md top-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <div class="flex flex-col items-center justify-center">
        <ph-floppy-disk :size="48" class="text-blue-500" />
        <h2 class="text-3xl font-semibold">Are you sure?</h2>
        <span
          class="text-center inline-block w-[250px] text-sm text-[#F2F2F2]/70 mt-2"
          >This action will overwrite if there is already saved content and
          cannot be undone.</span
        >
      </div>
      <div class="flex items-center mx-auto mt-4 gap-x-2 w-fit">
        <button @click="saveText" class="bg-blue-500">Save</button>
        <button @click="handleCancel" class="bg-[#252525]">Cancel</button>
      </div>
    </div>
  </portal>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 80px;
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 4px 10px;
  border-radius: 999px;
  transition: all 0.5s ease;
}

button:active {
  transform: scale(1) !important;
  transition: all 100ms ease;
}

button:hover {
  transform: scale(1.1);
}

button svg {
  width: 16px;
}
</style>
