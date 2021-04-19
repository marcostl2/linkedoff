<template>
  <v-dialog :value="dialog" max-width="80vw" style="">
    <v-card
      class="pa-4 container d-flex justify-center flex-column"
      style="width: 100%; height: 60vh; z-index: 20000"
    >
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <span class="text-h6 font-weight-bold"></span>
            <v-btn icon @click="$emit('close')">
              <v-icon color="primary">mdi-close</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <ClientOnly style="width: 100%; height: 100%; z-index: 6000">
        <LMap
          style="height: 100%; width: 100%"
          :zoom="8"
          :center="[-22.95162, -43.21077]"
          @click="click"
        >
          <l-tile-layer
            :url="`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox_token}`"
          />
          <!-- <LTileLayer
              :url="`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox_token}`"
            /> -->
          <!--outro ae mapbox://styles/marcostl2/cknl7vd9g2ns417s089k87wic -->
          <!--matrix https://api.mapbox://styles/marcostl2/cknl7yk2i13nc17m9190c86ms -->
          <!-- <l-tile-layer
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer> -->
          <!-- :icon="icon" -->
          <l-marker :lat-lng="coords" :icon="icon">
            <!-- <l-tooltip>
              <div style="width: 200px; height: 100px; background: white">
                <h2>Teste</h2>
              </div>
            </l-tooltip> -->
          </l-marker>
        </LMap>
      </ClientOnly>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import L from "leaflet";
import Vue from "vue";

interface Coord {
  latlng: {
    lat: number;
    lng: number;
  };
}

export default Vue.extend({
  props: {
    dialog: { required: true, type: Boolean },
  },
  data() {
    return {
      mapbox_token:
        "pk.eyJ1IjoibWFyY29zdGwyIiwiYSI6ImNrZzc5ODJiczA1NHQycW53bm4xYTQyZW0ifQ.oVKrPl790Dca194Au2dmjA",
      icon: L.icon({
        iconUrl: require("@/assets/images/raj.png"),
        iconSize: [80, 80],
        iconAnchor: [16, 37],
      }),
      coords: [-22.95162, -43.21077],
    };
  },
  methods: {
    click(e: Coord): void {
      this.coords = [e.latlng.lat, e.latlng.lng];
    },
  },
});
</script>

<style scoped lang="scss">
.v-dialog__content {
  z-index: 2000 !important;
}
</style>
