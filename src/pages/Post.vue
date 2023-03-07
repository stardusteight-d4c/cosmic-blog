<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Star from '../atoms/Star.vue'
import comment from '../assets/comment.svg'
import DonutChart from '../components/DonutChart.vue'

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

    return { comment, scrollPercentage }
  },
})
</script>

<template>
  <div class="bg-[#1a1a1a] text-[#F2F2F2] w-screen">
    <Navbar path="post" />
    <div class="max-w-[725px] w-full mx-auto">
      <div id="post" class="relative">
        <div class="w-fit h-fit fixed bottom-4 right-4">
          <div class="flex items-center gap-x-2 group">
            <span
              class="animate-span hidden group-hover:block text-[#F2F2F2]/70"
              >Progress {{parseInt(scrollPercentage.toFixed(0))}}%
            </span>
            <div
              class="bg-[#252525] cursor-pointer shadow-lg shadow-black/50 z-50 rounded-md w-[50px] h-[50px] relative flex items-center justify-center"
            >
              <DonutChart :percentage="scrollPercentage" class="w-8" />
            </div>
          </div>
        </div>
        <div class="relative">
          <img
            src="https://www.paulsblog.dev/content/images/size/w2000/2022/09/image--41-.webp"
            class="w-full h-[325px] border-x border-t border-[#F2F2F2]/20 rounded-t-md object-cover"
          />
          <div class="mt-2 text-sm absolute left-4 top-2">
            <span
              class="inline-block lowercase bg-[#1a1a1a] p-1 rounded-sm text-xs mr-2"
              >#Javascript</span
            >
            <span
              class="inline-block lowercase bg-[#1a1a1a] p-1 rounded-sm text-xs mr-2"
              >#Node.js</span
            >
            <span
              class="inline-block lowercase bg-[#1a1a1a] p-1 rounded-sm text-xs mr-2"
              >#React</span
            >
            <span
              class="inline-block lowercase bg-[#1a1a1a] p-1 rounded-sm text-xs mr-2"
              >#Vue.js</span
            >
          </div>
          <Star
            color="#1a1a1a"
            class="w-8 absolute right-4 top-[14px] cursor-pointer"
          />
        </div>
        <div
          class="bg-[#252525] border-x border-b rounded-b-md border-[#F2F2F2]/20 mb-28 pt-4"
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
            <span class="flex items-center justify-center gap-x-1">
              <Star class="w-4" /> Starred • 38
            </span>
            <span class="flex items-center justify-center gap-x-1">
              <img :src="comment" class="w-4" /> Comments • 2
            </span>
          </div>
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
</style>
