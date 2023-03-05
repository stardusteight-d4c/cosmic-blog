import node from './assets/tech-icons/backend/node.svg'
import fastify from './assets/tech-icons/backend/fastify.svg'
import nest from './assets/tech-icons/backend/nest.svg'
import docker from './assets/tech-icons/backend/docker.svg'

import javascript from './assets/tech-icons/languages/javascript.svg'
import typescript from './assets/tech-icons/languages/typescript.svg'
import graphql from './assets/tech-icons/languages/graphql.svg'
import html from './assets/tech-icons/languages/html.svg'
import css from './assets/tech-icons/languages/css.svg'

import react from './assets/tech-icons/frontend/react.svg'
import vue from './assets/tech-icons/frontend/vue.svg'
import tailwindcss from './assets/tech-icons/frontend/tailwindcss.svg'
import stitches from './assets/tech-icons/frontend/stitches.svg'
import vite from './assets/tech-icons/frontend/vite.svg'

import mongodb from './assets/tech-icons/databases/mongodb.svg'
import mysql from './assets/tech-icons/databases/mysql.svg'
import knex from './assets/tech-icons/databases/knex.svg'
import mongoose from './assets/tech-icons/databases/mongoose.svg'
import prisma from './assets/tech-icons/databases/prisma.svg'
import supabase from './assets/tech-icons/databases/supabase.svg'

interface Techs {
  backend: Array<string>
  language: Array<string>
  frontend: Array<string>
  database: Array<string>
}

export const techs: Techs = {
  backend: [node, fastify, nest, docker],
  language: [javascript, typescript, graphql, html, css],
  frontend: [react, vue, tailwindcss, stitches, vite],
  database: [mongodb, mysql, knex, mongoose, prisma, supabase],
}
