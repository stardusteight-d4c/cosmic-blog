<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    const setSearch = ref(false)

    return {
      setSearch,
    }
  },
})
</script>

<template>
  <div class="bg-[#1a1a1a] text-[#F2F2F2] h-screen w-screen">
    <div class="max-w-[900px] mx-auto">
      <header class="py-1 px-2 lg:py-4 lg:px-0 lg:max-w-[800px]">
        <nav>
          <div
            class="flex flex-col mt-2 md:mt-0 md:flex-row items-center gap-x-1"
          >
            <div
              class="flex cursor-pointer text-transparent bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text items-center gap-x-1"
            >
              <router-link to="/" class="flex items-center">
                <ph-hourglass-simple-high :size="32" class="text-blue-500" />
                <span
                  class="uppercase tracking-widest font-bold text-lg lg:text-3xl"
                  >Cosmic</span
                >
              </router-link>
              <h2
                class="text-[#F2F2F2] whitespace-nowrap cursor-default font-medium text-lg"
              >
                / Home
              </h2>
            </div>
          </div>
        </nav>
      </header>
    </div>
    <div class="relative overflow-visible">
      <img
        src="../assets/hero.png"
        class="w-full pointer-events-none select-none"
      />

      <div class="max-w-[900px] mx-auto absolute inset-0 px-2 lg:py-4 lg:px-0">
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-x-3"
        >
          <img
            title="Node.js"
            src="../assets/node-logo.svg"
            class="animate-tech-from-up w-[100px] rounded-sm hover:shadow-xl hover:shadow-black/50 select-none cursor-pointer transition-all ease-in-out duration-200 hover:scale-110"
          />
          <img
            title="TypeScript"
            src="../assets/typescript-logo.svg"
            class="animate-tech-from-down w-[100px] rounded-sm hover:shadow-xl hover:shadow-black/50 select-none cursor-pointer transition-all ease-in-out duration-200 hover:scale-110"
          />
          <img
            title="React"
            src="../assets/react-logo.svg"
            class="animate-tech-from-up w-[100px] rounded-sm hover:shadow-xl hover:shadow-black/50 select-none cursor-pointer transition-all ease-in-out duration-200 hover:scale-110"
          />
          <img
            title="Vue.js"
            src="../assets/vue-logo.svg"
            class="animate-tech-from-down w-[100px] rounded-sm hover:shadow-xl hover:shadow-black/50 select-none cursor-pointer transition-all ease-in-out duration-200 hover:scale-110"
          />
        </div>
        <div class="w-[155px] h-[155px]">
          <img
            src="../assets/my-memoji.png"
            class="w-[155px] absolute -bottom-16 -left-6 pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
    <div class="max-w-[900px] mx-auto mt-14 px-2 lg:py-4 lg:px-0">
      <h1 class="font-bold text-[40px]">Stardusteight</h1>
      <div
        class="flex items-start gap-x-[45px] mt-4 w-full pb-[45px] border-b border-b-[#F2F2F2]/20"
      >
        <div
          class="bg-[#252525] text-[#F2F2F2]/90 max-w-[550px] rounded-sm p-4"
        >
          <div class="flex items-start gap-x-2">
            <img src="../assets/star-struck.png" class="w-5 mt-[2px]" />
            <p class="leading-6">
              Olá! Sou Gabriel Sena, desenvolvedor web focado na Stack
              JavaScript! Gosto de estudar as tendências do mercado, busco
              sempre desenvolver aplicações web de ponta a ponta sempre
              extraindo o melhor de cada tecnologia.
              <br />
              <br />
              Node.js | TypeScript | React | Vue.js
            </p>
          </div>
        </div>
        <div
          class="flex flex-col justify-center items-center m-auto text-[#F2F2F2]/60"
        >
          <a href="https://github.com/stardusteight-d4c" target="_blank">
            <img
              title="GitHub"
              src="../assets/qrcode.svg"
              class="w-[125px] cursor-pointer hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 hover:scale-105 hover:brightness-110"
            />
          </a>
        </div>
      </div>
      <div class="mt-20 mb-24">
        <div class="w-full flex justify-between border-b border-b-[#F2F2F2]/20">
          <div
            class="flex items-center justify-center rounded-sm cursor-pointer hover:bg-[#252525] p-1 pr-[6px] gap-x-1 border-b-[2px] border-[#F2F2F2] w-fit"
          >
            <ph-squares-four :size="24" />Gallery view
          </div>
          <div class="flex items-center">
            <div
              @click="setSearch = !setSearch"
              :class="{
                'bg-[#252525]': setSearch,
                'flex items-center rounded-sm cursor-pointer hover:bg-[#252525] p-1 w-fit': true,
              }"
            >
              <ph-magnifying-glass :size="24" class="text-[#F2F2F2]/50" />
            </div>
            <Transition>
              <div v-if="setSearch" class="flex items-center">
                <input
                  type="text"
                  placeholder="Search for a post"
                  class="p-1 bg-transparent outline-none"
                />

                <div
                  class="flex items-center justify-center rounded-sm cursor-pointer hover:bg-[#252525] p-1 w-fit"
                >
                  <ph-sliders :size="24" class="text-[#F2F2F2]/50" />
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
