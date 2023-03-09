<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { techs, descriptions } from '../mock-data'
import myMemoji01 from '../assets/my-memoji01.png'
import myMemoji02 from '../assets/my-memoji02.png'
import myMemoji03 from '../assets/my-memoji03.png'
import smilingHeartEyes from '../assets/smiling-face-with-heart-eyes.png'
import PostCard from '../components/post/globals/Card.vue'
import Navbar from '../components/navbar/Navbar.vue'
type techs = 'backend' | 'language' | 'frontend' | 'database'

export default defineComponent({
  name: 'Home',
  components: { PostCard, Navbar },
  setup() {
    const setSearch = ref(false)
    const memojis: string[] = [myMemoji01, myMemoji02, myMemoji03]
    let currentMemoji = ref(0)
    let currentTechs = ref([0, 0, 0, 0])
    const findSecret = ref(
      currentTechs.value[0] === 2 &&
        currentTechs.value[1] === 1 &&
        currentTechs.value[2] === 0 &&
        currentTechs.value[3] === 4
    )

    function handleTechs(array: techs) {
      const techsKeys = ['backend', 'language', 'frontend', 'database']
      const currentTech = techsKeys.findIndex((item) => item === array)
      const penultimateItemIndex = techs[array].length - 2
      const lastItemIndex = techs[array].length
      if (currentTechs.value[currentTech] <= penultimateItemIndex) {
        currentTechs.value[currentTech]++
      } else if (currentTechs.value[currentTech] === lastItemIndex - 1) {
        currentTechs.value[currentTech] = 0
      }
    }

    function handleMemoji() {
      const penultimateItemIndex = memojis.length - 2
      const lastItemIndex = memojis.length
      if (currentMemoji.value <= penultimateItemIndex) {
        currentMemoji.value++
      } else if (currentMemoji.value === lastItemIndex - 1) {
        currentMemoji.value = 0
      }
    }

    watch(currentTechs.value, (currentTechsNewValue) => {
      findSecret.value =
        currentTechsNewValue[0] === 2 &&
        currentTechsNewValue[1] === 1 &&
        currentTechsNewValue[2] === 1 &&
        currentTechsNewValue[3] === 2
    })

    return {
      setSearch,
      memojis,
      techs,
      descriptions,
      smilingHeartEyes,
      handleTechs,
      findSecret,
      handleMemoji,
      currentMemoji,
      currentTechs,
    }
  },
})
</script>

