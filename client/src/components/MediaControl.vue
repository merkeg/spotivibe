<template>
  <div class="flex justify-center group-hover:opacity-100 opacity-0 duration-500">
    <button v-if="!playing" @click="togglePlaystate" class="h-32 w-32"><font-awesome-icon icon="fa-solid fa-play" class="fill-current" size="5x" /></button>
    <button v-else @click="togglePlaystate" class="h-32 w-32"><font-awesome-icon icon="fa-solid fa-pause" class="fill-current" size="5x" /></button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {},
})
export default class MediaControl extends Vue {
  playing = false;
  togglePlaystate() {
    this.playing = !this.playing;
    this.$emit("playstate", this.playing);
  }
}
</script>
