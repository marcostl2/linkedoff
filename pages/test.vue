<template>
  <v-dialog v-model="dialog" max-width="80vw" style="z-index: 3000">
    <v-card
      class="pa-4 container d-flex justify-center"
      style="width: 100%; height: 400px"
    >
      <ClientOnly style="width: 100%; height: 100%">
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
          <!-- <l-marker :lat-lng="coords">
              <l-tooltip>
                <div style="width: 200px; height: 300px; background: white">
                  <h2>Teste</h2>
                </div>
              </l-tooltip>
            </l-marker> -->
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
      dialog: true,
    };
  },
  methods: {
    click(e: Coord): void {
      this.coords = [e.latlng.lat, e.latlng.lng];
    },
  },
});
</script>

<style scoped lang="scss"></style>
