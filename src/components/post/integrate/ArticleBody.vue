<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import {
  Chat as ChatIcon,
  Star as StarIcon,
  Calendar as CalendarIcon,
} from '@/atoms/icons'
import * as marked from 'marked'
import { dateFormat } from '@/utils/date-format'

export default defineComponent({
  name: 'ArticleBody',
  components: { StarIcon, ChatIcon, CalendarIcon },
  props: {
    scaleUp: {
      type: Boolean,
      required: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const htmlBody = ref(marked.marked(`Recebi hoje o livro "Domain Driven Design: Atacando as Complexidades no Coração do Software" de Eric Evans, uma leitura obrigatória para desenvolvedores de software que desejam aprimorar suas habilidades em modelagem de domínios e arquitetura de software.
<br /><br />
Nele é apresentado um conjunto de conceitos e padrões para a criação de sistemas de software complexos, enfatizando a importância da compreensão do domínio do problema e da colaboração entre desenvolvedores e especialistas do domínio, e a necessidade de se criar um modelo de domínio rico em informações e expressividade, capaz de refletir a realidade do problema e servir como base para a implementação do software.
<br /><br />
### Segunda parte - o autoconhecimento
Nos últimos meses comecei a estudar mais sobre Clean Architecture e acabei tento bastante contato com aplicações backend seguindo o Domain-Driven Design (DDD). Clean Architecture e o DDD possuem uma relação muito próxima, já que ambos se concentram em como organizar o código em torno do domínio do negócio.
<br /><br />
#### Clean Architecture
Porém enquanto a Clean Architecture fornece uma estrutura para organizar o código em camadas, com a camada de domínio no centro, o Domain-Driven Design fornece orientações sobre como modelar esse domínio de forma eficaz. E assim, eles fornecem uma base sólida para o desenvolvimento de software bem estruturado, com baixo acoplamento (no qual se refere que os diferentes componentes ou módulos do sistema devem ter poucas dependências entre si) e alta coesão (uma responsabilidade única bem definida entre estes componentes), capaz de representar adequadamente as necessidades e os processos do negócio e permitindo assim a evolução do sistema com menor impacto em outras partes.
<br /><br />
Enfim... agora posso me aprofundar nestes conceitos das palavras de quem o próprio o cunhou, uhuu!! u.u
Nele é apresentado um conjunto de conceitos e padrões para a criação de sistemas de software complexos, enfatizando a importância da compreensão do domínio do problema e da colaboração entre desenvolvedores e especialistas do domínio, e a necessidade de se criar um modelo de domínio rico em informações e expressividade, capaz de refletir a realidade do problema e servir como base para a implementação do software.
<br /><br />
### Segunda parte - o autoconhecimento
Nos últimos meses comecei a estudar mais sobre Clean Architecture e acabei tento bastante contato com aplicações backend seguindo o Domain-Driven Design (DDD). Clean Architecture e o DDD possuem uma relação muito próxima, já que ambos se concentram em como organizar o código em torno do domínio do negócio.
<br /><br />
#### Clean Architecture
Porém enquanto a Clean Architecture fornece uma estrutura para organizar o código em camadas, com a camada de domínio no centro, o Domain-Driven Design fornece orientações sobre como modelar esse domínio de forma eficaz. E assim, eles fornecem uma base sólida para o desenvolvimento de software bem estruturado, com baixo acoplamento (no qual se refere que os diferentes componentes ou módulos do sistema devem ter poucas dependências entre si) e alta coesão (uma responsabilidade única bem definida entre estes componentes), capaz de representar adequadamente as necessidades e os processos do negócio e permitindo assim a evolução do sistema com menor impacto em outras partes.
<br /><br />
Enfim... agora posso me aprofundar nestes conceitos das palavras de quem o próprio o cunhou, uhuu!! u.u

Nele é apresentado um conjunto de conceitos e padrões para a criação de sistemas de software complexos, enfatizando a importância da compreensão do domínio do problema e da colaboração entre desenvolvedores e especialistas do domínio, e a necessidade de se criar um modelo de domínio rico em informações e expressividade, capaz de refletir a realidade do problema e servir como base para a implementação do software.
<br /><br />
### Segunda parte - o autoconhecimento
Nos últimos meses comecei a estudar mais sobre Clean Architecture e acabei tento bastante contato com aplicações backend seguindo o Domain-Driven Design (DDD). Clean Architecture e o DDD possuem uma relação muito próxima, já que ambos se concentram em como organizar o código em torno do domínio do negócio.
<br /><br />
#### Clean Architecture
Porém enquanto a Clean Architecture fornece uma estrutura para organizar o código em camadas, com a camada de domínio no centro, o Domain-Driven Design fornece orientações sobre como modelar esse domínio de forma eficaz. E assim, eles fornecem uma base sólida para o desenvolvimento de software bem estruturado, com baixo acoplamento (no qual se refere que os diferentes componentes ou módulos do sistema devem ter poucas dependências entre si) e alta coesão (uma responsabilidade única bem definida entre estes componentes), capaz de representar adequadamente as necessidades e os processos do negócio e permitindo assim a evolução do sistema com menor impacto em outras partes.
<br /><br />
Enfim... agora posso me aprofundar nestes conceitos das palavras de quem o próprio o cunhou, uhuu!! u.u
Nele é apresentado um conjunto de conceitos e padrões para a criação de sistemas de software complexos, enfatizando a importância da compreensão do domínio do problema e da colaboração entre desenvolvedores e especialistas do domínio, e a necessidade de se criar um modelo de domínio rico em informações e expressividade, capaz de refletir a realidade do problema e servir como base para a implementação do software.
<br /><br />
### Segunda parte - o autoconhecimento
Nos últimos meses comecei a estudar mais sobre Clean Architecture e acabei tento bastante contato com aplicações backend seguindo o Domain-Driven Design (DDD). Clean Architecture e o DDD possuem uma relação muito próxima, já que ambos se concentram em como organizar o código em torno do domínio do negócio.
<br /><br />
#### Clean Architecture
Porém enquanto a Clean Architecture fornece uma estrutura para organizar o código em camadas, com a camada de domínio no centro, o Domain-Driven Design fornece orientações sobre como modelar esse domínio de forma eficaz. E assim, eles fornecem uma base sólida para o desenvolvimento de software bem estruturado, com baixo acoplamento (no qual se refere que os diferentes componentes ou módulos do sistema devem ter poucas dependências entre si) e alta coesão (uma responsabilidade única bem definida entre estes componentes), capaz de representar adequadamente as necessidades e os processos do negócio e permitindo assim a evolução do sistema com menor impacto em outras partes.
<br /><br />
Enfim... agora posso me aprofundar nestes conceitos das palavras de quem o próprio o cunhou, uhuu!! u.u

\`\`\`ts
onMounted(() => {
  const articleBody = document.getElementById(
    'articleBody'
  )! as HTMLDivElement
  articleBody.innerHTML = htmlBody.value
})
\`\`\`

# #boraCodar

<p align="center">
    Projetos #boraCodar da Rocketseat <br>
    <a href="https://boracodar.dev">Acesse o desafio desta semana clicando aqui</a><br>
    <br><table>
    <thead>
        <tr>
            <th align="center">
                <img width="20" height="1"> 
                <p>
                    <small>#</small>
                </p>
            </th>
            <th align="center">
                <img width="300" height="1"> 
                <p> 
                    <small>
                        NAME
                    </small>
                </p>
            </th>
            <th align="center">
                <img width="140" height="1">
                <p align="center"> 
                    <small>
                    RELEASE DATE
                    </small>
                </p>
            </th>
            <th align="center">
                <img width="201" height="1">
                <p align="center"> 
                    <small>
                    PREVIEW
                    </small>
                </p>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>01</td>
            <td><a href="1-music-player">Player de Música</a></td>
            <td>11/01/23</td>
            <td align="center">
            <a href="1-music-player"><img width="300px" src="https://wallpaperbat.com/img/82292-steam-workshop-accembler-collection.jpg" /></a></td>
        </tr>
        <tr>
            <td>02</td>
            <td><a href="2-product-card">Cartão de Produto</a></td>
            <td>18/01/23</td>
            <td align="center"><a href="2-product-card"><img width="300px" src="https://wallpaperbat.com/img/82292-steam-workshop-accembler-collection.jpg" /></a></td>
        </tr>
        <tr>
            <td>03</td>
            <td><a href="3-buttons-cursors">Botões e Cursores</a></td>
            <td>25/01/23</td>
            <td align="center"><a href="3-buttons-cursors"><img width="300px" src="https://wallpaperbat.com/img/82292-steam-workshop-accembler-collection.jpg" /></a></td>
        </tr>
        <tr>
            <td>04</td>
            <td><a href="4-chatbot">Chatbot</a></td>
            <td>01/02/23</td>
            <td align="center"><a href="4-chatbot"><img width="300px" src="https://wallpaperbat.com/img/82292-steam-workshop-accembler-collection.jpg" /></a></td>
        </tr>
    </tbody>
</table></p>

E assim, eles fornecem uma base sólida para o desenvolvimento de software bem estruturado, com baixo acoplamento (no qual se refere que os diferentes componentes ou módulos do sistema devem ter poucas dependências entre si) e alta coesão (uma responsabilidade única bem definida entre estes componentes), capaz de representar adequadamente as necessidades e os processos do negócio e permitindo assim a evolução do sistema com menor impacto em outras partes.
<br/><br/>

![description](https://thumbs.dreamstime.com/b/abstract-coding-wallpaper-glowing-numbers-binary-code-computing-concept-d-rendering-155772299.jpg)`))

  

    onMounted(() => {
      const articleBody = document.getElementById(
        'articleBody'
      )! as HTMLDivElement
      articleBody.innerHTML = htmlBody.value
    })

    return { props, htmlBody, dateFormat }
  },
})
</script>

<template>
  <div
    :class="{
      'pb-8': !props.showFooter,
      'scale-[1.3] -mt-[200px] origin-top ': props.scaleUp,
      'bg-[#252525] relative rounded-b-sm overflow-hidden mb-28 pt-4 z-50 shadow-sm shadow-black/20 duration-500 cursor-default transition-all': true,
    }"
  >
    <div class="px-4">
      <span
        class="my-2 font-medium text-base text-[#F2F2F2]/60 flex items-center justify-center gap-x-1"
      >
        <CalendarIcon size="20" color="#F2F2F270" />{{
          dateFormat(props.date!)
        }}
      </span>

      <h1
        class="text-4xl bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text text-transparent font-bold text-center"
      >
        {{ props.title }}
      </h1>
      <div class="border-b border-[#F2F2F2]/20 w-[50%] mx-auto my-8 h-0" />

      <div
        id="articleBody"
        class="articleBody text-[#F2F2F2]/80 break-words text-justify text-lg font-medium"
      ></div>
    </div>
    <div
      v-if="props.showFooter"
      class="border-t border-[#F2F2F2]/20 py-4 mt-8 text-[#F2F2F2]/50"
    >
      <span class="flex items-center justify-center gap-x-1">
        <StarIcon color="#F2F2F250" class="w-4 -mt-[1px]" /> Starred • 38
      </span>
      <span class="flex items-center justify-center gap-x-1">
        <ChatIcon color="#F2F2F250" class="w-4 -mt-[1px]" /> Comments • 2
      </span>
    </div>
  </div>
