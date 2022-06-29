<template>
  <button @click="openSpotify" class="bg-black hover:text-spotify h-10 w-10 flex justify-center items-center transition duration-300 border-r border-gray-900 rounded-l-md hover:shadow-2xl">
    <font-awesome-icon icon="fa-brands fa-spotify" class="fill-current" size="xl" />
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    uri: String,
  },
})
export default class PlayOnSpotify extends Vue {
  uri!: string;

  openSpotify() {
    const songId = this.uri.split(":")[2];
    const url = `https://open.spotify.com/track/${songId}`;
    window.open(url, "_blank");
  }
}
</script>
