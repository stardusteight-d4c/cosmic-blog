<script lang="ts">
import { defineComponent } from 'vue'
import PostCard from '@/components/post/globals/Card.vue'
import SearchBar from './integrate/SearchBar.vue'
import Pagination from './integrate/Pagination.vue';

export default defineComponent({
  name: 'PostGallery',
  components: { PostCard, SearchBar, Pagination },
  setup(_props, { emit }) {},
})
</script>

<template>
  <SearchBar />
  <div class="grid grid-cols-2 gap-4 mt-4">
    <PostCard :full="true" />
    <PostCard :full="true" />
    <PostCard :full="true" />
    <PostCard :full="true" />
    <PostCard :full="true" />
    <PostCard :full="true" />
  </div>
  <Pagination />
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
