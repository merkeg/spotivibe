<template>
  <div class="absolute top-2 left-2">
    <Menu as="div" class="relative inline-block text-left">
      <MenuButton class="h-10 w-10 rounded-full flex justify-center items-center transition duration-300 hover:text-gray-300">
        <font-awesome-icon icon="fa-solid fa-gear" class="fill-current" size="xl" />
      </MenuButton>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems class="absolute origin-top-right left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none text-white divide-y divide-gray-700">
          <div class="py-1">
            <MenuItem class="block px-4 py-2 text-sm mr-1 ml-1 rounded-md gap-2">
              <div class="flex flex-row justify-start">
                <img :src="profile.photo" class="w-8 h-8 rounded-md" />
                <div>
                  <p class="text-xs font-thin">{{ profile.id }}</p>
                  <p class="text-xs font-thin">{{ profile.email }}</p>
                </div>
              </div>
            </MenuItem>
          </div>
          <div class="py-1">
            <MenuItem class="block px-4 py-2 text-sm mr-1 ml-1 rounded-md hover:bg-gray-700">
              <a class="flex flex-row justify-start items-center gap-3 cursor-pointer">
                <font-awesome-icon icon="fa-solid fa-rotate" />
                <p>Sync playlists</p>
                <UISwitch />
              </a>
            </MenuItem>
          </div>
          <div class="py-1">
            <MenuItem class="block px-4 py-2 text-sm mr-1 ml-1 rounded-md hover:bg-gray-700">
              <a class="flex flex-row justify-start items-center gap-3 cursor-pointer">
                <font-awesome-icon icon="fa-solid fa-rotate" />
                <p>Sync playlists</p>
              </a>
            </MenuItem>
            <MenuItem class="block px-4 py-2 text-sm mr-1 ml-1 rounded-md hover:bg-gray-700">
              <a class="flex flex-row justify-start items-center gap-3 cursor-pointer">
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="text-red-400" />
                <p>Logout</p>
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ProfileResponse } from "@/services/Auth";
import { PropType, ref } from "vue";
import UISwitch from "./UISwitch.vue";
@Options({
  props: {
    uri: String,
    profile: Object as PropType<ProfileResponse>,
  },
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    UISwitch,
  },
})
export default class SettingsButton extends Vue {
  uri!: string;
  profile!: ProfileResponse;
  enabled = ref(true);
}
</script>
