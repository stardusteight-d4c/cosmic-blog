<script setup lang="ts">
import { useAppStore } from '@/store'
import { Logo, ButtonNewPost, ButtonLogin, ButtonProfile } from './integrate'
import { styles as css } from './styles'
import { computed } from 'vue'
import ButtonLogout from './integrate/ButtonLogout.vue'
import { authMethods } from '@/store/modules/auth'

defineProps({
  path: {
    type: String,
    required: true,
  },
})

const store = useAppStore()
store.commit(authMethods.mutations.setCurrentSession)
const session = computed(() => store.state.auth.session)
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
          <ButtonNewPost v-if="session.decodedToken?.type === 'author'" />
          <ButtonLogin v-if="session.activeSession === false" />
          <ButtonLogout  v-if="session.activeSession === true"  />
          <ButtonProfile
            v-if="session.activeSession === true"
            :userId="session.decodedToken!.user_id"
          />
        </div>
      </div>
    </nav>
  </header>
</template>
