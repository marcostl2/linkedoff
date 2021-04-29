<template>
  <v-container fluid class="pa-0">
    <v-card min-height="600" max-height="45rem">
      <v-row class="pa-4">
        <v-col align-self="center">
          <h2>Suas vagas</h2>
        </v-col>
        <v-col align="end">
          <v-btn small color="primary">Anunciar nova vaga</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters style="height: 100% !important">
        <v-col
          cols="4"
          class="d-flex flex-column"
          style="height: 100% !important"
        >
          <Vacancies />
        </v-col>
        <v-col cols="8">
          <v-card v-if="jobs.length > 0" height="100%" outlined class="pa-6">
            <p class="text-h3">{{ selectedJob.title }}</p>
            <p class="text-body-1">{{ selectedJob.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      selectedJob: {},
      jobs: [
        {
          title: "JObzao",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
      ],
    };
  },
  created() {
    this.selectedJob = this.jobs.length === 1 ? this.jobs[0] : {};
  },
});
</script>

<style scoped></style>
