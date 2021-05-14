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

interface Vacancy {
  title: string;
  description: string;
}

export default Vue.extend({
  middleware: "auth",
  async created() {
    this.$fire.auth.onAuthStateChanged(() => this.handleSignOut());

    setInterval(() => this.reloadData(), 300000);

    this.$fire.database
      .ref(`vacancies/${user.$single.uid}`)
      .on("value", (snapshot) => {
        let values = snapshot.val() as Array<Vacancy>;
        let aux: Vacancy[] = [];
        for (let i in values) {
          aux.push(values[i]);
        }
        user.create({ ...user.$single, vacancies: aux } as any);
      });

    const refPosts = await this.$fire.database.ref(`posts/${user.$single.uid}`);
    refPosts.on("value", (snapshot) => {
      user.create({ ...user.$single, posts: snapshot.val() } as any);
    });

    // const ref = this.$fire.database.ref(
    //   `/users/${user.$single.uid}/connections`
    // );
    // ref.on("value", (snapshot) => {
    // const uc = user.$single.connections
    //   ? user.$single.connections.map((t: any) => Object.keys(t)[0])
    //   : [];
    // const entries: any = Object.entries(snapshot.val());
    // let us = entries.filter((u: any) => {
    //   const c = u[1].connections
    //     ? u[1].connections.map((t: any) => Object.keys(t)[0])
    //     : [];
    //   return c.includes(user.$single.uid) && uc.includes(u[0]);
    // });
    //   user.create({ ...user.$single, connections: snapshot.val() } as any);
    // });
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
              isLogged: data.isLogged,
              coverUrl: data.coverUrl,
              latitude: data.latitude,
              profession: data.profession,
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

<style lang="scss">
main {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}

.wrapper {
  max-width: 1160px !important;
}
</style>
