<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Send from '@globals/atoms/icons/Send.vue'

export default defineComponent({
  name: 'SubmitComment',
  components: { Send },
  setup() {
    const comment = ref('')
    const countCharacters = ref(0)

    watch(comment, (newValue) => {
      countCharacters.value = newValue.length
    })

    return {
      comment,
      countCharacters,
    }
  },
})
</script>

<template>
  <div class="flex items-start w-full">
    <img src="../../assets/my-memoji02.png" class="w-24 h-24 -ml-6 -mt-4" />
    <div class="relative z-0 w-full">
      <div
        class="triangle absolute top-[22px] -left-[19px] bg-[#252525] -rotate-90"
      />
      <textarea
        v-model="comment"
        placeholder="Leave a feedback or comment about it :)"
        :spellcheck="false"
        class="input group border border-transparent rounded-sm focus:border-blue-500 transition-all text-[#F2F2F2]/80 w-full h-40 outline-none p-4 bg-[#252525] resize-none"
      />
      <div class="flex items-center justify-between">
        <span
          :class="{
            'text-[#f2f2f280]': countCharacters <= 800,
            'text-orange-500': countCharacters > 800 && countCharacters <= 1255,
            'text-red-600': countCharacters > 1255,
            'font-medium': true,
          }"
          >{{ countCharacters }}/1255</span
        >
        <button :disabled="countCharacters > 1255">
          <Send size="28" />
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  background: #252525;
  font-size: 16px;
}

.triangle {
  width: 25px;
  height: 13px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
  background-image: linear-gradient(to top, #3b82f6, #8b5cf6);
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 2px 8px;
  border-radius: 999px;
  margin-top: 4px;
  transition: all 0.5s ease;
}

button:active:not(:disabled) {
  transform: scale(1) !important;
  transition: all 100ms ease;
}

button:disabled {
  cursor: not-allowed;
  filter: brightness(0.8);
  transition: none;
}

button:hover:not(:disabled) {
  transform: scale(1.1);
}

button svg {
  width: 16px;
}
</style>
