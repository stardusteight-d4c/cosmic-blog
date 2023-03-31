<script setup lang="ts">
import { Logo, ButtonNewPost, ButtonLogin, ButtonProfile } from './integrate'
import { styles as css } from './styles'

defineProps({
  path: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <header :class="css.header">
    <nav>
      <div :class="css.contentWrapper">
        <div :class="css.logoContainer">
          <Logo />
          <h2 :class="css.path">/ {{ path }}</h2>
        </div>
        <div :class="css.buttonsContainer">
          <ButtonNewPost />
          <ButtonLogin />
          <ButtonProfile />
        </div>
      </div>
    </nav>
  </header>
</template>
