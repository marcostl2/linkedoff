<template>
  <div class="d-flex flex-column">
    <span>{{ text | capitalizeText }}</span>
    <v-text-field
      v-model="value"
      @input="$emit('input', { value })"
      filled
      rounded
      dense
      :type="password ? (showPass ? '' : 'password') : 'text'"
      :append-icon="password ? (showPass ? 'mdi-eye' : 'mdi-eye-off') : ''"
      @click:append="handleShowPass"
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
    // value: {
    //   type: String,
    //   required: true,
    // },
  },
  data() {
    return {
      value: "",
      showPass: false,
    };
  },
  methods: {
    handleShowPass(): void {
      this.showPass = !this.showPass;
    },
  },
});
</script>

<style scoped lang="scss">
.v-input__slot {
  border-radius: 16px !important;
}
</style>
