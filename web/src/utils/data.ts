import node from '@/assets/tech-icons/backend/node.svg'
import fastify from '@/assets/tech-icons/backend/fastify.svg'
import nest from '@/assets/tech-icons/backend/nest.svg'
import docker from '@/assets/tech-icons/backend/docker.svg'
import stripe from '@/assets/tech-icons/backend/stripe.svg'

import javascript from '@/assets/tech-icons/languages/javascript.svg'
import typescript from '@/assets/tech-icons/languages/typescript.svg'
import graphql from '@/assets/tech-icons/languages/graphql.svg'
import html from '@/assets/tech-icons/languages/html.svg'
import css from '@/assets/tech-icons/languages/css.svg'

import react from '@/assets/tech-icons/frontend/react.svg'
import vue from '@/assets/tech-icons/frontend/vue.svg'
import tailwindcss from '@/assets/tech-icons/frontend/tailwindcss.svg'
import stitches from '@/assets/tech-icons/frontend/stitches.svg'
import vite from '@/assets/tech-icons/frontend/vite.svg'
import hygraph from '@/assets/tech-icons/frontend/hygraph.svg'

import mongodb from '@/assets/tech-icons/databases/mongodb.svg'
import mysql from '@/assets/tech-icons/databases/mysql.svg'
import knex from '@/assets/tech-icons/databases/knex.svg'
import mongoose from '@/assets/tech-icons/databases/mongoose.svg'
import prisma from '@/assets/tech-icons/databases/prisma.svg'
import supabase from '@/assets/tech-icons/databases/supabase.svg'

import Mavatar0101 from '@/assets/avatars/m-avatar-01-1.png'
import Mavatar0102 from '@/assets/avatars/m-avatar-01-2.png'
import Mavatar0103 from '@/assets/avatars/m-avatar-01-3.png'

import Favatar0101 from '@/assets/avatars/f-avatar-01-1.png'
import Favatar0102 from '@/assets/avatars/f-avatar-01-2.png'
import Favatar0103 from '@/assets/avatars/f-avatar-01-3.png'

import Mavatar0201 from '@/assets/avatars/m-avatar-02-1.png'
import Mavatar0202 from '@/assets/avatars/m-avatar-02-2.png'
import Mavatar0203 from '@/assets/avatars/m-avatar-02-3.png'

import Favatar0201 from '@/assets/avatars/f-avatar-02-1.png'
import Favatar0202 from '@/assets/avatars/f-avatar-02-2.png'
import Favatar0203 from '@/assets/avatars/f-avatar-02-3.png'

import Mavatar0301 from '@/assets/avatars/m-avatar-03-1.png'
import Mavatar0302 from '@/assets/avatars/m-avatar-03-2.png'
import Mavatar0303 from '@/assets/avatars/m-avatar-03-3.png'

import Favatar0301 from '@/assets/avatars/f-avatar-03-1.png'
import Favatar0302 from '@/assets/avatars/f-avatar-03-2.png'
import Favatar0303 from '@/assets/avatars/f-avatar-03-3.png'

import github from '@/assets/social/github.svg'
import linkedin from '@/assets/social/linkedin.svg'
import instagram from '@/assets/social/instagram.svg'
import twitter from '@/assets/social/twitter.svg'
import facebook from '@/assets/social/facebook.svg'
import email from '@/assets/social/email.svg'

export interface IAvatars {
  url: string
  id: string
}

export interface Techs {
  backend: Array<string>
  language: Array<string>
  frontend: Array<string>
  database: Array<string>
}

export interface SocialNetwork {
  url: string
  name: string
}

export const socialNetworks: Array<SocialNetwork> = [
  { url: github, name: 'Github' },
  { url: linkedin, name: 'LinkedIn' },
  { url: instagram, name: 'Instagram' },
  { url: twitter, name: 'Twitter' },
  { url: facebook, name: 'Facebook' },
  { url: email, name: 'Email' },
]

export const chooseAvatars: Array<IAvatars> = [
  { url: Mavatar0101, id: 'Mavatar01' },
  { url: Favatar0101, id: 'Favatar01' },
  { url: Mavatar0201, id: 'Mavatar02' },
  { url: Favatar0201, id: 'Favatar02' },
  { url: Mavatar0301, id: 'Mavatar03' },
  { url: Favatar0301, id: 'Favatar03' },
]

