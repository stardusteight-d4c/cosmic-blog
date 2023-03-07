<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navbar',
  props: {
    path: {
      type: String,
      required: true,
    },
  },
})
</script>

<template>
  <header class="py-1 max-w-[725px] mx-auto px-2 lg:py-4 lg:px-0">
    <nav>
      <div
        class="flex flex-col justify-between mt-2 md:mt-0 md:flex-row items-center gap-x-1"
      >
        <div
          class="flex cursor-pointer text-transparent bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text items-center gap-x-1"
        >
          <router-link to="/" class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#3b82f6"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <path
                d="M59.3,40H196.7a8,8,0,0,1,5.6,13.7L128,128,53.7,53.7A8,8,0,0,1,59.3,40Z"
                fill="none"
                stroke="#3b82f6"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              ></path>
              <path
                d="M59.3,216H196.7a8,8,0,0,0,5.6-13.7L128,128,53.7,202.3A8,8,0,0,0,59.3,216Z"
                fill="none"
                stroke="#3b82f6"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              ></path>
              <line
                x1="72"
                y1="72"
                x2="184"
                y2="72"
                fill="none"
                stroke="#3b82f6"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              ></line>
            </svg>
            <span
              class="uppercase tracking-widest font-bold text-lg lg:text-3xl"
              >Cosmic</span
            >
          </router-link>
          <h2
            class="text-[#F2F2F2] capitalize whitespace-nowrap cursor-default font-medium text-lg"
          >
            / {{ path }}
          </h2>
        </div>
        <div class="flex items-center gap-x-2">
          <router-link to="/create-post">
            <button>
              <svg
                class="css-i6dzq1"
                stroke-linejoin="round"
                stroke-linecap="round"
                fill="none"
                stroke-width="2"
                stroke="#F2F2F2"
                height="24"
                width="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                ></path>
              </svg>
              New
            </button>
          </router-link>
          <router-link to="/login">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="css-i6dzq1"
                stroke-linejoin="round"
                stroke-linecap="round"
                fill="none"
                stroke-width="2"
                stroke="#F2F2F2"
                height="24"
                width="24"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
              Login
            </button>
          </router-link>

          <router-link to="/profile/stardusteight" class="cursor-pointer p-2">
            <div class="relative w-8">
              <div class="spinner">
                <div class="spinner1"></div>
              </div>
              <svg
              class="absolute top-0 "
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#3b82f6"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M59.3,40H196.7a8,8,0,0,1,5.6,13.7L128,128,53.7,53.7A8,8,0,0,1,59.3,40Z"
                  fill="none"
                  stroke="#3b82f6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></path>
                <path
                  d="M59.3,216H196.7a8,8,0,0,0,5.6-13.7L128,128,53.7,202.3A8,8,0,0,0,59.3,216Z"
                  fill="none"
                  stroke="#3b82f6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></path>
                <line
                  x1="72"
                  y1="72"
                  x2="184"
                  y2="72"
                  fill="none"
                  stroke="#3b82f6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
              </svg>
            </div>
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-image: linear-gradient(to top, #3b82f6, #8b5cf6);
  border: solid 3px transparent;
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 4px 10px;
  border-radius: 50px;
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

.spinner {
  background-image: linear-gradient(#8b5cf6 35%, #3b82f6);
  width: 24px;
  height: 24px;
  animation: spinning82341 1.7s linear infinite;
  text-align: center;
  border-radius: 50px;
  cursor: pointer;
  filter: blur(1px);
  box-shadow: 0px -5px 20px 0px #8b5cf6, 0px 5px 20px 0px #3b82f6;
}

.spinner1 {
  background-color: rgb(36, 36, 36);
  width: 24px;
  height: 24px;
  border-radius: 50px;
  filter: blur(10px);
}

@keyframes spinning82341 {
  to {
    transform: rotate(360deg);
  }
}
</style>
