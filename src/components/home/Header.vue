<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { techs, descriptions } from '@/utils/data'
import myMemoji01 from '@/assets/my-memoji01.png'
import myMemoji02 from '@/assets/my-memoji02.png'
import myMemoji03 from '@/assets/my-memoji03.png'
import headerBackground from '@/assets/hero.png'
import smilingHeartEyes from '@/assets/smiling-face-with-heart-eyes.png'
type techs = 'backend' | 'language' | 'frontend' | 'database'

export default defineComponent({
  name: 'Header',
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

    const assets = {
      headerBackground
    }

    return {
      memojis,
      techs,
      descriptions,
      smilingHeartEyes,
      handleTechs,
      findSecret,
      handleMemoji,
      currentMemoji,
      assets,
      currentTechs,
    }
  },
})
</script>

<template>
  <div class="relative overflow-visible">
    <img
      :src="assets.headerBackground"
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
