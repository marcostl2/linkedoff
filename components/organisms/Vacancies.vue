<template>
  <v-list class="pa-0" style="overflow-y: scroll">
    <v-list-item-group v-model="model">
      <v-card v-for="(vacancy, i) in items" :key="i" outlined min-width="200">
        <v-list-item
          class="d-flex flex-column d-md-block py-2 text-left"
          @click="$emit('clickedVacancy', { data: { vacancy, index: i } })"
        >
          <b class="text-left">
            {{ vacancy.title }}
          </b>
          <span class="d-block d-md-none">
            {{ vacancy.description.slice(0, 60) }}...
          </span>
          <span class="my-2 primary--text d-block d-md-none">Ver mais</span>
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

<style scoped>
::after {
  display: none;
}
</style>
