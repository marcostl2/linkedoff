<template>
  <div>
    <v-card v-if="loading" class="pa-4">
      <v-skeleton-loader
        class="mb-4"
        type="list-item-avatar"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mb-4"
        type="list-item-avatar"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mb-4"
        type="list-item-avatar"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mb-4"
        type="list-item-avatar"
      ></v-skeleton-loader>
    </v-card>
    <v-card v-else class="pa-4">
      <h3>Suas conexões</h3>
      <v-divider class="my-4"></v-divider>
      <div
        v-for="(con, i) in getConnections"
        :key="i"
        class="d-flex align-center mb-8"
      >
        <img
          width="50"
          height="50"
          style="border-radius: 50%"
          :src="getImg(con.profileImgUrl)"
          class="mr-4"
          alt="Image"
        />
        <NuxtLink :to="`/users/${con.name.split(' ').join('_')}`">
          <b class="text-h6">{{ con.name }}</b>
        </NuxtLink>
      </div>
    </v-card>
  </div>
</template>

<script>
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      connections: [],
      loading: true,
    };
  },
  computed: {
    getConnections() {
      return this.connections;
    },
  },
  async created() {
    const ref = await this.$fire.database.ref(`/users/${user.$single.uid}`);
    ref.on("value", (snapshot) => {
      const myConnections = snapshot.val().connections || [];
      if (myConnections.length) {
        let cAux = [];
        for (let i = 0; i < myConnections.length; i++) {
          this.$fire.database
            .ref(`users/${myConnections[i].uid}`)
            .on("value", (snapshot) => {
              cAux.push(snapshot.val());
            });
        }
        this.connections = cAux;
        this.loading = false;
      }
    });
  },
  methods: {
    getImg(img) {
      return img || require("@/assets/images/default-profile.png");
    },
  },
});
</script>

<style scoped></style>
