<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <p class="font-bold text-6xl m-1">Spotivibe</p>
      <p class="text-xl">Sort your songs into folders</p>
      <SpotifyLoginButton class="mt-8" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SpotifyLoginButton from "../components/SpotifyLoginButton.vue";

@Options({
  components: { SpotifyLoginButton },
})
export default class Login extends Vue {}
</script>
