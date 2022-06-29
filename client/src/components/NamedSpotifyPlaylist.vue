<template>
  <button
    class="h-10 w-40 text-sm text-center rounded-full hover:shadow-xl transition-all duration-300 truncate pl-2 pr-2 border-2 border-opacity-0 hover:border-opacity-100 border-white"
    :style="{ backgroundColor: `${bgColor}`, color: `${color}` }"
  >
    <a>{{ name }}</a>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    bgColor: String,
    color: String,
    name: String,
  },
})
export default class NamedSpotifyPlaylist extends Vue {
  bgColor!: string;
  color!: string;
  name!: string;
}
</script>
