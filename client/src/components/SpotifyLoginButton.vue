<template>
  <button @click="execute" class="bg-spotify hover:bg-spotify-dark font-bold py-2 px-4 rounded m-2 transition-colors">
    <font-awesome-icon icon="fa-brands fa-spotify" class="fill-current w-4 h-4 mr-2 text-xl" />
    <span>Sign in with Spotify</span>
  </button>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue-class-component";
import Auth from "../services/Auth";

@Options({
  props: {},
})
export default class SpotifyLoginButton extends Vue {
  running = false;

  async execute(event: Event) {
    window.open(process.env.VUE_APP_AUTH_URL, "_blank");
    this.checkState();
  }

  async checkState() {
    if (!this.running) {
      const intervalId = window.setInterval(async () => {
        const profile = await Auth.getProfile();
        console.log(profile);

        if (profile != null) {
          window.clearInterval(intervalId);
          this.$router.push({ path: "/" });
        }
      }, 1000);
      this.running = true;
    }
  }
}

export interface ProfileResponse {
  id: string;
  email: string;
  photo: string;
}
</script>
