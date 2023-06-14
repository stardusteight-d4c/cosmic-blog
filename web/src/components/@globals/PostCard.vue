<script setup lang="ts">
import { Calendar } from "@globals/atoms/icons";
import Tag from "./integrate/Tag.vue";
import { postCardStyles as css } from "./styles";
import dayjs from "dayjs";

interface IProps {
  isMinimalist?: boolean;
  cover?: string;
  slug: string;
  postId: string;
  title: string;
  postedAt: Date;
  content: string;
  tags: string[];
}

defineProps<IProps>();
</script>

<template>
  <router-link :to="`/post/${slug}`" :class="css.wrapper">
    <img v-if="!isMinimalist" :src="cover" :class="css.cover" />
    <div :class="css.infosContainer">
      <h2 :class="css.title">
        {{ title }}
      </h2>
      <div :class="css.calendarContainer">
        <Calendar width="18" height="18" />{{
          dayjs(postedAt).format("D[/]MMM[, ]YYYY")
        }}
      </div>
      <span :class="css.previewText">{{ content }}</span>
      <div :class="css.tagsContainer">
        <Tag v-for="tag in tags" :tag="tag" />
      </div>
    </div>
  </router-link>
</template>
