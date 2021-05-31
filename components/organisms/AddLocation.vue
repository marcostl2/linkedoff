<template>
  <div>
    <v-card color="grey01" elevation="0" class="pa-4">
      <h4 class="mb-4">
        Adicione sua localização para que outras pessoas possam visualizar a
        localização de sua empresa ao buscar por vagas
      </h4>
      <button class="add-location primary--text" @click="addGeo">
        <v-icon color="primary">mdi-map-marker</v-icon>
        Adicionar localização
      </button>
    </v-card>
    <CompanyMap v-if="dialog" :dialog="dialog" @close="dialog = !dialog" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      dialog: false,
      pos: null,
    };
  },
  methods: {
    addGeo() {
      this.dialog = !this.dialog;
    },
    // getGeo() {
    //   navigator.geolocation.getCurrentPosition((pos) => {});
    // },
  },
});
</script>

<style lang="scss" scoped>
.add-location {
  border: 2px dashed #c2c2c2;
  width: 100%;
  padding: 20px 0;
}
</style>
