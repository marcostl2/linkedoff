<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="q"
      hide-details=""
      prepend-inner-icon="mdi-magnify"
      rounded
      filled
      placeholder="Buscar pessoas"
      @click:prepend-inner="handleSubmit"
    />
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      q: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$router.push(`/search?q=${this.q}`);
    },
  },
});
</script>

<style scoped></style>
