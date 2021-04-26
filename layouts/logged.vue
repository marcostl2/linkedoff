<template>
  <v-app>
    <v-container fluid class="pa-0 ma-0">
      <NavBar />
    </v-container>
    <main>
      <v-container class="d-flex" fluid style="max-width: 1160px" ;>
        <v-row class="py-6">
          <v-col cols="9">
            <Nuxt />
          </v-col>
          <v-col cols="3">
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
    this.$fire.auth.onAuthStateChanged(() => this.handleSignOut());

    setInterval(() => this.reloadData(), 300000);
  },
  methods: {
    handleSignOut() {
      if (!this.$fire.auth.currentUser) {
        const userReset = {
          email: "",
          uid: "",
        };
        user.create(userReset as any);
        this.$router.push("/login");
      }
    },
    reloadData() {
      this.$fire.auth
        .signInWithEmailAndPassword(user.$single.email, user.$single.password)
        .then((data) => {
          const ref = this.$fire.database.ref(`users/${data.user!.uid}`);
          const uid = data.user!.uid;

          ref.on("value", (snapshot) => {
            const data = snapshot.val();

            const payload = {
              name: data.name,
              email: data.email,
              password: data.password,
              profileImgUrl: data.profileImgUrl,
              bio: data.bio,
              coverUrl: data.coverUrl,
              latitude: data.latitude,
              longitude: data.longitude,
              isCompany: data.isCompany,
            };

            user.create({ ...payload, uid } as any);
          });
        })
        .catch((): void => {
          throw new Error("Erro");
        });
    },
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
