<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      hide-details=""
      prepend-inner-icon="mdi-magnify"
      rounded
      filled
      placeholder="Buscar pessoas"
      v-model="q"
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
    handleSubmit(): void {
      this.$router.push(`/search?q=${this.q}`)
    }
  }
});
</script>

<style scoped></style>
