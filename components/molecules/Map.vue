<template>
  <client-only>
    <v-card
      class="pa-4 container d-flex justify-center flex-column"
      style="height: 70vh"
    >
      <v-row>
        <v-col cols="12">
          <h4>Localização</h4>
        </v-col>
      </v-row>

      <LMap
        style="height: 100%; width: 100%"
        :zoom="16"
        :options="getMapOptions"
        :center="[coords[0], coords[1]]"
      >
        <l-tile-layer
          :url="`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${getToken}`"
        />
        <l-marker :lat-lng="coords">
          <l-tooltip :options="tooltipOptions">
            <div style="height: 30px; background: white">
              <h2>Localização da empresa {{ getCompanyName }}</h2>
            </div>
          </l-tooltip>
        </l-marker>
      </LMap>

      <v-btn color="blue" class="white--text" @click="handleEdit">
        Alterar localização
      </v-btn>
      <v-dialog v-model="edit" style="z-index: 4000">
        <v-card :height="isMd ? '74vh' : '84vh'" class="pa-4">
          <l-map
            ref="map"
            style="height: 84%; width: 100%"
            :zoom="16"
            :center="[newCoords[0], newCoords[1]]"
            @click="handleNewCoords"
            @ready="repaintMap"
          >
            <l-tile-layer
              :url="`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${getToken}`"
            />
            <l-marker :lat-lng="newCoords">
              <l-tooltip :options="tooltipOptions">
                <div style="height: 30px; background: white">
                  <h2>Localização da empresa {{ getCompanyName }}</h2>
                </div>
              </l-tooltip>
            </l-marker>
          </l-map>

          <v-row class="pt-2">
            <v-col>
              <div>
                <h3 class="mb-2">
                  Clique no mapa e escolha a nova localização
                </h3>
                <v-btn color="success" :loading="loading" @click="handleSubmit">
                  Salvar
                </v-btn>
                <v-btn color="error" @click="edit = !edit">Cancelar</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-card>
  </client-only>
</template>

<script>
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      loading: false,
      edit: false,
      tooltipOptions: {
        direction: "top",
        offset: [user.$single.latitude, user.$single.longitude],
      },
      coords: [user.$single.latitude, user.$single.longitude],
      newCoords: [user.$single.latitude, user.$single.longitude],
    };
  },
  computed: {
    getToken() {
      return process.env.NUXT_APP_MAPBOX_TOKEN;
    },
    getCompanyName() {
      return user.$single.name;
    },
    getMapOptions() {
      return { scrollWheelZoom: "center", dragging: this.edit };
    },
    isMd() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
  },
  methods: {
    handleNewCoords(e) {
      if (this.edit) this.newCoords = [e.latlng.lat, e.latlng.lng];
    },
    handleEdit() {
      this.edit = !this.edit;
    },
    repaintMap() {
      this.$nextTick(() => {
        this.$refs.map.mapObject.invalidateSize();
      });
    },
    handleSubmit() {
      this.loading = !this.loading;
      this.$fire.database.ref(`/users/${user.$single.uid}`).update({
        latitude: this.newCoords[0],
        longitude: this.newCoords[1],
      });
      this.$swal.fire({
        title: "Localização atualizada com sucesso!",
        icon: "success",
        timer: 2000,
      });
      this.edit = !this.edit;
      this.coords = this.newCoords;
      this.loading = !this.loading;
    },
  },
});
</script>

<style scoped></style>
