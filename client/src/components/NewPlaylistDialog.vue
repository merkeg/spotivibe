<template>
  <div>
    <button
      @click="dialogOpen = true"
      class="h-10 w-40 text-sm text-center rounded-full hover:shadow-xl transition-all duration-300 truncate pl-2 pr-2 border-2 border-opacity-0 hover:border-opacity-100 border-white bg-green-600 flex justify-center gap-2 items-center"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
      <a>new playlist</a>
    </button>
    <TransitionRoot appear :show="dialogOpen" as="template">
      <Dialog as="div" @close="dialogOpen = false" class="relative z-10">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
              <DialogPanel class="w-full max-w-md transform rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg leading-6 text-white font-bold"> Create a new Playlist </DialogTitle>
                <div class="mt-3">
                  <label class="block text-sm mb-2 font-thin">Name</label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 border-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Playlist name"
                    v-model="playlistName"
                  />
                </div>
                <div class="mt-3">
                  <label class="text-sm mb-2 font-thin">Base playlist</label>
                  <PlaylistSelector :playlists="existingPlaylists" @valChange="changeBasePlaylist" />
                </div>

                <div class="mt-4">
                  <label class="block text-sm mb-2 font-thin">Name</label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 border-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Playlist name"
                    v-model="playlistName"
                  />
                </div>

                <div class="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                    @click="dialogOpen = false"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-spotify px-4 py-2 text-sm font-medium hover:bg-spotify-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                    @click="createPlaylist"
                  >
                    Create Playlist
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import PlaylistSelector from "./PlaylistSelector.vue";
import PlaylistService, { Playlist } from "@/services/Playlist";
import UISwitch from "./UISwitch.vue";

@Options({
  props: {},
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    PlaylistSelector,
    UISwitch,
  },
})
export default class NewPlaylistDialog extends Vue {
  dialogOpen = false;
  playlistName = "";
  existingPlaylists: Playlist[] = [];
  basePlaylist?: Playlist;

  createPlaylist() {
    this.dialogOpen = false;
  }

  async mounted() {
    this.existingPlaylists = (await PlaylistService.getPlaylists()) as Playlist[];
  }
  changeBasePlaylist(playlist: Playlist) {
    this.basePlaylist = playlist;
    console.log(playlist.name);
  }
}
</script>