</template>

<style>
/* GLOBAL */
.articleBody {
  color: #f2f2f298;
  overflow: hidden;
}

/* HEADINGS */
.articleBody h2 {
  font-size: 1.875rem /* 30px */ !important;
  line-height: 2.25rem /* 36px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
}
.articleBody h3 {
  font-size: 1.5rem /* 24px */ !important;
  line-height: 2rem /* 32px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
}
.articleBody h4 {
  font-size: 1.25rem /* 20px */ !important;
  line-height: 1.75rem /* 28px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
}
.articleBody h5 {
  font-size: 1.125rem /* 18px */ !important;
  line-height: 1.75rem /* 28px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
}
.articleBody h6 {
  font-size: 1rem /* 16px */ !important;
  line-height: 1.5rem /* 24px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
}

/* CODE BLOCK */
.articleBody pre {
  max-width: 100%;
  background-color: rgb(0 0 0 / 0.5);
  margin-block: 19px;
  border-radius: 0.125rem /* 2px */;
  font-size: 1rem /* 16px */;
  line-height: 1.5rem /* 24px */;
  text-align: left !important;
  overflow-x: scroll;
  -webkit-box-shadow: inset 7px 7px 12px -4px rgba(0, 0, 0, 1);
  -moz-box-shadow: inset 7px 7px 12px -4px rgba(0, 0, 0, 1);
  box-shadow: inset 7px 7px 12px -4px rgba(0, 0, 0, 1);
  padding: 1em !important;
  box-sizing: content-box;
}
.articleBody code {
  width: 90%;
  color: #f2f2f2;
  font-weight: 300;
  text-align: left !important;
  box-sizing: content-box;
  margin-left: 14px;
}

/* TABLE */
.articleBody table {
  width: fit-content;
  margin-inline: auto;
}
.articleBody th {
  text-align: center;
  padding: 8px;
  border: 1px solid #f2f2f250;
}
.articleBody td {
  text-align: center;
  padding: 8px;
  border: 1px solid #f2f2f250;
  margin-inline: auto;
}

/* IMAGE */
.articleBody img {
  border-radius: 2px;
  object-fit: cover;
}
</style>
