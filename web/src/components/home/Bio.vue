<script setup lang="ts">
import starStruck from "@/assets/star-struck.png";
import QRcode from "@/assets/qrcode.svg";
import { bioStyles as css } from "./styles";
</script>

<template>
  <h1 :class="css.authorName">Stardusteight</h1>
  <div :class="css.wrapper">
    <div :class="css.bioWrapper">
      <div :class="css.bioContainer">
        <img :src="starStruck" :class="css.starIcon" />
        <p :class="css.paragraph">
          Hello! I'm Gabriel Sena, web developer focused on Stack JavaScript! I
          like to study market trends and I always try to develop end-to-end web
          applications, always extracting the best from each technology.
          <br />
          <br />
          Node.js | TypeScript | React | Vue.js
        </p>
      </div>
    </div>
    <div :class="css.QRcode.wrapper">
      <a
        title="GitHub"
        href="https://github.com/stardusteight-d4c"
        target="_blank"
        :class="css.QRcode.container"
      >
        <img :src="QRcode" :class="css.QRcode.image" />
      </a>
    </div>
  </div>
</template>
