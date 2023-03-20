<script lang="ts">
import { defineComponent } from 'vue'
import starStruck from '@/assets/star-struck.png'
import QRcode from '@/assets/qrcode.svg'

export default defineComponent({
  name: 'Bio',
  setup(_props, { emit }) {
    const assets = {
      starStruck,
      QRcode,
    }

    return { assets }
  },
})
</script>

<template>
  <div>
    <h1 class="font-bold text-[40px]">Stardusteight</h1>
    <div class="flex items-start gap-x-2 mt-4 w-full pb-[45px]">
      <div
        class="bg-[#252525] shadow-md shadow-black/20 text-[#F2F2F2]/90 max-w-[550px] rounded-sm p-4"
      >
        <div class="flex items-start gap-x-2">
          <img :src="assets.starStruck" class="w-5 mt-[2px]" />
          <p class="leading-6">
            Olá! Sou Gabriel Sena, desenvolvedor web focado na Stack JavaScript!
            Gosto de estudar as tendências do mercado e busco sempre desenvolver
            aplicações web de ponta a ponta sempre extraindo o melhor de cada
            tecnologia.
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
            :src="assets.QRcode"
            class="w-[100px] cursor-pointer transition-all duration-500"
          />
        </a>
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