<template>
  <div class="bg-[#1a1a1a] text-[#F2F2F2] w-screen">
    <div class="max-w-[725px] mx-auto">
      <Navbar path="home" />
    </div>
    <div class="relative overflow-visible">
      <img
        src="../assets/hero.png"
        class="w-full pointer-events-none select-none"
      />

      <div class="max-w-[725px] mx-auto absolute inset-0 px-2 lg:py-4 lg:px-0">
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-x-3"
        >
          <div class="relative group">
            <img
              v-bind:src="techs.backend[currentTechs[0]]"
              @click="handleTechs('backend')"
              class="animate-tech-from-up w-[100px] rounded-sm select-none cursor-pointer shadow-md shadow-black/20 transition-all ease-in-out duration-300 hover:scale-110"
            />
            <div
              class="absolute z-10 hidden group-hover:block text-[#F2F2F2]/90 font-medium -left-[125px] mt-4 w-[350px] bg-black/80 backdrop-blur-md transform text-sm leading-5 p-2 rounded-sm"
            >
              <div
                class="triangle absolute left-1/2 -translate-x-1/2 -top-[10px] bg-black/80"
              />
              <p v-html="descriptions.backend[currentTechs[0]]" />
            </div>
          </div>
          <div class="relative group">
            <img
              v-bind:src="techs.language[currentTechs[1]]"
              @click="handleTechs('language')"
              class="animate-tech-from-down w-[100px] rounded-sm select-none cursor-pointer shadow-md shadow-black/20 transition-all ease-in-out duration-300 hover:scale-110"
            />
            <div
              class="absolute z-10 hidden group-hover:block text-[#F2F2F2]/90 font-medium -left-[125px] mt-4 w-[350px] bg-black/80 backdrop-blur-md transform text-sm leading-5 p-2 rounded-sm"
            >
              <div
                class="triangle absolute left-1/2 -translate-x-1/2 -top-[10px] bg-black/80"
              />
              <p v-html="descriptions.language[currentTechs[1]]" />
            </div>
          </div>
          <div class="relative group">
            <img
              v-bind:src="techs.frontend[currentTechs[2]]"
              @click="handleTechs('frontend')"
              class="animate-tech-from-up w-[100px] rounded-sm select-none cursor-pointer shadow-md shadow-black/20 transition-all ease-in-out duration-300 hover:scale-110"
            />
            <div
              class="absolute z-10 hidden group-hover:block text-[#F2F2F2]/90 font-medium -left-[125px] mt-4 w-[350px] bg-black/80 backdrop-blur-md transform text-sm leading-5 p-2 rounded-sm"
            >
              <div
                class="triangle absolute left-1/2 -translate-x-1/2 -top-[10px] bg-black/80"
              />
              <p v-html="descriptions.frontend[currentTechs[2]]" />
            </div>
          </div>
          <div class="relative group">
            <img
              v-bind:src="techs.database[currentTechs[3]]"
              @click="handleTechs('database')"
              class="animate-tech-from-down w-[100px] rounded-sm select-none cursor-pointer shadow-md shadow-black/20 transition-all ease-in-out duration-300 hover:scale-110"
            />
            <div
              class="absolute z-10 hidden group-hover:block text-[#F2F2F2]/90 font-medium -left-[125px] mt-4 w-[350px] bg-black/80 backdrop-blur-md transform text-sm leading-5 p-2 rounded-sm"
            >
              <div
                class="triangle absolute left-1/2 -translate-x-1/2 -top-[10px] bg-black/80"
              />
              <p v-html="descriptions.database[currentTechs[3]]" />
            </div>
          </div>

          <span
            v-if="findSecret"
            class="absolute flex items-center gap-x-2 inset-x-0 -top-[30px] justify-center text-[#F2F2F2]/80 text-xs font-medium p-1 bg-black/50 rounded-sm"
            >*Principais ferramentas utilizadas na construção do blog!!
            <img :src="smilingHeartEyes" class="w-4"
          /></span>
        </div>
        <div class="w-[155px] h-[155px]">
          <img
            @click="handleMemoji"
            v-bind:src="memojis[currentMemoji]"
            v-bind:key="currentMemoji"
            class="animated-bounce w-[155px] absolute -bottom-16 -left-6 cursor-pointer select-none"
          />
        </div>
      </div>
    </div>
    <div class="max-w-[725px] mx-auto mt-14 px-2 lg:py-4 lg:px-0">
      <h1 class="font-bold text-[40px]">Stardusteight</h1>
      <div
        class="flex items-start gap-x-2 mt-4 w-full pb-[45px] border-b border-b-[#F2F2F2]/20"
      >
        <div
          class="bg-[#252525] shadow-md shadow-black/20 text-[#F2F2F2]/90 max-w-[550px] rounded-sm p-4"
        >
          <div class="flex items-start gap-x-2">
            <img src="../assets/star-struck.png" class="w-5 mt-[2px]" />
            <p class="leading-6">
              Olá! Sou Gabriel Sena, desenvolvedor web focado na Stack
              JavaScript! Gosto de estudar as tendências do mercado e busco
              sempre desenvolver aplicações web de ponta a ponta sempre
              extraindo o melhor de cada tecnologia.
              <br />
              <br />
              Node.js | TypeScript | React | Vue.js
            </p>
          </div>
        </div>
        <div
          class="flex flex-col shadow-md shadow-black/20 justify-center items-center m-auto text-[#F2F2F2]/60"
        >
          <a
            title="GitHub"
            href="https://github.com/stardusteight-d4c"
            target="_blank"
            class="active:scale-95"
          >
            <img
              src="../assets/qrcode.svg"
              class="w-[100px] cursor-pointer transition-all duration-500"
            />
          </a>
        </div>
      </div>
      <div class="mt-8">
        <div
          class="w-full flex justify-between border-b text-[#F2F2F2]/80 border-b-[#F2F2F2]/20"
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

        <div class="grid grid-cols-2 gap-4 mt-4">
          <PostCard :full="true" />
          <PostCard :full="true" />
          <PostCard :full="true" />
          <PostCard :full="true" />
          <PostCard :full="true" />
          <PostCard :full="true" />
        </div>
        <div class="flex items-center justify-end mt-4 text-[#7c7c7c]">
          <ph-arrow-left
            :size="42"
            class="cursor-pointer hover:text-[#b8b8b8] p-1"
          />
          <span class="text-lg font-semibold">0</span>
          <ph-arrow-right
            :size="42"
            class="cursor-pointer hover:text-[#b8b8b8] p-1"
          />
        </div>
      </div>
    </div>
    <footer
      class="p-8 mt-28 border-t border-t-[#F2F2F2]/20 text-[#F2F2F2]/60 flex flex-col items-center text-center justify-center"
    >
      <div>
        <a
          href="https://github.com/stardusteight-d4c"
          target="_blank"
          class="flex justify-center hover:underline"
          >Gabriel Sena</a
        >
        <span
          class="flex items-center text-xs justify-center gap-x-1 text-[#F2F2F2]/30"
        >
          <ph-copyright :size="16" /> 2023 - {{ new Date().getFullYear() }}, All
          rights reserved.
        </span>
        <img
          src="../assets/brazil.png"
          class="w-6 mx-auto opacity-80 mt-1 cursor-pointer"
        />
      </div>
    </footer>
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
