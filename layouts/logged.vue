<template>
  <v-app>
    <v-navigation-drawer
      v-show="drawer"
      v-model="drawer"
      absolute
      right
      class="pt-8 px-0"
    >
      <MobileMenu />
    </v-navigation-drawer>
    <div fluid class="pa-0 ma-0">
      <NavBar @handleMenu="drawer = !drawer" />
    </div>
    <main>
      <v-container fluid style="max-width: 1160px" ;>
        <v-row>
          <v-col cols="12" md="9">
            <Nuxt />
          </v-col>
          <v-col cols="3" class="d-none d-md-flex">
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
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    showMenu(): Boolean {
      return this.drawer;
    },
  },
  async created() {
    this.$fire.auth.onAuthStateChanged(() => this.handleSignOut());

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
              connections: data.connections,
              requests: data.requests,
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
body {
  background-color: #f1f1f1;
  height: 100vh;
}
main {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}

.wrapper {
  max-width: 1160px !important;
}
</style>
