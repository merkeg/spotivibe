<template>
  <div class="container flex flex-col items-center text-center">
    <div class="flex align-middle justify-evenly">
      <div
        class="h-64 w-64 rounded-3xl m-5 shadow-lg hover:shadow-2xl duration-500 transform transition hover:scale-110 hover:rotate-2 flex items-center justify-center bg-blend-multiply bg-gray-900 bg-opacity-0 hover:bg-opacity-50 group"
        :style="{ backgroundImage: `url(${song.image_url})`, 'background-size': '16rem' }"
      >
        <MediaControl @playstate="playstate" />
      </div>
    </div>

    <p class="text-3xl font-bold">{{ song.name }}</p>
    <p class="text-sm font-light mt-1">{{ processArtists() }}</p>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Options, Vue } from "vue-class-component";
import { Artist, Song } from "../../services/Song";
import PlayOnSpotify from "./PlayOnSpotify.vue";
import NextSong from "./NextSong.vue";
import MediaControl from "./MediaControl.vue";

@Options({
  props: {
    song: Object as PropType<Song>,
    volume: Number,
  },
  components: {
    PlayOnSpotify,
    NextSong,
    MediaControl,
  },
})
export default class SongDisplayComponent extends Vue {
  song!: Song;
  volume!: number;
  audio?: HTMLAudioElement;
  audio_url = "";
  playbackState = false;

  processArtists(): string {
    let names: string[] = [];
    this.song.artists.forEach((artist: Artist) => names.push(artist.name));
    return names.join(", ");
  }

  // mounted() {}

  nextSong() {
    this.$emit("nextSong");
  }

  updated() {
    if (this.playbackState) {
      this.audio?.pause();
      this.playbackSong();
    }
    document.title = this.song.name + " - " + this.processArtists();
  }

  playstate(state: boolean) {
    this.playbackState = state;
    if (state) {
      this.playbackSong();
    } else {
      if (this.audio != null) {
        this.audio.pause();
      }
    }
  }

  playbackSong() {
    if (this.song.preview_url != null) {
      if (this.audio_url != this.song.preview_url) {
        this.audio = new Audio(this.song.preview_url);
        this.audio.loop = true;
      }

      this.audio!.volume = this.volume;
      this.audio!.play();
      this.audio_url = this.song.preview_url;
    }
  }
}
</script>
