<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { techs, descriptions } from '../mock-data'
import myMemoji01 from '../assets/my-memoji01.png'
import myMemoji02 from '../assets/my-memoji02.png'
import myMemoji03 from '../assets/my-memoji03.png'
import smilingHeartEyes from '../assets/smiling-face-with-heart-eyes.png'
import PostCard from '../components/PostCard.vue'
type techs = 'backend' | 'language' | 'frontend' | 'database'

// Fazer um description dropdown das techs do hero
// Fazer a interface do post
// Alternar a troca de idioma para textos estáticos na home Portugues to English
// adicionar mais techs e fazer um componente da mesma

export default defineComponent({
  name: 'Home',
  components: { PostCard },
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
      <header class="py-1 px-2 lg:py-4 lg:px-0">
        <nav>
          <div
            class="flex flex-col justify-between mt-2 md:mt-0 md:flex-row items-center gap-x-1"
          >
            <div
              class="flex cursor-pointer text-transparent bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text items-center gap-x-1"
            >
              <router-link to="/" class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#3b82f6"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <path
                    d="M59.3,40H196.7a8,8,0,0,1,5.6,13.7L128,128,53.7,53.7A8,8,0,0,1,59.3,40Z"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></path>
                  <path
                    d="M59.3,216H196.7a8,8,0,0,0,5.6-13.7L128,128,53.7,202.3A8,8,0,0,0,59.3,216Z"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></path>
                  <line
                    x1="72"
                    y1="72"
                    x2="184"
                    y2="72"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></line>
                </svg>
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
            <div class="flex items-center gap-x-2">
              <router-link to="/create-post">
                <button>
                  <svg
                    class="css-i6dzq1"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    fill="none"
                    stroke-width="2"
                    stroke="#F2F2F2"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                    ></path>
                  </svg>
                  New
                </button>
              </router-link>
              <router-link to="/login">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="css-i6dzq1"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    fill="none"
                    stroke-width="2"
                    stroke="#F2F2F2"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                  Login
                </button>
              </router-link>

              <div class="relative w-8 ml-4">
                <div class="spinner">
                  <div class="spinner1"></div>
                </div>
                <img
                  src="https://github.com/stardusteight-d4c.png"
                  class="w-8 h-8 rounded-full absolute transform cursor-pointer backdrop-blur-sm object-cover -top-[3px] z-50"
                />
              </div>
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

      <div class="max-w-[725px] mx-auto absolute inset-0 px-2 lg:py-4 lg:px-0">
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-x-3"
        >
          <div class="relative group">
            <img
              v-bind:src="techs.backend[currentTechs[0]]"
              @click="handleTechs('backend')"
              class="animate-tech-from-up w-[100px] rounded-sm select-none cursor-pointer transition-all ease-in-out duration-300 hover:scale-110"
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
              class="animate-tech-from-down w-[100px] rounded-sm select-none cursor-pointer transition-all ease-in-out duration-300 hover:scale-110"
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
              class="animate-tech-from-up w-[100px] rounded-sm select-none cursor-pointer transition-all ease-in-out duration-300 hover:scale-110"
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
              class="animate-tech-from-down w-[100px] rounded-sm select-none cursor-pointer transition-all ease-in-out duration-300 hover:scale-110"
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
          class="bg-[#252525] text-[#F2F2F2]/90 max-w-[550px] rounded-sm p-4"
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
          class="flex flex-col justify-center items-center m-auto text-[#F2F2F2]/60"
        >
          <a
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
                  class="input"
                />

                <div
                  class="flex items-center hover:bg-[#252525] transition-all justify-center rounded-sm cursor-pointer p-1 w-fit"
                >
                  <ph-sliders :size="24" />
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <div class="flex items-center justify-end mt-4 text-[#7c7c7c]">
          <ph-arrow-left
            :size="42"
            class="cursor-pointer hover:text-[#b8b8b8] p-1"
          />
          <span class="text-lg font-semibold">1</span>
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
          <ph-copyright :size="16" />
          {{ new Date().getFullYear() }}
          - All rights reserved.
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

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-image: linear-gradient(to top, #3b82f6, #8b5cf6);
  border: solid 3px transparent;
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 4px 10px;
  border-radius: 50px;
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

.spinner {
  background-image: linear-gradient(#8b5cf6 35%, #3b82f6);
  width: 24px;
  height: 24px;
  animation: spinning82341 1.7s linear infinite;
  text-align: center;
  border-radius: 50px;
  filter: blur(1px);
  box-shadow: 0px -5px 20px 0px #8b5cf6, 0px 5px 20px 0px #3b82f6;
}

.spinner1 {
  background-color: rgb(36, 36, 36);
  width: 24px;
  height: 24px;
  border-radius: 50px;
  filter: blur(10px);
}

@keyframes spinning82341 {
  to {
    transform: rotate(360deg);
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

.input {
  background: none;
  border: none;
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

.animated-bounce {
  animation: bounce ease-in-out 0.3s;
}

.animated-left {
  animation: from-left ease-in 0.6s;
}
</style>
