<template>
  <div class="absolute top-2 left-2">
    <Popover as="div" class="relative inline-block text-left">
      <PopoverButton class="h-10 w-10 rounded-full flex justify-center items-center transition duration-300 hover:text-gray-300">
        <font-awesome-icon icon="fa-solid fa-gear" class="fill-current" size="xl" />
      </PopoverButton>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <PopoverPanel class="absolute origin-top-right left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none text-white divide-y divide-gray-700">
          <div class="py-1">
            <div class="block px-4 py-2 text-sm mr-1 ml-1 rounded-md">
              <div class="flex flex-row justify-start items-center gap-2">
                <img :src="profile.photo" class="w-8 h-8 rounded-md" :class="profile.product == 'premium' ? '' : ''" />

                <div class="flex-grow">
                  <p class="text-s font-thin flex justify-start gap-1 items-center">{{ profile.id }}</p>
                  <p class="text-xs font-thin">{{ profile.email }}</p>
                </div>
                <font-awesome-icon v-if="profile.product == 'premium'" icon="fa-solid fa-star" class="text-yellow-400" title="Spotify premium" />
              </div>
            </div>
          </div>
          <div class="py-1">
            <div class="block text-sm mr-1 ml-1 rounded-md">
              <Disclosure v-slot="{ open }">
                <DisclosureButton class="pl-4 py-2 hover:bg-gray-700 w-full rounded-md pr-2">
                  <a class="flex flex-row justify-start items-center gap-3">
                    <font-awesome-icon icon="fab fa-spotify" />
                    <a class="flex-grow text-left">Button functionality</a>
                    <font-awesome-icon icon="fas fa-angle-down" :class="open ? 'rotate-180' : ''" class="transform transition-all duration-300" />
                  </a>
                </DisclosureButton>
                <DisclosurePanel>
                  <RadioGroup v-model="option">
                    <UIRadioOption name="Open in Tab" description="Open the song in a new tab" value="tab"></UIRadioOption>
                    <UIRadioOption name="Active device" description="Play the song on an active spotify device" value="spotify">
                      <template v-slot:name>
                        <font-awesome-icon icon="fa-solid fa-star" class="text-yellow-400" title="Premium feature" />
                      </template>
                    </UIRadioOption>
                    <UIRadioOption name="Webplayer" disabled="true" description="Use integrated Spotify webplayer" value="webplayer">
                      <template v-slot:name>
                        <font-awesome-icon icon="fa-solid fa-star" class="text-yellow-400" title="Premium feature" />
                        <a class="ml-1 text-xs bg-gray-600 px-1 rounded-md text-white">soon</a>
                      </template>
                    </UIRadioOption>
                  </RadioGroup>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>
          <div class="py-1">
            <div class="block px-4 py-2 text-sm mr-1 ml-1 rounded-md hover:bg-gray-700 cursor-pointer">
              <a class="flex flex-row justify-start items-center gap-3">
                <font-awesome-icon icon="fa-solid fa-rotate" />
                <p>Sync playlists</p>
              </a>
            </div>
            <div class="block px-4 py-2 text-sm mr-1 ml-1 rounded-md hover:bg-gray-700 cursor-pointer">
              <a class="flex flex-row justify-start items-center gap-3">
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="text-red-400" />
                <p>Logout</p>
              </a>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Popover, PopoverButton, PopoverPanel, RadioGroup, RadioGroupLabel, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ProfileResponse } from "@/services/Auth";
import { PropType, ref } from "vue";
import UISwitch from "./UISwitch.vue";
import UIRadioOption from "./UIRadioOption.vue";
import { options } from "@/store";
@Options({
  props: {
    uri: String,
    profile: Object as PropType<ProfileResponse>,
  },
  components: {
    UISwitch,
    Popover,
    PopoverButton,
    PopoverPanel,
    RadioGroup,
    UIRadioOption,
    RadioGroupLabel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
})
export default class SettingsButton extends Vue {
  uri!: string;
  profile!: ProfileResponse;
  option = "tab";
  mounted() {
    this.$watch("option", () => {
      options.button_type = this.option;
    });
  }
}
</script>
