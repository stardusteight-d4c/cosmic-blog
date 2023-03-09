<script lang="ts">
import { defineComponent } from 'vue'
import { Chat as ChatIcon, Star as StarIcon, Calendar as CalendarIcon } from '@/atoms/icons'

export default defineComponent({
  name: 'ArticleBody',
  components: { StarIcon, ChatIcon, CalendarIcon },
  props: {
    scaleUp: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    return { props }
  },
})
</script>

<template>
  <div
    :class="{
      'scale-[1.30]': props.scaleUp,
      'bg-[#252525] rounded-b-sm mb-28 pt-4 z-50 relative shadow-md shadow-black/20 duration-500 cursor-default transition-all': true,
    }"
  >
    <div class="px-4">
      <span
        class="my-2 font-medium text-base text-[#F2F2F2]/60 flex items-center justify-center gap-x-1"
      >
        <CalendarIcon size="20" color="#F2F2F270" />Mar 5, 2023
      </span>

      <h1
        class="text-3xl bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text text-transparent font-bold text-center"
      >
        GO! RN - Gestão de conhecimento focado em evolução do time
      </h1>
      <div class="border-b border-[#F2F2F2]/20 w-[50%] mx-auto mt-8 h-0" />

      <p
        class="text-lg font-medium mt-8 text-justify tracking-wide !leading-7 text-[#F2F2F2]/80"
      >
        Programação é o processo de escrita, teste e manutenção de um programa
        de computador. O programa é escrito em uma linguagem de programação,
        embora seja possível, com alguma dificuldade, o escrever diretamente em
        linguagem de máquina. Diferentes partes de um programa podem ser
        escritas em diferentes linguagens. Diferentes linguagens de programação
        funcionam de diferentes modos. Por esse motivo, os programadores podem
        criar programas muito diferentes para diferentes linguagens; muito
        embora, teoricamente, a maioria das linguagens possa ser usada para
        criar qualquer programa. Há várias décadas se debate se a programação é
        mais semelhante a uma arte (Donald Knuth), a uma ciência, à matemática
        (Edsger Dijkstra), à engenharia (David Parnas), ou se é um campo
        completamente novo.
        <br />
        <br />
        Natus corporis nesciunt nemo, placeat dignissimos inventore perspiciatis
        necessitatibus, magni saepe culpa harum pariatur in nihil similique
        velit sunt repudiandae fuga quis. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aperiam amet rerum maiores inventore magnam sit
        quaerat tempore id cum consequuntur. Officia impedit totam doloremque
        qui placeat quas adipisci? Culpa, tempore?
        <br />
        <br />
        Natus corporis nesciunt nemo, placeat dignissimos inventore perspiciatis
        necessitatibus, magni saepe culpa harum pariatur in nihil similique
        velit sunt repudiandae fuga quis. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aperiam amet rerum maiores inventore magnam sit
        quaerat tempore id cum consequuntur. Officia impedit totam doloremque
        qui placeat quas adipisci? Culpa, tempore?Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Harum praesentium, eligendi commodi
        tempore quidem ad est quas molestiae, voluptas labore provident possimus
        accusamus fuga iste dicta consequuntur architecto excepturi lorem Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Ab, aliquam a
        deleniti illum asperiores quos odio molestiae ipsa eveniet quae. Quod
        culpa voluptas possimus facere a dolores, nisi nobis repellat.
      </p>
    </div>
    <div class="border-t border-[#F2F2F2]/20 py-4 mt-8 text-[#F2F2F2]/50">
      <span class="flex items-center justify-center gap-x-1">
        <StarIcon color="#F2F2F250" class="w-4 -mt-[1px]" /> Starred • 38
      </span>
      <span class="flex items-center justify-center gap-x-1">
        <ChatIcon color="#F2F2F250" class="w-4 -mt-[1px]" /> Comments • 2
      </span>
    </div>
  </div>
</template>
