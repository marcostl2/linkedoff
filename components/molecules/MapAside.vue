<template>
  <div>
    <v-card class="pa-4" max-width="300">
      <v-row column>
        <v-col cols="12">
          <h3>Encontre estudantes com as mesmas techs que você</h3>
        </v-col>
        <v-col cols="12">
          <div :style="getZIndex">
            <client-only style="width: 100%; height: 100%">
              <l-map
                style="height: 100%; width: 100%"
                :zoom="10"
                over
                :center="[this.coords[0], this.coords[1]]"
                @click="dialog = !dialog"
              >
                <!-- <l-tile-layer
                :url="`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox_token}`"
              /> -->
                <l-tile-layer
                  :url="`https://api.mapbox.com/styles/v1/marcostl2/cknl7yk2i13nc17m9190c86ms/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox_token}`"
                />
                <!--outro ae mapbox://styles/marcostl2/cknl7vd9g2ns417s089k87wic -->
                <!--matrix https://api.mapbox://styles/marcostl2/cknl7yk2i13nc17m9190c86ms -->
                <!-- <l-tile-layer
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer> -->
                <!-- :icon="icon" -->
                <l-marker :lat-lng="coords">
                  <l-tooltip>
                    <div style="width: 200px; height: 300px; background: white">
                      <h2>Teste</h2>
                    </div>
                  </l-tooltip>
                </l-marker>
              </l-map>
            </client-only>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <Map v-if="dialog" :dialog="dialog" @close="dialog = !dialog" />
  </div>
</template>

<script lang="ts">
import L from "leaflet";
import Vue from "vue";
import { user } from "@/store";
import "leaflet/dist/leaflet.css";

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
      coords: [-20.896153599999998, -51.3933312],
      dialog: false,
    };
  },
  computed: {
    getZIndex(): string {
      return this.dialog
        ? "width: 100%; height: 200px;z-index:1"
        : "width: 100%; height: 200px";
    },
  },
  methods: {
    click(e: Coord): void {
      this.coords = [e.latlng.lat, e.latlng.lng];
    },
  },
  mounted: function () {
    this.$fire.database
      .ref(`users/${user.$single.uid}`)
      .on("value", (snapshot) => {
        this.coords = [snapshot.val().latitude, snapshot.val().longitude];
      });
  },
});
</script>

<style scoped lang="scss"></style>
