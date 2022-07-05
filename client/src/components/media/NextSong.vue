<template>
  <button @click="$emit('nextSong')" class="bg-black h-10 w-32 self-center rounded-r-md flex justify-center items-center hover:shadow-2xl transition-all hover:text-spotify duration-300">
    <a>Next Song</a>
    <font-awesome-icon icon="fa-solid fa-chevron-right" class="fill-current ml-2" size="l" />
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {},
})
export default class NextSong extends Vue {}
</script>