// export const avatars: Array<IAvatars> = [
//   { url: Mavatar0101, id: 'Mavatar01' },
//   { url: Favatar0101, id: 'Favatar01' },


//   { url: Favatar0101, id: 'Favatar01' },
//   { url: Mavatar0201, id: 'Mavatar02' },
//   { url: Favatar0201, id: 'Favatar02' },
//   { url: Mavatar0301, id: 'Mavatar03' },
//   { url: Favatar0301, id: 'Favatar03' },
// ]

export const techs: Techs = {
  backend: [node, fastify, nest, docker, stripe],
  language: [javascript, typescript, graphql, html, css],
  frontend: [react, vue, tailwindcss, stitches, vite, hygraph],
  database: [mongodb, mysql, knex, mongoose, prisma, supabase],
}

export const descriptions: Techs = {
  backend: [
    '<strong style="font-weight: 700;">Node.js:</strong> Amplamente utilizado para criar aplicativos de rede escaláveis, como servidores web, aplicativos de mensagens instantâneas, jogos em tempo real, aplicativos de streaming de vídeo, entre outros. Permite que os desenvolvedores escrevam aplicativos em um ambiente de tempo de execução do lado do servidor que é executado como um processo separado no sistema operacional.',
    '<strong style="font-weight: 700;">Fastify:</strong> Framework backend de alto desempenho e baixo overhead para Node.js, projetado para lidar com solicitações HTTP de maneira extremamente eficiente. O Fastify é construído com plugins, o que significa que é altamente modular e personalizável.',
    '<strong style="font-weight: 700;">NestJS:</strong> Framework para construção de aplicativos em Node.js, que se concentra na arquitetura e padrões recomendados pela comunidade, como a arquitetura MVC (Model-View-Controller), Injeção de Dependência e Programação Orientada a Aspectos (AOP). Oferece suporte para a criação de aplicativos com suporte para microservices, tornando-o uma excelente escolha para aplicações escaláveis e complexas.',
    '<strong style="font-weight: 700;">Docker:</strong> Permite a criação, execução e gerenciamento de aplicativos em contêineres. Um contêiner é uma unidade de software que contém tudo o que é necessário para que um aplicativo seja executado. Permite que os desenvolvedores empacotem aplicativos em contêineres portáteis e os implantem em qualquer ambiente de hospedagem, como um servidor local ou na nuvem.',
    '<strong style="font-weight: 700;">Stripe:</strong>  Plataforma de pagamentos online que permite a empresas e indivíduos receberem pagamentos pela internet. Com a Stripe, é possível processar pagamentos com cartões de crédito, débito e carteiras digitais de maneira segura e eficiente, sem precisar lidar diretamente com os detalhes técnicos e de segurança envolvidos na transação. Além disso, a plataforma oferece diversas ferramentas para gerenciamento de pagamentos, tais como relatórios, gerenciamento de assinaturas e gerenciamento de disputas. A Stripe é amplamente utilizada por empresas de tecnologia, marketplaces, e-commerce e outras empresas que realizam transações online.',
  ],
  language: [
    '<strong style="font-weight: 700;">JavaScript:</strong> Linguagem de programação de alto nível, interpretada e orientada a objetos. Amplamente utilizada para o desenvolvimento web, principalmente em conjunto com HTML e CSS, para tornar as páginas web mais interativas e dinâmicas. Também é usado em aplicações do lado do servidor com o Node.js.',
    '<strong style="font-weight: 700;">TypeScript:</strong> Superset do JavaScript que adiciona tipagem estática opcional, interfaces, enums e outros recursos que ajudam a tornar o desenvolvimento de aplicativos JavaScript mais escalável e mais fácil de manter. Criado pela Microsoft e é amplamente usado na construção de aplicativos front-end e back-end em JavaScript. O TypeScript é compilado para JavaScript, o que significa que pode ser executado em qualquer ambiente em que o JavaScript seja executado. O uso do TypeScript pode ajudar a detectar erros de tipagem antes da execução do código e tornar o código mais fácil de entender e manter.',
    '<strong style="font-weight: 700;">GraphQL:</strong> Linguagem de consulta de dados criada pela Facebook. Permite que os desenvolvedores definam a estrutura dos dados que desejam obter e, em seguida, recuperem esses dados de um servidor que fornece uma API GraphQL. Ao contrário de outras linguagens de consulta de dados, o GraphQL fornece uma única interface para recuperar e atualizar dados, permitindo que os clientes solicitem apenas as informações necessárias em vez de sobrecarregar o servidor com solicitações desnecessárias.',
    '<strong style="font-weight: 700;">HTML5:</strong> (Hypertext Markup Language) é uma linguagem de marcação utilizada para criar e estruturar conteúdo na web. O HTML5 expandiu as capacidades da web, oferecendo uma variedade de recursos novos e úteis para desenvolvedores e usuários, tornando-a mais interativa, acessível e rica em conteúdo multimídia. Trouxe suporte nativo para áudio, vídeo, gráficos vetoriais e novas tags semânticas, como header, footer, nav, article, section, entre outras, permitem aos desenvolvedores uma melhor organização e descrição do conteúdo em um documento HTML, melhorando a acessibilidade e usabilidade dos sites.',
    '<strong style="font-weight: 700;">CSS3:</strong> A última versão do Cascading Style Sheets, linguagem de estilo usada para descrever a apresentação de documentos HTML e XML. O CSS3 adicionou novos recursos, como seletores avançados, suporte para fontes da web, gradientes, transições, animações, sombras e bordas arredondadas. Com esses recursos, os desenvolvedores podem criar layouts mais sofisticados e interativos para seus sites e aplicativos da web.',
  ],
  frontend: [
    '<strong style="font-weight: 700;">React:</strong> Biblioteca JavaScript de código aberto que permite construir interfaces de usuário (UI) interativas e escaláveis. Desenvolvida pela Facebook e é amplamente utilizada na construção de aplicativos da web. Utiliza o conceito de componentes reutilizáveis para construir interfaces de usuário, permitindo que os desenvolvedores criem aplicativos complexos de forma modular e fácil de manter.',
    '<strong style="font-weight: 700;">Vue.js:</strong> Framework JavaScript de código aberto para construção de interfaces de usuário. Criado para ser flexível, fácil de aprender e desenvolver, e é amplamente utilizado para criar aplicativos web e móveis modernos e dinâmicos. O Vue.js é baseado em componentes, o que torna a criação e reutilização de código muito eficiente. Ele também possui recursos poderosos, como reatividade, diretivas, gerenciamento de estado e integração com outras bibliotecas e frameworks.',
    '<strong style="font-weight: 700;">Tailwindcss:</strong> Framework CSS que fornece um conjunto de classes pré-definidas para estilizar elementos HTML de forma rápida e fácil. Ao contrário de outros frameworks, como Bootstrap ou Foundation, que têm uma abordagem mais opinativa, o Tailwind CSS é altamente personalizável, permitindo que você construa seu próprio design a partir das classes disponíveis. Ele também é fácil de aprender e usar, pois as classes possuem nomes intuitivos que descrevem claramente o que elas fazem, como "bg-blue-500" para definir a cor de fundo azul e "px-4" para definir o preenchimento horizontal.',
    '<strong style="font-weight: 700;">Stitches:</strong> Biblioteca de estilo CSS-in-JS, que permite aos desenvolvedores escrever CSS em formato JavaScript de maneira mais simples e intuitiva. Ela oferece uma sintaxe fácil de aprender e utilizar, permitindo a criação de estilos dinâmicos e reutilizáveis em um projeto. Com Stitches, é possível criar temas personalizados e otimizar a performance da aplicação, garantindo um código mais enxuto e fácil de manter. Além disso, a biblioteca é compatível com diversos frameworks, como React, Vue.js, Svelte, entre outros.',
    '<strong style="font-weight: 700;">Vite:</strong> Lançado em 2020, vite é um build tool (ferramenta de construção) e um servidor de desenvolvimento (development server) para projetos web em JavaScript. Especialmente adequado para projetos Vue.js e React, mas também pode ser usado em outras bibliotecas e frameworks. Vite é conhecido por sua inicialização rápida e por seu sistema de módulos com suporte nativo para importação de arquivos ESM (ECMAScript Modules). Ele também oferece recursos como hot module replacement (HMR), que permite que as alterações de código sejam atualizadas instantaneamente na página, e uma experiência de desenvolvimento suave e eficiente.',
    '<strong style="font-weight: 700;">Hygraph:</strong> Sistema de gerenciamento de conteúdo (CMS) de código aberto e gratuito, desenvolvido em Node.js e baseado no framework Next.js. Fornece uma interface fácil de usar para criar, gerenciar e publicar conteúdo para sites e aplicativos da web. Altamente personalizável, permitindo que os desenvolvedores criem modelos personalizados para atender às necessidades específicas de um projeto. Inclui recursos avançados, como SEO otimizado, gerenciamento de ativos, localização e suporte para múltiplos idiomas. Usa o banco de dados MongoDB como padrão, mas também suporta outros bancos de dados como Postgres e SQLite. Ele é uma ótima opção para equipes de desenvolvimento que desejam um CMS rápido, moderno e flexível para seus projetos web.',
  ],
  database: [
    '<strong style="font-weight: 700;">MongoDB:</strong> Sistema de gerenciamento de banco de dados (SGBD) NoSQL, orientado a documentos, desenvolvido para lidar com grandes volumes de dados não estruturados ou semiestruturados. Diferentemente de bancos de dados relacionais, que usam tabelas e esquemas fixos para estruturar os dados, o MongoDB armazena dados em documentos flexíveis e aninhados em formato JSON, permitindo a modelagem de dados mais dinâmica e escalabilidade horizontal mais fácil.',
    '<strong style="font-weight: 700;">MySQL:</strong> Sistema de gerenciamento de banco de dados relacional (RDBMS) de código aberto amplamente utilizado em aplicativos web, fornecendo uma plataforma para armazenar, organizar e gerenciar dados. Ele usa a linguagem SQL (Structured Query Language) para gerenciar bancos de dados, que é uma linguagem padrão para gerenciamento de banco de dados relacional.',
    '<strong style="font-weight: 700;">Knex.js:</strong> É um construtor de consultas SQL (SQL query builder) em Node.js que permite escrever consultas SQL em um estilo fluente usando JavaScript. Ele suporta vários bancos de dados populares, como MySQL, PostgreSQL, SQLite3, Oracle e MSSQL, e ajuda a simplificar a comunicação com esses bancos de dados. Permite que os desenvolvedores escrevam consultas SQL usando uma linguagem de programação em vez de escrever diretamente em SQL. Isso torna mais fácil e intuitivo escrever e modificar consultas complexas, evitando erros comuns de sintaxe SQL.',
    '<strong style="font-weight: 700;">Mongoose:</strong> Biblioteca Node.js que fornece uma camada de modelagem para aplicativos que usam o MongoDB como banco de dados. Ele simplifica a interação com o MongoDB e permite definir esquemas de dados, criar modelos e executar operações de banco de dados com mais facilidade e segurança. Com o Mongoose, você pode definir seus esquemas de dados usando objetos JavaScript que descrevem a estrutura dos documentos que deseja armazenar no MongoDB. O Mongoose também oferece recursos como validação de dados, gatilhos (hooks) pré e pós-save e suporte para referências entre documentos.',
    '<strong style="font-weight: 700;">Prisma:</strong> Ferramenta ORM (Object-Relational Mapping) moderna para bancos de dados SQL. Ele permite que os desenvolvedores escrevam consultas de banco de dados em código TypeScript/JavaScript com uma API simples e segura. Prisma suporta vários bancos de dados SQL, incluindo PostgreSQL, MySQL e SQLite, e oferece recursos avançados, como migrações de banco de dados, tipos de dados robustos, consultas relacionais avançadas e geração de esquemas GraphQL. Com a ajuda do Prisma, os desenvolvedores podem criar aplicativos escaláveis, seguros e fáceis de manter que se integram perfeitamente com seus bancos de dados SQL.',
    '<strong style="font-weight: 700;">Supabase:</strong> Plataforma open source que oferece uma alternativa ao Firebase, fornecendo uma API para autenticação, armazenamento de dados, envio de e-mails, funções sem servidor, webhooks e muito mais. É construído em cima de tecnologias de banco de dados de código aberto como Postgres e permite que os desenvolvedores criem aplicativos escaláveis e seguros com facilidade. Além disso, o Supabase também oferece uma interface de usuário amigável e recursos para colaboração em equipe, como controle de acesso baseado em função.',
  ],
}
