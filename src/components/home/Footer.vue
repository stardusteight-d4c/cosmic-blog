<script setup lang="ts">
import brazilIcon from '@/assets/brazil.png'
import { Copyright } from '@globals/atoms/icons'
import { footerStyles as css } from './styles'
</script>

<template>
  <footer :class="css.wrapper">
    <div>
      <a
        href="https://github.com/stardusteight-d4c"
        target="_blank"
        :class="css.author"
        >Gabriel Sena</a
      >
      <span :class="css.rights">
        <Copyright width="16" height="16" /> 2023 -
        {{ new Date().getFullYear() }}, All rights reserved.
      </span>
      <img :src="brazilIcon" :class="css.brazilIcon" />
    </div>
  </footer>
</template>
