<template>
  <div>
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-gray-600' : 'bg-gray-700'"
      class="relative inline-flex w-10 h-5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <span aria-hidden="true" :class="enabled ? 'translate-x-5' : 'translate-x-0'" class="pointer-events-none inline-block w-4 h-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
    </Switch>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class UISwitch extends Vue {
  enabled = ref(false);
}
</script>
