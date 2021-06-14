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

      <l-map
        ref="map"
        style="height: 100%; width: 100%"
        :zoom="16"
        :options="getMapOptions"
        :center="[getCoords[0], getCoords[1]]"
        @ready="repaintMap('map')"
      >
        <l-tile-layer
          :url="`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${getToken}`"
        />
        <l-marker :lat-lng="getCoords">
          <l-tooltip :options="tooltipOptions">
            <div style="height: 30px; background: white">
              <h2>Localização da empresa {{ getCompanyName }}</h2>
            </div>
          </l-tooltip>
        </l-marker>
      </l-map>

      <v-btn
        v-if="!friendData"
        color="blue"
        class="white--text"
        @click="handleEdit"
      >
        Alterar localização
      </v-btn>
      <v-dialog v-model="edit" style="z-index: 4000">
        <v-card :height="isMd ? '74vh' : '84vh'" class="pa-4">
          <l-map
            ref="newMap"
            style="height: 84%; width: 100%"
            :zoom="16"
            :center="getNewCoords"
            @click="handleNewCoords"
            @ready="repaintMap('newMap')"
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
                <v-btn color="warning" :loading="loading" @click="handleRemove">
                  Remover
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
  props: {
    friendData: { type: Object },
  },
  data() {
    return {
      loading: false,
      edit: false,
      tooltipOptions: {
        direction: "top",
        offset: [0, 0],
      },
      coords: [0, 0],
      newCoords: [0, 0],
    };
  },
  computed: {
    getToken() {
      return process.env.NUXT_APP_MAPBOX_TOKEN;
    },
    getCompanyName() {
      return this.friendData ? this.friendData.name : user.$single.name;
    },
    getMapOptions() {
      return { scrollWheelZoom: "center" };
    },
    isMd() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    getNewCoords() {
      return [this.newCoords[0], this.newCoords[1]];
    },
    getCoords() {
      return this.coords;
    },
  },
  created() {
    if (!this.friendData) {
      this.newCoords = [user.$single.latitude, user.$single.longitude];
      this.coords = [user.$single.latitude, user.$single.longitude];

      this.tooltipOptions.offset = [
        user.$single.latitude,
        user.$single.longitude,
      ];
    } else {
      this.newCoords = [this.friendData.latitude, this.friendData.longitude];
      this.coords = [this.friendData.latitude, this.friendData.longitude];

      this.tooltipOptions.offset = [
        this.friendData.latitude,
        this.friendData.longitude,
      ];
    }
  },
  methods: {
    handleNewCoords(e) {
      if (this.edit) this.newCoords = [e.latlng.lat, e.latlng.lng];
    },
    handleEdit() {
      this.edit = !this.edit;
    },
    repaintMap(map) {
      this.$nextTick(() => {
        this.$refs[map].mapObject.invalidateSize();
      });
    },
    handleSubmit() {
      try {
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
        user.create({
          ...user.$single,
          latitude: this.newCoords[0],
          longitude: this.newCoords[1],
        });
      } catch (error) {
        // console.log(error);
      }
    },
    handleRemove() {
      this.loading = !this.loading;
      this.$fire.database.ref(`/users/${user.$single.uid}`).update({
        latitude: "",
        longitude: "",
      });
      this.$swal.fire({
        title: "Localização removida com sucesso!",
        icon: "success",
        timer: 2000,
      });
      this.edit = !this.edit;
      this.coords = this.newCoords;
      this.loading = !this.loading;
      user.create({
        ...user.$single,
        latitude: "",
        longitude: "",
      });
    },
  },
});
</script>

<style scoped></style>
