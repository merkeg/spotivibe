<template>
  <button class="h-10 w-40 text-sm text-center rounded-md hover:shadow-xl transition-all duration-300 truncate pl-2 pr-2 bg-blue-600 hover:bg-blue-700 flex justify-end items-center">
    <a class="flex-grow">{{ name }} <font-awesome-icon v-if="selected" icon="fa-solid fa-check" class="ml-1" /></a>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: String,
    selected: Boolean,
  },
})
export default class NamedSpotifyPlaylist extends Vue {
  name!: string;
  selected!: boolean;
}
</script>
