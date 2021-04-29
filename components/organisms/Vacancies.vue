<template>
  <div>
    <v-list class="pa-0" style="overflow-y: scroll" max-height="45rem">
      <v-list-item-group v-model="model">
        <v-card v-for="(item, i) in items" :key="i" outlined height="100%">
          <v-list-item>
            <span>
              {{ item.title }}
            </span>
          </v-list-item>
        </v-card>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      items: [
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
        {
          title: "Vaga 123",
        },
      ],
      model: 1,
    };
  },
});
</script>

<style scoped></style>
