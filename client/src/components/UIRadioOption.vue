<template>
  <RadioGroupOption v-slot="{ checked, disabled }" :value="value">
    <div class="flex w-full items-center justify-between gap-1 hover:bg-gray-700 mt-2 px-4 py-2 rounded-md" :class="disabled ? 'text-gray-500 cursor-default' : 'cursor-pointer'">
      <div class="flex items-center">
        <div>
          <p class="text-sm">{{ name }} <slot name="name"></slot></p>
          <p class="text-xs mt-1 font-thin">{{ description }}</p>
        </div>
      </div>
      <div>
        <div class="h-5 w-5">
          <div v-if="checked" class="bg-gray-600 h-5 w-5 flex items-center justify-center rounded-full transition-all">
            <font-awesome-icon icon="fas fa-check" />
          </div>
        </div>
      </div>
    </div>
  </RadioGroupOption>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RadioGroupLabel, RadioGroupOption, RadioGroupDescription } from "@headlessui/vue";
@Options({
  components: {
    RadioGroupLabel,
    RadioGroupOption,
    RadioGroupDescription,
  },
  props: {
    name: String,
    description: String,
    value: String,
  },
})
export default class UIRadioOption extends Vue {
  name!: string;
  description!: string;
  value!: string;
}
</script>
