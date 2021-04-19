<template>
  <v-app>
    <v-container fluid class="pa-0 ma-0">
      <AppBar />
    </v-container>
    <main>
      <v-container class="d-flex">
        <v-row>
          <v-col cols="8">
            <Nuxt />
          </v-col>
          <v-col cols="4">
            <v-row column>
              <v-col cols="12">
                <Connections />
              </v-col>
              <v-col cols="12">
                <MapAside />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  middleware: "auth",
  created() {
    this.$fire.auth.onAuthStateChanged(() => {
      if (!this.$fire.auth.currentUser) {
        const userReset = {
          email: "",
          uid: "",
        };
        user.create(userReset as any);
        this.$router.push("/login");
      }
    });
  },
});
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}
</style>
