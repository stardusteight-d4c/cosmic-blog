<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DonutChart',
  props: {
    percentage: {
      type: Number,
      required: true,
      validator: (value: number) => value >= 0 && value <= 100,
    },
  },
  computed: {
    circleStyle(): { 'stroke-dashoffset': number } {
      const circumference = Math.round(2 * 3.14 * 15) // 94,2
      const fillLength = circumference - (circumference * this.percentage) / 100 // 47
      return {
        'stroke-dashoffset': fillLength,
      }
    },
  },
})
</script>

<template>
  <svg :key="percentage" :style="{ '--percentage': percentage }">
    <circle cx="50%" cy="50%" r="15" opacity="0.5" f stroke="#F2F2F250" />
    <circle
      cx="50%"
      cy="50%"
      r="15"
      stroke="url(#paint0_linear_201_85)"
      :style="circleStyle"
    />
    <defs>
      <linearGradient
        id="paint0_linear_201_85"
        x1="-9"
        y1="20"
        x2="80"
        y2="20"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#3B82F6" />
        <stop offset="1" stop-color="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
svg {
  width: 50px;
  height: 50px;
  transform: rotate(-90deg);
}
svg circle {
  stroke-width: 5;
  fill: none;
  stroke-dasharray: 94.2;  /* circumference */
}
svg circle:nth-child(1) {
  stroke-dashoffset: 0;
}
svg circle:nth-child(2) {
  /* (2 * π * r) -> 2 * 3,14 * 15 = 94.2 circumference  */
  stroke-dashoffset: calc(94.2 - (94.2 * var(--percentage)) / 100);
}
</style>
