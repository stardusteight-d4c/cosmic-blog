<script setup lang="ts">
import Navbar from "../navbar/Navbar.vue";
</script>

<template>
  <div class="w-screen h-screen overflow-hidden bg-[#1a1a1a]">
    <Navbar path="ops! page not found" />
    <div class="grid h-full w-full place-items-center -mt-[76px]">
      <div>
        <h1
          class="text-[100px] text-transparent bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text tracking-widest font-black"
        >
          404
        </h1>
        <router-link to="/" class="w-full flex items-center justify-center">
          <button class="bookmarkBtn">
            <span class="IconContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path
                  d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"
                ></path>
              </svg>
            </span>
            <p class="text">Back</p>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bookmarkBtn {
  width: 100px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.349);
  background-color: rgb(12, 12, 12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
}
.IconContainer {
  width: 30px;
  height: 30px;
  background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;
  transition-duration: 0.3s;
}
.icon {
  border-radius: 1px;
}
.text {
  height: 100%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1;
  transition-duration: 0.3s;
  font-size: 1.04em;
}
.bookmarkBtn:hover .IconContainer {
  width: 90px;
  border-radius: 40px;
  transition-duration: 0.3s;
}
.bookmarkBtn:hover .text {
  transform: translate(10px);
  width: 0;
  font-size: 0;
  transition-duration: 0.3s;
}
.bookmarkBtn:active {
  transform: scale(0.95);
  transition-duration: 0.3s;
}
</style>
