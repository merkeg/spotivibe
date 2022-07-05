<template>
  <div v-if="dataReady == true" class="flex flex-col items-center justify-center">
    <SongDisplayComponent :volume="0.5" :song="currentSong" class="mt-10 w-auto pb-5 h-96" />
    <PlaylistSelect class="mt-2" :playlists="namedPlaylists" />
    <div class="inline-flex mt-10">
      <PlayOnSpotify :uri="currentSong.uri" />
      <NextSong @nextSong="nextSong" class="" />
    </div>

    <SettingsButton :profile="profile" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Auth, { ProfileResponse } from "../services/Auth";
import SongDisplayComponent from "../components/media/SongDisplayComponent.vue";
import { Song } from "@/services/Song";
import Queue from "@/services/Queue";
import NextSong from "@/components/media/NextSong.vue";
import PlaylistSelect from "../components/playlist/PlaylistSelect.vue";
import PlayOnSpotify from "../components/media/PlayOnSpotify.vue";

import SettingsButton from "../components/settings/SettingsButton.vue";
import NamedPlaylistService, { NamedPlaylist } from "@/services/NamedPlaylist";

@Options({
  components: {
    SongDisplayComponent,
    NextSong,
    PlaylistSelect,
    PlayOnSpotify,
    SettingsButton,
  },
})
export default class Home extends Vue {
  songs: Song[] = [];
  profile?: ProfileResponse;
  currentSong!: Song;
  namedPlaylists?: NamedPlaylist[];
  dataReady = false;

  async mounted() {
    const prof = await Auth.getProfile();
    if (prof == null) {
      this.$router.push({ path: "/login" });
    } else {
      this.profile = prof;
      if (this.songs.length == 0) {
        await this.fillQueue();
      }
      if (this.currentSong == null) {
        this.currentSong = this.songs.pop() as Song;
      }
      await this.fetchNamedPlaylists();
      this.dataReady = true;
    }
  }

  async nextSong() {
    const next = this.songs.pop();
    if (next == null) {
      await this.fillQueue();
      this.nextSong();
    } else {
      this.currentSong = next as Song;
      this.$forceUpdate();
    }
  }

  async fetchNamedPlaylists() {
    this.namedPlaylists = (await NamedPlaylistService.getNamedPlaylists()) as NamedPlaylist[];
  }

  async fillQueue() {
    const queue = await Queue.requestQueue();
    this.songs = queue as Song[];
  }
}
</script>
