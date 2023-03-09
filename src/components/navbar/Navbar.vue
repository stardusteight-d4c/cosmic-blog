<script lang="ts">
import { defineComponent } from 'vue'
import { Logo, NewPostButton, LoginButton, ProfileButton } from './integrate'
import { styles } from './styles'

export default defineComponent({
  name: 'Navbar',
  components: { Logo, LoginButton, NewPostButton, ProfileButton },
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    return { styles, props }
  },
})
</script>

<template>
  <header :class="styles.header">
    <nav>
      <div :class="styles.contentWrapper">
        <div :class="styles.logoContainer">
          <Logo />
          <h2 :class="styles.path">/ {{ props.path }}</h2>
        </div>
        <div :class="styles.buttonsContainer">
          <NewPostButton />
          <LoginButton />
          <ProfileButton />
        </div>
      </div>
    </nav>
  </header>
</template>
