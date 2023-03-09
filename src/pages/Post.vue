<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  onBeforeMount,
} from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/navbar/Navbar.vue'
import Star from '../atoms/icons/Star.vue'
import comment from '../assets/comment.svg'
import DonutChart from '../components/post/DonutChart.vue'

// atribuir limite de caracteres no comentário 5000 ?
// criar modal de confirmação do delete
// mexer no componente rich text

export default defineComponent({
  name: 'Post',
  components: { Navbar, Star, DonutChart },
  computed: {
    postId(): string {
      return String(this.$route.params.id)
    },
  },
  setup() {
    const HTML_ELEMENT_ID = {
      post: 'post',
      commentDiv: 'commentDiv',
      commentTextarea: 'commentTextarea',
    }
    const route = useRoute()
    const id = route.params.id
    const scrollPercentage = ref(0)
    const scaleUp = ref(false)
    const selectedEditComment = ref(false)
    const edit = ref(
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut consequatur temporibus, possimus mollitia voluptates ratione maxime voluptatibus labore accusantium unde nulla reiciendis explicabo tempore dolor totam a consequuntur adipisci.'
    )
    const commentEditableElement = ref<HTMLTextAreaElement | null>(null)
    const commentElement = ref<HTMLDivElement | null>(null)

    const textareaHeight = ref('')

    const onScroll = () => {
      const postHeight = document.getElementById(
        HTML_ELEMENT_ID.post
      )!.clientHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY
      const maxScrollY = postHeight - windowHeight
      const newScrollPercentage = Math.min(scrollY / maxScrollY, 1) * 100
      scrollPercentage.value = newScrollPercentage
    }

    const adjustTextarea = () => {
      nextTick(() => {
        const textarea = document.getElementById(HTML_ELEMENT_ID.commentTextarea)!
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
        textareaHeight.value = `${textarea.scrollHeight}px`
      })
    }

    const showCommentTextarea = () => {
      selectedEditComment.value = !selectedEditComment.value

      const commentDivHeight = commentElement.value!.offsetHeight

      if (!selectedEditComment) return

      console.log(
        commentElement.value,
        commentEditableElement.value,
        commentDivHeight
      )
      commentEditableElement.value!.style.minHeight = `${commentDivHeight}px`
    }

    onMounted(() => {
      window.addEventListener('scroll', onScroll)

      commentElement.value = document.getElementById(
        HTML_ELEMENT_ID.commentDiv
      )! as HTMLDivElement
      commentEditableElement.value = document.getElementById(
        HTML_ELEMENT_ID.commentTextarea
      )! as HTMLTextAreaElement
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll)

      watch(edit, (editNewValue) => {
        console.log(editNewValue)
      })
    })

    return {
      comment,
      selectedEditComment,
      scrollPercentage,
      scaleUp,
      showCommentTextarea,
      adjustTextarea,
      edit,
      HTML_ELEMENT_ID,
      textareaHeight,
    }
  },
})
</script>

