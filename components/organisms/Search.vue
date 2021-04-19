<template>
  <v-card class="pa-4">
    <div v-if="loading">
      <div v-if="results">
        <div v-for="result in results" :key="result.uid">
          <a :href="'/users/' + result.link">{{ result.name }}</a>
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

  methods: {
    matchStrings(snap: any): boolean {
      return snap[1].name
        .toLowerCase()
        .includes(this.$route.query.q.toString().toLowerCase());
    },
    fetchUsers(): void {
      const ref = this.$fire.database.ref("users");

      ref.on("value", (snapshot) => {
        //Remove invalid query matches
        let entries: any = Object.entries(snapshot.val());
        let users: any = entries
          .filter(this.matchStrings)
          .map((entry: any) => entry[1]);

        users.forEach((user: any) => {
          user.link = user.name.toLowerCase().split(" ").slice(0, 3).join("_");
        });

        this.results = users.length > 0 ? users : null;
        this.loading = true;
      });
    },
  },
  created: function () {
    this.fetchUsers();
  },
});
</script>

<style scoped lang="scss">
</style>
