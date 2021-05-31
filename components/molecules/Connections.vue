<template>
  <v-card class="pa-4" max-width="300">
    <v-row v-if="loading">
      <v-col cols="12">
        <v-skeleton-loader
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12">
        <v-skeleton-loader
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12">
        <v-skeleton-loader
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else column>
      <v-col cols="12">
        <h3>Suas conexões</h3>
      </v-col>
      <div v-if="connections.length">
        <v-col v-for="user in connections" :key="user.uid" cols="12">
          <NuxtLink :to="`/users/${user.name.split(' ').join('_')}`">
            <div class="d-flex">
              <img :src="getImg(user.profileImgUrl)" alt="Profile Connection" />
              <div class="d-flex flex-column pl-2">
                <h4>{{ user.name }}</h4>
                <span v-if="user.profession">{{ user.profession }}</span>
                <span v-else>Desempregado</span>
              </div>
            </div>
          </NuxtLink>
        </v-col>
      </div>
      <v-col v-else cols="12">
        <span>Sem contatos</span>
      </v-col>
      <v-col v-if="connections.length" cols="12">
        <NuxtLink to="/connections">
          <v-btn width="100" color="primary" text>Ver todas</v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { user } from "@/store";

export default {
  data() {
    return {
      connections: [],
      loading: true,
    };
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
      }
    });
    this.loading = false;
  },
  methods: {
    getImg(img) {
      return img || require("@/assets/images/default-profile.png");
    },
  },
};
</script>

<style scoped lang="scss">
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.d-flex.flex-column.pl-2 {
  h4 {
    color: #32b295;
  }
  span {
    color: black;
  }
}
</style>