<template>
  <div class="bg-[#1a1a1a] text-[#F2F2F2] w-screen">
    <Navbar path="post" />
    <div class="max-w-[725px] w-full mx-auto mb-28">
      <div
        :id="HTML_ELEMENT_ID.post"
        class="relative shadow-md shadow-black/20"
      >
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
              class="shadow-black/50 shadow-md inline-block rounded-sm border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
              >#Javascript</span
            >
            <span
              class="shadow-black/50 shadow-md inline-block rounded-sm border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
              >#Node.js</span
            >
            <span
              class="shadow-black/50 shadow-md inline-block rounded-sm border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
              >#React</span
            >
            <span
              class="shadow-black/50 shadow-md inline-block rounded-sm border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
              >#Vue.js</span
            >
          </div>
          <div
            class="shadow-black/50 shadow-md absolute right-4 top-2 mt-1 p-[2px] rounded-sm border-[#F2F2F2]/20 bg-[#1a1a1a]"
          >
            <Star color="#F2F2F280" class="w-8 h-8 cursor-pointer" />
          </div>
        </div>
        <div
          :class="{
            'scale-[1.30]': scaleUp,
            'bg-[#252525] rounded-b-sm mb-28 pt-4 z-50 relative shadow-md shadow-black/20 duration-500 cursor-default transition-all': true,
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
        <h2
          class="text-2xl text-[#F2F2F2]/50 border-b border-[#F2F2F2]/20 mb-8 pb-2"
        >
          Comments
        </h2>
        <div class="flex items-start w-full">
          <img src="../assets/my-memoji02.png" class="w-24 h-24 -ml-6 -mt-4" />
          <div class="relative z-0 w-full">
            <div
              class="triangle absolute top-[22px] -left-[19px] bg-[#252525] -rotate-90"
            />
            <textarea
              placeholder="Leave a feedback or comment about it :)"
              :spellcheck="false"
              class="input group border border-transparent rounded-sm focus:border-blue-500 transition-all text-[#F2F2F2]/80 w-full h-40 outline-none p-4 bg-[#252525] resize-none"
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                class="css-i6dzq1"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="16"
                fill="#F2F2F2"
                viewBox="0 0 256 256"
              >
                <path
                  d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.42,29.84l85.62,40.55,40.55,85.62A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14L118.42,148.9l47.24-47.25a8,8,0,0,0-11.31-11.31L107.1,137.58,24,98.22l.14,0L216,40Z"
                ></path>
              </svg>
              Submit
            </button>
          </div>
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
              <div class="-mt-[10px] flex items-center gap-x-2 text-[#7c7c7c]">
                <div @click="showCommentTextarea" class="cursor-pointer">
                  <ph-pen-nib
                    :size="24"
                    :class="{
                      'text-blue-500': selectedEditComment,
                      'p-[2px]': true,
                    }"
                  />
                </div>
                <div class="cursor-pointer">
                  <ph-trash-simple :size="24" class="p-[2px]" />
                </div>
              </div>
            </div>
            <textarea
              :id="HTML_ELEMENT_ID.commentTextarea"
              :spellcheck="false"
              class="scrollHiddenCSO scrollHideenIEF h-auto border-blue-500 border bg-[#1a1a1a] resize-none block p-2 w-full mt-1 rounded-sm outline-none"
              v-show="selectedEditComment"
              :value="edit"
              @input="adjustTextarea"
              />
            <button v-show="selectedEditComment">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                class="css-i6dzq1"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="16"
                fill="#F2F2F2"
                viewBox="0 0 256 256"
              >
                <path
                  d="M240,100.68a15.86,15.86,0,0,0-4.69-11.31L166.63,20.68a16,16,0,0,0-22.63,0L115.57,49.11l-58,21.77A16.06,16.06,0,0,0,47.35,83.23L24.11,222.68A8,8,0,0,0,32,232a8.4,8.4,0,0,0,1.32-.11l139.44-23.24a16,16,0,0,0,12.35-10.17l21.77-58L235.31,112A15.87,15.87,0,0,0,240,100.68Zm-69.87,92.19L55.32,212l47.37-47.37a28,28,0,1,0-11.32-11.32L44,200.7,63.13,85.86,118,65.29,190.7,138ZM104,140a12,12,0,1,1,12,12A12,12,0,0,1,104,140Zm96-15.32L131.31,56l24-24L224,100.68Z"
                ></path>
              </svg>
              Update
            </button>
            <div
              :id="HTML_ELEMENT_ID.commentDiv"
              v-show="!selectedEditComment"
              class="block bg-[#1a1a1a] p-2 w-full mt-1 rounded-sm"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              aut consequatur temporibus, possimus mollitia voluptates ratione
              maxime voluptatibus labore accusantium unde nulla reiciendis
              explicabo tempore dolor totam a consequuntur adipisci.
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

.scrollHiddenCSO::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
.scrollHideenIEF {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

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
  gap: 8px;
  margin-left: auto;
  background-image: linear-gradient(to top, #3b82f6, #8b5cf6);
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 4px 10px;
  border-radius: 2px;
  margin-top: 4px;
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
</style>
