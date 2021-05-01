<template>
  <div>
    <v-card v-for="(con, i) in connections" :key="i" class="pa-4">
      <v-card>
        <div class="d-flex">
          <img
            width="40"
            height="40"
            :src="getImage(con.profileImgUrl)"
            alt="Image"
          />
          <span>{{ con.name }}</span>
          {{ con }}
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      connections: [],
    };
  },
  async created() {
    const ref = await this.$fire.database.ref("/users/");
    ref.on("value", (snapshot) => {
      const uc = user.$single.connections
        ? user.$single.connections.map((t: any) => Object.keys(t)[0])
        : [];
      const entries: any = Object.entries(snapshot.val());
      let us = entries.filter((u: any) => {
        const c = u[1].connections
          ? u[1].connections.map((t: any) => Object.keys(t)[0])
          : [];
        return c.includes(user.$single.uid) && uc.includes(u[0]);
      });
      this.connections = us;
    });
  },
  methods: {
    getImage(img: string) {
      return img
        ? require(img)
        : "https://storage.googleapis.com/kondzilla-wp/2020/07/marks2.jpg";
    },
  },
});
</script>

<style scoped></style>
