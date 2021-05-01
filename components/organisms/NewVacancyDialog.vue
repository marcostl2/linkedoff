<template>
  <v-dialog :value="dialog" max-width="800">
    <v-card class="pa-6">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="mb-8 d-flex justify-space-between align-center">
            <h2>Anunciar nova vaga</h2>
            <v-btn icon @click="$emit('close')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.title"
            label="Título"
            filled
            rounded
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.title"
            label="Descrição"
            filled
            rounded
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" align="center">
          <v-btn color="primary">Criar vaga</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    dialog: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      form: {
        title: "",
        description: "",
      },
      mapbox_token:
        "pk.eyJ1IjoibWFyY29zdGwyIiwiYSI6ImNrZzc5ODJiczA1NHQycW53bm4xYTQyZW0ifQ.oVKrPl790Dca194Au2dmjA",
      // icon: L.icon({
      //   iconUrl: require("@/assets/images/raj.png"),
      //   iconSize: [80, 80],
      //   iconAnchor: [16, 37],
      // }),
      coords: [-20.896153599999998, -51.3933312],
    };
  },
});
</script>

<style scoped></style>
