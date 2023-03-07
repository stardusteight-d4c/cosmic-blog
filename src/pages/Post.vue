<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Star from '../atoms/Star.vue'
import comment from '../assets/comment.svg'
import DonutChart from '../components/DonutChart.vue'

// formatar string markdown em html do post

export default defineComponent({
  name: 'Post',
  components: { Navbar, Star, DonutChart },
  computed: {
    postId(): string {
      return String(this.$route.params.id)
    },
  },
  setup() {
    const route = useRoute()
    const id = route.params.id
    const scrollPercentage = ref(0)
    const scaleUp = ref(false)

    const onScroll = () => {
      const postHeight = document.querySelector('#post')!.clientHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY
      const maxScrollY = postHeight - windowHeight
      const newScrollPercentage = Math.min(scrollY / maxScrollY, 1) * 100
      scrollPercentage.value = newScrollPercentage
    }

    onMounted(() => {
      window.addEventListener('scroll', onScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll)
    })

    return { comment, scrollPercentage, scaleUp }
  },
})
</script>

<template>
  <div class="bg-[#1a1a1a] text-[#F2F2F2] w-screen">
    <Navbar path="post" />
    <div class="max-w-[725px] w-full mx-auto mb-28">
      <div id="post" class="relative shadow-md shadow-black/20">
        <div class="w-fit h-fit fixed bottom-4 right-4">
          <div class="flex items-center gap-x-2 group">
            <span
              class="animate-span hidden group-hover:block text-[#F2F2F2]/70"
              >Progress {{ parseInt(scrollPercentage.toFixed(0)) }}%
            </span>
            <div
              class="bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center"
            >
              <DonutChart :percentage="scrollPercentage" class="w-8" />
            </div>
          </div>
        </div>
        <div class="w-fit h-fit fixed bottom-20 right-4">
          <div class="flex items-center gap-x-2 group">
            <span
              class="animate-span hidden group-hover:block text-[#F2F2F2]/70"
            >
              {{ scaleUp ? 'Scale Down' : 'Scale Up' }}
            </span>
            <div
              @click="scaleUp = !scaleUp"
              class="bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center"
            >
              <ph-arrows-out v-if="!scaleUp" :size="32" />
              <ph-arrows-in-cardinal v-if="scaleUp" :size="32" />
            </div>
          </div>
        </div>
        <div class="relative">
          <img
            src="https://www.paulsblog.dev/content/images/size/w2000/2022/09/image--41-.webp"
            class="w-full h-[325px] rounded-t-sm object-cover"
          />
          <div class="mt-2 text-sm absolute cursor-default left-4 top-2">
            <span
              class="inner-shadoww inline-block border rounded-sm border-dashed border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
              >#Javascript</span
            >
            <span
              class="inner-shadoww inline-block border rounded-sm border-dashed border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
              >#Node.js</span
            >
            <span
              class="inner-shadoww inline-block border rounded-sm border-dashed border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
              >#React</span
            >
            <span
              class="inner-shadoww inline-block border rounded-sm border-dashed border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
              >#Vue.js</span
            >
          </div>
          <div
            class="inner-shadoww absolute right-4 top-2 mt-1 p-[2px] rounded-sm border border-dashed border-[#F2F2F2]/20 bg-[#1a1a1a]"
          >
            <ph-star color="#F2F2F270" class="w-8 h-8 cursor-pointer" />
          </div>
        </div>
        <div
          :class="{
            'scale-[1.30]': scaleUp,
            'bg-[#252525] rounded-b-sm mb-28 pt-4 shadow-md shadow-black/20 duration-500 cursor-default transition-all': true,
          }"
        >
          <div class="px-4">
            <span
              class="my-2 font-medium text-base text-[#F2F2F2]/60 flex items-center justify-center gap-x-1"
            >
              <ph-calendar-blank :size="20" />Mar 5, 2023
            </span>

            <h1
              class="text-3xl bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text text-transparent font-bold text-center"
            >
              GO! RN - Gestão de conhecimento focado em evolução do time
            </h1>
            <div
              class="border-b border-[#F2F2F2]/20 w-[50%] mx-auto mt-8 h-0"
            />

            <p
              class="text-lg font-medium mt-8 text-justify tracking-wide !leading-7 text-[#F2F2F2]/80"
            >
              Programação é o processo de escrita, teste e manutenção de um
              programa de computador. O programa é escrito em uma linguagem de
              programação, embora seja possível, com alguma dificuldade, o
              escrever diretamente em linguagem de máquina. Diferentes partes de
              um programa podem ser escritas em diferentes linguagens.
              Diferentes linguagens de programação funcionam de diferentes
              modos. Por esse motivo, os programadores podem criar programas
              muito diferentes para diferentes linguagens; muito embora,
              teoricamente, a maioria das linguagens possa ser usada para criar
              qualquer programa. Há várias décadas se debate se a programação é
              mais semelhante a uma arte (Donald Knuth), a uma ciência, à
              matemática (Edsger Dijkstra), à engenharia (David Parnas), ou se é
              um campo completamente novo.
              <br />
              <br />
              Natus corporis nesciunt nemo, placeat dignissimos inventore
              perspiciatis necessitatibus, magni saepe culpa harum pariatur in
              nihil similique velit sunt repudiandae fuga quis. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Aperiam amet rerum
              maiores inventore magnam sit quaerat tempore id cum consequuntur.
              Officia impedit totam doloremque qui placeat quas adipisci? Culpa,
              tempore?
              <br />
              <br />
              Natus corporis nesciunt nemo, placeat dignissimos inventore
              perspiciatis necessitatibus, magni saepe culpa harum pariatur in
              nihil similique velit sunt repudiandae fuga quis. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Aperiam amet rerum
              maiores inventore magnam sit quaerat tempore id cum consequuntur.
              Officia impedit totam doloremque qui placeat quas adipisci? Culpa,
              tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Harum praesentium, eligendi commodi tempore quidem ad est quas
              molestiae, voluptas labore provident possimus accusamus fuga iste
              dicta consequuntur architecto excepturi lorem Lorem ipsum, dolor
              sit amet consectetur adipisicing elit. Ab, aliquam a deleniti
              illum asperiores quos odio molestiae ipsa eveniet quae. Quod culpa
              voluptas possimus facere a dolores, nisi nobis repellat.
            </p>
          </div>
          <div class="border-t border-[#F2F2F2]/20 py-4 mt-8 text-[#F2F2F2]/50">
            <span class="flex t items-center justify-center gap-x-1">
              <Star class="w-4" /> Starred • 38
            </span>
            <span class="flex items-center justify-center gap-x-1">
              <img :src="comment" class="w-4" /> Comments • 2
            </span>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-start w-full">
          <img src="../assets/my-memoji02.png" class="w-24 h-24 -ml-4 -mt-4" />
          <textarea
            placeholder="Leave a feedback or comment about it :)"
            :spellcheck="false"
            class="input border border-transparent rounded-sm focus:border-blue-500 transition-all text-[#F2F2F2]/80 w-full h-40 outline-none p-4 bg-[#252525] resize-none"
          />
        </div>
        <div class="mt-14 bg-[#252525] rounded-sm p-4">
          <div class="flex flex-col items-start w-full">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center cursor-pointer">
                <img
                  src="../assets/my-memoji02.png"
                  class="w-16 h-16 -ml-4 -mt-4"
                />
                <h3 class="text-lg font-semibold -mt-3">#Stardusteight</h3>
              </div>
              <div class="-mt-3">

                edit, delete
              </div>
            </div>
            <div class="inner-shadoww bg-[#1a1a1a] p-2 w-full mt-1 rounded-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Repellendus, sit cupiditate quaerat doloremque dicta, fugiat sint
              repudiandae rerum eligendi excepturi iusto quod soluta, doloribus
              magni aliquam unde nisi deleniti? Neque.
            </div>
          </div>
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
  </div>
</template>

<style scoped>
@keyframes from-left {
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

.animate-span {
  animation: from-left ease-in 0.2s;
}

.input {
  background: #252525;
  font-size: 16px;
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
}

.inner-shadoww {
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
}
</style>
