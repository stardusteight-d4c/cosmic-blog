<script setup lang="ts">
function handlePaste(event: ClipboardEvent) {
  const pastedText = event.clipboardData?.getData('text')
  console.log('Texto colado:', pastedText)
}

</script>

<template>
  <main>
    <h2 class="text-3xl md:text-4xl text-center font-bold mb-14">
      Confirm your email address!
    </h2>
    <div @paste="handlePaste">paste</div>
    <input
      ref="hiddenInput"
      type="text"
      style="opacity: 0; position: absolute; top: -9999px; left: -9999px"
    />
    <div class="flex items-center justify-center gap-x-8 w-full">
      <span
        class="w-full h-full min-w-[80px] min-h-[80px] bg-black/80 rounded-md text-4xl text-white font-bold flex items-center justify-center"
        >x</span
      >
      <span
        class="w-full h-full min-w-[80px] min-h-[80px] bg-black/80 rounded-md text-4xl text-white font-bold flex items-center justify-center"
        >x</span
      >
      <span
        class="w-full h-full min-w-[80px] min-h-[80px] bg-black/80 rounded-md text-4xl text-white font-bold flex items-center justify-center"
        >x</span
      >
      <span
        class="w-full h-full min-w-[80px] min-h-[80px] bg-black/80 rounded-md text-4xl text-white font-bold flex items-center justify-center"
        >x</span
      >
      <span
        class="w-full h-full min-w-[80px] min-h-[80px] bg-black/80 rounded-md text-4xl text-white font-bold flex items-center justify-center"
        >x</span
      >
      <span
        class="w-full h-full min-w-[80px] min-h-[80px] bg-black/80 rounded-md text-4xl text-white font-bold flex items-center justify-center"
        >x</span
      >
    </div>
    <button
      type="submit"
      class="form-login-button w-fit text-xl mx-auto mt-8 font-semibold"
    >
      Confirm
    </button>
  </main>
</template>
