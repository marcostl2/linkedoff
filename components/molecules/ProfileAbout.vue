<template>
  <v-card color="grey01" elevation="0" class="pa-4">
    <div class="d-flex justify-space-between mb-4">
      <h3>Sobre</h3>
    </div>
    <span>
      {{ bio }}
    </span>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    bio: {
      required: true,
      type: String,
    },
  },
});
</script>

<style scoped></style>
