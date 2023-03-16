<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/navbar/Navbar.vue'
import github from '../assets/social/github.svg'
import linkedin from '../assets/social/linkedin.svg'
import instagram from '../assets/social/instagram.svg'
import twitter from '../assets/social/twitter.svg'
import facebook from '../assets/social/facebook.svg'
import email from '../assets/social/email.svg'
import star from '../assets/star.svg'
import comment from '../assets/comment.svg'
import PostCard from '../components/post/globals/Card.vue'

export default defineComponent({
  name: 'Profile',
  components: { Navbar, PostCard },
  computed: {
    username(): string {
      return String(this.$route.params.username)
    },
  },
  setup() {
    const route = useRoute()
    const username = route.params.username
    const networks = [github, linkedin, instagram, twitter, facebook, email]

    return { networks, star, comment }
  },
})
</script>

<template>
  <div class="bg-[#1a1a1a] text-[#F2F2F2] w-screen">
    <Navbar v-bind:path="username" />
    <div class="max-w-[725px] w-full mx-auto">
      <div>
        <div class="w-full mt-8 flex items-center justify-center h-48 relative">
          <div
            class="box-animate w-40 h-40 absolute z-10 bg-gradient-to-t from-blue-500 to-violet-500 rounded-full mx-auto"
          />
          <div
            class="inner-shadow  w-[150px] h-[150px] pointer-events-none absolute z-50 bg-[#1a1a1a] rounded-full mx-auto"
          />
          <img
            src="../assets/my-memoji02.png"
            class="pendulum absolute pointer-events-none w-48 z-[100] mx-auto"
          />
        </div>
        <div class="flex flex-col items-center justify-center">
          <h1 class="capitalize font-semibold text-3xl mt-2">
            #{{ username }}'s Profile
          </h1>
          <div
            class="flex items-center justify-center flex-wrap gap-x-4 w-[300px] mt-4"
          >
            <a
              href=""
              target="_blank"
              class="flex transition-all duration-300 ease-in-out items-center gap-x-1 text-[#F2F2F2]/70 w-fit font-medium border-b border-b-transparent hover:border-b-[#F2F2F2]/70"
              ><img :src="networks[0]" alt="GitHub" width="20" />GitHub</a
            >
            <a
              href=""
              target="_blank"
              class="flex transition-all duration-300 ease-in-out items-center gap-x-1 text-[#F2F2F2]/70 w-fit font-medium border-b border-b-transparent hover:border-b-[#F2F2F2]/70"
              ><img :src="networks[1]" alt="LinkedIn" width="20" />LinkedIn</a
            >
            <a
              href=""
              target="_blank"
              class="flex transition-all duration-300 ease-in-out items-center gap-x-1 text-[#F2F2F2]/70 w-fit font-medium border-b border-b-transparent hover:border-b-[#F2F2F2]/70"
              ><img :src="networks[2]" alt="Instagram" width="20" />Instagram</a
            >
            <a
              href=""
              target="_blank"
              class="flex transition-all duration-300 ease-in-out items-center gap-x-1 text-[#F2F2F2]/70 w-fit font-medium border-b border-b-transparent hover:border-b-[#F2F2F2]/70"
              ><img :src="networks[3]" alt="Twitter" width="20" />Twitter</a
            >
            <a
              href=""
              target="_blank"
              class="flex transition-all duration-300 ease-in-out items-center gap-x-1 text-[#F2F2F2]/70 w-fit font-medium border-b border-b-transparent hover:border-b-[#F2F2F2]/70"
              ><img :src="networks[4]" alt="Facebook" width="20" />Facebook</a
            >
            <a
              href=""
              target="_blank"
              class="flex transition-all duration-300 ease-in-out items-center gap-x-1 text-[#F2F2F2]/70 w-fit font-medium border-b border-b-transparent hover:border-b-[#F2F2F2]/70"
              ><img :src="networks[5]" alt="Email" width="20" />Email</a
            >
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-4 mt-16">
          <div class="col-span-1">
            <div
              class="flex cursor-default items-center justify-between border-b border-b-[#F2F2F2]/20"
            >
              <h3 class="text-xl text-[#f2f2f2]/70 font-medium">Starred</h3>
              <img :src="star" class="w-6" />
            </div>
            <div class="flex flex-col items-center gap-y-4 mt-4">
              <PostCard :full="false" />
              <PostCard :full="false" />
              <PostCard :full="false" />
            </div>
          </div>
          <div class="col-span-1">
            <div
              class="flex cursor-default items-center justify-between border-b border-b-[#F2F2F2]/20"
            >
              <h3 class="text-xl text-[#f2f2f2]/70 font-medium">Comments</h3>
              <img :src="comment" class="w-6" />
            </div>
            <div
              class="flex flex-col mb-28 items-center gap-y-4 mt-4"
            >
              <div class="bg-[#252525] p-2 rounded-sm hover:scale-[1.02] transition-all duration-100 ease-linear hover:shadow-md hover:shadow-black/20 cursor-pointer">
                <h2 class="leading-5 h-[40px] line-clamp-2 font-medium">
                  GO! RN - Gestão de conhecimento focado em evolução do time
                </h2>
                <div
                  class="text-base my-2 font-medium text-[#F2F2F2] flex items-center gap-x-1"
                >
                  <img
                    src="../assets/my-memoji02.png"
                    class="w-12 rounded-full -ml-2"
                  />
                  #{{ username }}
                </div>
                <span class="line-clamp-5 text-sm text-[#F2F2F2]/60"
                  >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Cumque at et voluptatem iusto ex impedit quod eos asperiores
                  placeat libero, qui dicta esse in, vero explicabo laboriosam
                  sequi, cupiditate deserunt.</span
                >
              </div>
              <div class="bg-[#252525] p-2 rounded-sm hover:scale-[1.02] transition-all duration-100 ease-linear hover:shadow-md hover:shadow-black/20 cursor-pointer">
                <h2 class="leading-5 h-[40px] line-clamp-2 font-medium">
                  GO! RN - Gestão de conhecimento focado em evolução do time
                </h2>
                <div
                  class="text-base my-2 font-medium text-[#F2F2F2] flex items-center gap-x-1"
                >
                  <img
                    src="../assets/my-memoji02.png"
                    class="w-12 rounded-full -ml-2"
                  />
                  #{{ username }}
                </div>
                <span class="line-clamp-5 text-sm text-[#F2F2F2]/60"
                  >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Cumque at et voluptatem iusto ex impedit quod eos asperiores
                  placeat libero, qui dicta esse in, vero explicabo laboriosam
                  sequi, cupiditate deserunt.</span
                >
              </div>
              <div class="bg-[#252525] p-2 rounded-sm hover:scale-[1.02] transition-all duration-100 ease-linear hover:shadow-md hover:shadow-black/20 cursor-pointer">
                <h2 class="leading-5 h-[40px] line-clamp-2 font-medium">
                  GO! RN - Gestão de conhecimento focado em evolução do time
                </h2>
                <div
                  class="text-base my-2 font-medium text-[#F2F2F2] flex items-center gap-x-1"
                >
                  <img
                    src="../assets/my-memoji02.png"
                    class="w-12 rounded-full -ml-2"
                  />
                  #{{ username }}
                </div>
                <span class="line-clamp-5 text-sm text-[#F2F2F2]/60"
                  >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Cumque at et voluptatem iusto ex impedit quod eos asperiores
                  placeat libero, qui dicta esse in, vero explicabo laboriosam
                  sequi, cupiditate deserunt.</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inner-shadow {
  box-shadow: inset 0 0 10px #00000080;
}
.box-animate {
  animation: scale 1s infinite alternate;
}

@keyframes scale {
  0% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1.1);
  }
}

.pendulum {
  transform-origin: 50% 0%;
  animation: pendulum 2.5s ease-in-out infinite;
}

@keyframes pendulum {
  0% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(5deg);
  }
}
</style>
