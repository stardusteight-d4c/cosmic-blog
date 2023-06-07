<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import Send from '@globals/atoms/icons/Send.vue'
import Btn from '@globals/Btn.vue'
import { submitCommentStyles as css } from './styles'
import { useAppStore } from '@/store'
import { getAvatarUrlById } from '@/utils'
import { postMethods } from '@/store/modules/post'
import { IComment } from '@/@interfaces/comment'


const emit = defineEmits(['submitComment'])

const comment = ref('')
const countCharacters = ref(0)

watch(comment, (newValue) => {
  countCharacters.value = newValue.length
})

const isGuest = computed(() => store.state.post.post?.isGuest ?? true)
const store = useAppStore()

const currentUserSession = computed(() => store.state.auth.session)
const userAvatar = getAvatarUrlById(
  currentUserSession.value.decodedToken?.avatarId ?? ''
)
const handledAvatarString = userAvatar?.replace(/-\d+\.png$/, '-')!
let currentMemoji = ref(1)
console.log(handledAvatarString)
const postId = computed(() => store.state.post.post?.id)
const postTitle = computed(() => store.state.post.post?.title)
function handleMemoji(): void {
  if (currentMemoji.value < 3) {
    currentMemoji.value++
  } else if (currentMemoji.value === 3) {
    currentMemoji.value = 1
  }
}

async function submitComment() {
  emit('submitComment')
  const session = currentUserSession.value.decodedToken!
  const payload: IComment = {
    content: comment.value,
    postedAt: new Date(),
    postId: postId.value!,
    postTitle: postTitle.value!,
    owner: {
      id: session.user_id,
      avatar: `${handledAvatarString}${currentMemoji.value}.png`,
      username: session.username,
    },
  }
  await store.dispatch(postMethods.actions.LEAVE_A_COMMENT, payload)
  store.commit(postMethods.mutations.SET_COMMENT_AMOUNT, true)
  comment.value = ''
}
</script>

<template>
  <div v-if="!isGuest" :class="css.wrapper">
    <img
      @click="handleMemoji"
      v-bind:key="currentMemoji"
      :src="`${handledAvatarString}${currentMemoji}.png`"
      :class="css.memoji"
    />
    <div :class="css.contentContainer">
      <div :class="css.triangleSubmit" />
      <textarea
        v-model="comment"
        placeholder="Leave a feedback or comment about it :)"
        :spellcheck="false"
        :class="css.textarea"
      />
      <div :class="css.footerContainer">
        <span :class="css.handleCountColor(countCharacters)"
          >{{ countCharacters }}/500</span
        >
        <Btn
          @click="submitComment"
          title="Submit"
          :disabled="countCharacters > 500"
        >
          <template #icon> <Send size="16" /></template>
        </Btn>
      </div>
    </div>
  </div>
</template>
