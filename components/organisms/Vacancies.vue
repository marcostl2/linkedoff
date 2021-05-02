<template>
  <v-list class="pa-0" style="overflow-y: scroll" max-height="32rem">
    <v-list-item-group v-model="model">
      <v-card v-for="(vacancy, i) in items" :key="i" outlined height="100%">
        <v-list-item class="py-2" @click="$emit('clickedVacancy', vacancy)">
          <span>
            {{ vacancy.title }}
          </span>
        </v-list-item>
      </v-card>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    items: { required: true, type: Array },
  },
  data() {
    return {
      model: 0,
    };
  },
});
</script>

<style scoped></style>
