<template>
  <v-card
    class="pa-4 container d-flex justify-center flex-column"
    style="height: 70vh"
  >
    <v-row>
      <v-col cols="12"></v-col>
    </v-row>
    <ClientOnly style="width: 100%; height: 100%">
      <LMap
        style="height: 100%; width: 100%"
        :zoom="16"
        :center="[coords[0], coords[1]]"
      >
        <l-tile-layer
          :url="`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${getToken}`"
        />
        <!-- <LTileLayer
              :url="`https://api.mapbox.com/styles/v1/mapbox/cknl7vd9g2ns417s089k87wic/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox_token}`"
            /> -->
        <!--outro ae mapbox://styles/marcostl2/cknl7vd9g2ns417s089k87wic -->
        <!--matrix https://api.mapbox://styles/marcostl2/cknl7yk2i13nc17m9190c86ms -->
        <!-- <l-tile-layer
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer> -->
        <!-- :icon="icon" -->
        <l-marker :lat-lng="coords">
          <!-- <l-tooltip>
              <div style="width: 200px; height: 100px; background: white">
                <h2>Teste</h2>
              </div>
            </l-tooltip> -->
        </l-marker>
      </LMap>
    </ClientOnly>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  computed: {
    coords() {
      return [user.$single.latitude, user.$single.longitude];
    },
    getToken() {
      return process.env.NUXT_APP_MAPBOX_TOKEN;
    },
  },
});
</script>

<style scoped></style>
