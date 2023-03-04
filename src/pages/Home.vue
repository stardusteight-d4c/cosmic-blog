<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {},
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
      <img src="../assets/hero.png" class="w-full" />

      <div class="max-w-[900px] mx-auto absolute inset-0 px-2 lg:py-4 lg:px-0">
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 flex items-center"
        >
          <img
            src="../assets/node-logo.svg"
            :class="{
              'animate-tech-from-up': true,
              'w-[100px] cursor-pointer transition-all duration-300 hover:scale-110': true,
            }"
          />
          <img
            src="../assets/typescript-logo.svg"
            class="animate-tech-from-down w-[100px] cursor-pointer transition-all duration-300 hover:scale-110"
          />
          <img
            src="../assets/react-logo.svg"
            class="animate-tech-from-up w-[100px] cursor-pointer transition-all duration-300 hover:scale-110"
          />
          <img
            src="../assets/vue-logo.svg"
            class="animate-tech-from-down w-[100px] cursor-pointer transition-all duration-300 hover:scale-110"
          />
        </div>
        <div class="w-[155px] h-[155px]">
          <img
            src="../assets/my-memoji.png"
            class="w-[155px] absolute -bottom-16 -left-6"
          />
        </div>
      </div>
    </div>
    <div class="max-w-[900px] mx-auto mt-14 px-2 lg:py-4 lg:px-0">
      <h1 class="font-bold text-[40px]">Stardusteight</h1>
      <div
        class="bg-[#252525] text-[#F2F2F2]/90 mt-4 w-full max-w-[550px] rounded-sm p-4"
      >
        <div class="flex items-start gap-x-2">
          <img src="../assets/star-struck.png" class="w-5 mt-[2px]" />
          <p class="leading-6">
            Olá! Sou Gabriel Sena, desenvolvedor web focado na Stack Javascript!
            Gosto de estudar as tendências do mercado, busco sempre desenvolver
            aplicações web de ponta a ponta sempre extraindo o melhor de cada
            tecnologia.
            <br />
            <br />
            Node.js | Typescript | React | Vue
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
