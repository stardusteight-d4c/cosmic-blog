<script setup lang="ts">
import { socialNetworks } from '@/utils/data'
import { socialLinksStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <div :class="css.linksWrapper">
      <a
        v-for="social in socialNetworks"
        href=""
        target="_blank"
        :class="css.link"
        ><img :src="social.url" width="20" />{{ social.name }}</a
      >
    </div>
  </div>
</template>
