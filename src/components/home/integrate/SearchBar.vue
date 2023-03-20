<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SearchBar',
  setup(_props, { emit }) {
    const setSearch = ref(false)

    return {
      setSearch,
    }
  },
})
</script>

<template>
  <div
    class="w-full mt-8 flex justify-between border-b text-[#F2F2F2]/80 border-b-[#F2F2F2]/20"
  >
    <div
      class="flex items-center justify-center rounded-sm cursor-pointer hover:bg-[#252525] p-1 pr-[6px] gap-x-1 border-b-[2px] border-[#F2F2F2] w-fit"
    >
      <ph-squares-four :size="24" />Gallery view
    </div>
    <div class="flex items-center">
      <div
        @click="setSearch = !setSearch"
        :key="String(setSearch)"
        class="animated-left bg-[#252525] flex items-center rounded-sm cursor-pointer p-1 w-fit"
      >
        <ph-magnifying-glass v-if="setSearch === false" :size="24" />
        <ph-x v-else :size="24" />
      </div>
      <Transition>
        <div v-if="setSearch" class="flex items-center">
          <input
            type="text"
            placeholder="Search for a post"
            class="input border border-transparent focus:border-blue-500 transition-all"
          />

          <div
            class="flex items-center bg-[#252525] transition-all justify-center rounded-sm cursor-pointer p-1 w-fit"
          >
            <ph-sliders :size="24" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.triangle {
  width: 15px;
  height: 10px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

@keyframes tech-from-up {
  0% {
    transform: translate3d(0px, -150px, 0px);
    opacity: 0;
  }
  100% {
    transform: translate3d(0px, 0px, 0px);
    opacity: 1;
  }
}

@keyframes tech-from-down {
  0% {
    transform: translate3d(0px, 150px, 0px);
    opacity: 0;
  }
  100% {
    transform: translate3d(0px, 0px, 0px);
    opacity: 1;
  }
}

.animate-tech-from-up {
  animation: tech-from-up 0.7s ease-out;
}

.animate-tech-from-down {
  animation: tech-from-down 0.7s ease-out;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.input {
  background: #252525;
  outline: none;
  max-width: 250px;
  padding-block: 4px;
  padding-inline: 10px;
  font-size: 16px;
  border-radius: 2px;
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  color: #f2f2f2;
}

@keyframes from-left {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  50% {
    transform: translateX(-20px);
    opacity: 0.5;
  }
  100% {
    transform: translateX(0);
    opacity: 0;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.animated-bounce {
  animation: bounce ease-in-out 0.3s;
}

.animated-left {
  animation: from-left ease-in 0.6s;
}
</style>
