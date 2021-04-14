<template>
  <div class="d-flex flex-column">
    <span>{{ text | capitalizeText }}</span>
    <v-text-field
      :value="value"
      filled
      rounded
      dense
      :append-icon="password ? 'mdi-eye' : ''"
      @click:append="showPass"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  filters: {
    capitalizeText(value: string) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  props: {
    password: {
      type: Boolean,
    },
    text: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showPass: false,
    };
  },
});
</script>

<style scoped lang="scss">
.v-input__slot {
  border-radius: 16px !important;
}
</style>
