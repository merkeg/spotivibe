<template>
  <div class="flex flex-col justify-center">
    <!-- <p class="text-xl text-center mb-4">Select playlists</p> -->
    <div class="flex py-5 items-center m-1 w-72 self-center">
      <div class="flex-grow border-t border-gray-400"></div>
      <span class="flex-shrink mx-4 text-gray-400">Select playlists</span>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>

    <div class="flex flex-row flex-wrap justify-center content-start gap-3" style="width: 36rem">
      <NamedSpotifyPlaylist v-for="playlist in playlists" :name="playlist.name" v-bind:key="playlist.id" :selected="selected?.includes(playlist)" @click="handle(playlist)" />
      <NewPlaylistDialog />
    </div>
  </div>
</template>

<script lang="ts">
import { NamedPlaylist } from "@/services/NamedPlaylist";
import { PropType } from "vue";
import { Options, Vue } from "vue-class-component";
import NamedSpotifyPlaylist from "./NamedSpotifyPlaylist.vue";
import NewPlaylistDialog from "./NewPlaylistDialog.vue";

@Options({
  props: {
    playlists: Object as PropType<NamedPlaylist[]>,
  },
  components: {
    NamedSpotifyPlaylist,
    NewPlaylistDialog,
  },
})
export default class PlaylistSelect extends Vue {
  playlists!: NamedPlaylist[];
  selected: NamedPlaylist[] = [];

  handle(playlist: NamedPlaylist) {
    if (this.selected?.includes(playlist)) {
      this.selected.splice(this.selected.indexOf(playlist), 1);
    } else {
      this.selected?.push(playlist);
    }
  }
}
</script>
