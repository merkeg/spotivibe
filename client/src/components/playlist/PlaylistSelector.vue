<template>
  <Listbox v-model="selectedPlaylist">
    <div class="relative mt-1">
      <ListboxButton class="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 border-gray-800 leading-tight focus:outline-none focus:shadow-outline cursor-default text-left flex justify-between">
        <span class="truncate">{{ selectedPlaylist?.name }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-300">
          <font-awesome-icon icon="fa-solid fa-up-down" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-11 absolute origin-top-right left-0">
          <ListboxOption v-slot="{ active, selected }" v-for="playlist in playlists" :key="playlist" :value="playlist" @click="$emit('valChange', playlist)" as="template">
            <li :class="[active ? 'bg-gray-600' : '', 'relative cursor-default select-none py-2 pl-2 pr-4 rounded-md mx-1']" class="flex justify-between gap-2 items-center">
              <img v-if="playlist.image_url != ''" v-lazy="playlist.image_url" class="h-10 w-10" />
              <font-awesome-icon v-else icon="fa-solid fa-plus" class="h-10 w-10" />
              <div class="truncate flex-grow">
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block']">{{ playlist.name }}</span>
                <span class="text-xs font-thin">{{ playlist.description }}</span>
              </div>
              <!-- <font-awesome-icon v-show="selected" icon="fa-solid fa-check" class="h-5 w-5" /> -->
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { Playlist } from "@/services/Playlist";
import { PropType, watch } from "vue";

@Options({
  props: { playlists: Object as PropType<Playlist[]> },
  components: { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption },
})
export default class PlaylistSelector extends Vue {
  playlists!: Playlist[];
  selectedPlaylist: Playlist | undefined;
  mounted() {
    if (this.playlists[0].id != "new_playlist") {
      this.playlists.unshift({
        name: "Create a new playlist",
        description: "",
        id: "new_playlist",
        image_url: "",
        last_fetch: "",
        snapshot_id: "",
        songs: [],
      });
    }
    this.selectedPlaylist = this.playlists[0];
    this.$forceUpdate();
  }
}
</script>
