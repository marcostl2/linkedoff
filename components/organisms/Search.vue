<template>
  <v-card class="pa-4">
    <div v-if="loading">
      <div v-if="results">
        <div v-for="result in results" :key="result.uid">
          <NuxtLink :to="`/users/${result.link}`">
            <div class="d-flex main mt-4">
              <img
                :src="
                  result.profileImgUrl
                    ? result.profileImgUrl
                    : 'https://storage.googleapis.com/kondzilla-wp/2020/07/marks2.jpg'
                "
                alt="Profile Connection"
              />
              <div class="d-flex flex-column pl-2">
                <h4>{{ result.name }}</h4>

                <span v-if="result.profession">{{ result.profession }}</span>
                <span v-else>Desempregado</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <p v-else>Sem resultados</p>
    </div>
    <h5 v-else>Carregando resultados</h5>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      results: null,
      loading: false,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    matchStrings(snap: any): boolean {
      return snap[1].name
        .toLowerCase()
        .includes(
          this.$route.query.q !== undefined
            ? this.$route.query.q.toString().toLowerCase()
            : null
        );
    },
    fetchUsers(): void {
      const ref = this.$fire.database.ref("users");

      ref.on("value", (snapshot) => {
        // Remove invalid query matches
        const entries: any = Object.entries(snapshot.val());
        const users: any = entries
          .filter(this.matchStrings)
          .map((entry: any) => entry[1]);

        users.forEach((user: any) => {
          user.link = user.name.split(" ").join("_");
        });

        this.results = users.length > 0 ? users : null;
        this.loading = true;
      });
    },
  },
});
</script>

<style scoped lang="scss">
.main {
  .d-flex.flex-column.pl-2 {
    h4 {
      color: #32b295;
    }
    h4:hover {
      text-decoration: underline;
    }
    span {
      color: black;
    }
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>
