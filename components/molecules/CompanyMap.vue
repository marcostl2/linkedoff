<template>
  <v-dialog :value="dialog" max-width="80vw" @click:outside="$emit('close')">
    <v-card
      class="pa-4 container d-flex justify-center flex-column"
      style="height: 70vh"
    >
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <span class="text-h6 font-weight-bold"></span>
            <v-btn icon @click="$emit('close')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <client-only style="width: 100%; height: 100%">
        <LMap
          ref="map"
          style="height: 100%; width: 100%"
          :zoom="16"
          :center="[coords[0], coords[1]]"
          @click="updateCoords"
          @ready="repaintMap"
        >
          <l-tile-layer
            :url="`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox_token}`"
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
      </client-only>
      <v-btn class="mt-4" color="primary" @click="saveCoords">
        Salvar localização
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  props: {
    dialog: { required: true, type: Boolean },
  },
  data() {
    return {
      mapbox_token:
        "pk.eyJ1IjoibWFyY29zdGwyIiwiYSI6ImNrZzc5ODJiczA1NHQycW53bm4xYTQyZW0ifQ.oVKrPl790Dca194Au2dmjA",
      // icon: L.icon({
      //   iconUrl: require("@/assets/images/raj.png"),
      //   iconSize: [80, 80],
      //   iconAnchor: [16, 37],
      // }),
      coords: [-20.7598, -51.6951],
    };
  },
  mounted() {
    this.$fire.database
      .ref(`users/${user.$single.uid}`)
      .on("value", (snapshot) => {
        if (snapshot.val().latitude && snapshot.val().longitude)
          this.coords = [snapshot.val().latitude, snapshot.val().longitude];
      });
  },
  methods: {
    updateCoords(e) {
      this.coords = [e.latlng.lat, e.latlng.lng];
      //   const coordsUrl =
      //     "http://api.positionstack.com/v1/reverse?access_key=630b083e74caa3e74e70c54012be6e2e&query=" +
      //     e.latlng.lat +
      //     "," +
      //     e.latlng.lng;
      //   this.$axios.$get(coordsUrl).then((response: any) => {
      //     const city = response.data.data[0].county;
      //     const state = response.data.data[0].region;
      //     const country = response.data.data[0].country;
      //     this.$fire.database.ref(`/users/${user.$single.uid}`).update({
      //       latitude: e.latlng.lat,
      //       longitude: e.latlng.lng,
      //       location: city + ", " + state + ", " + country,
      //     });
      //   });
    },
    saveCoords() {
      this.$fire.database.ref(`/users/${user.$single.uid}`).update({
        latitude: this.coords[0],
        longitude: this.coords[1],
      });
      this.$emit("close");
      this.$swal.fire({
        title: "Localização atualizada com sucesso!",
        icon: "success",
        timer: 1500,
      });
      user.create({
        ...user.$single,
        latitude: this.coords[0],
        longitude: this.coords[1],
      });
    },
    repaintMap() {
      this.$nextTick(() => {
        this.$refs.map.mapObject.invalidateSize();
      });
    },
  },
});
</script>

<style scoped lang="scss">
.v-dialog__content {
  z-index: 2000 !important;
}
</style>
