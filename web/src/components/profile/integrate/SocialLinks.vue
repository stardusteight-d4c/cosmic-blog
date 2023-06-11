<script setup lang="ts">
import { isObjectEmpty, socialNetworks } from "@/utils";
import { socialLinksStyles as css } from "./styles";
import { computed } from "vue";

const props = defineProps({
  socialLinks: {
    type: Object as any,
  },
});

const filteredSocialLinks = computed(() => {
  const socialLinksKeys = Object.keys(props.socialLinks);
  return socialNetworks.filter((network) =>
    socialLinksKeys.includes(network.name.toLowerCase())
  );
});
</script>

<template>
  <div :class="css.wrapper">
    <div
      :class="css.linksWrapper"
      v-if="socialLinks && !isObjectEmpty(socialLinks)"
    >
      <div v-for="network in filteredSocialLinks">
        <a
          v-if="network.name === 'Email'"
          :href="`mailto:${socialLinks[network.name.toLowerCase()]}`"
          :class="css.link"
        >
          <img :src="network.url" width="20" />
          {{ network.name }}
        </a>
        <a
          v-if="network.name != 'Email'"
          :key="network.name"
          :href="socialLinks[network.name.toLowerCase()]"
          target="_blank"
          :class="css.link"
        >
          <img :src="network.url" width="20" />
          {{ network.name }}
        </a>
      </div>
    </div>
    <div v-else class="text-base mt-2 text-[#f2f2f2]/70">
      No social links yet
    </div>
  </div>
</template>
