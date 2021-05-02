<template>
  <div>
    <v-container fill-height fluid class="pa-0">
      <v-card min-height="600" max-height="45rem" width="100%">
        <v-row no-gutters class="pa-4">
          <v-col align-self="center">
            <h2>Suas vagas</h2>
          </v-col>
          <v-col align="end">
            <v-btn small color="primary" @click="dialog = !dialog">
              Anunciar nova vaga
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="items.length > 0" class="d-flex">
          <div class="col-4 pa-0" style="overflow-y: hidden">
            <Vacancies :items="items" @clickedVacancy="handleVacancy($event)" />
          </div>
          <div class="col-8 py-0">
            <v-card outlined class="pa-6">
              <p class="text-h4">{{ selectedJob.title }}</p>
              <p class="text-body-1">{{ selectedJob.description }}</p>
            </v-card>
          </div>
        </div>
        <div
          v-else
          class="d-flex pa-4 violet01--text"
          style="height: 100%; min-width: 300px"
        >
          <h2>Oops você não possui nenhuma vaga cadastrada</h2>
        </div>
      </v-card>
    </v-container>
    <NewVacancyDialog
      v-if="dialog"
      :dialog="dialog"
      @close="dialog = !dialog"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

interface Vacancy {
  title: string;
  description: string;
}

export default Vue.extend({
  data() {
    return {
      dialog: false,
      selectedJob: {},
      items: [{}],
    };
  },
  created() {
    this.items = [];
    this.items = user.$single.vacancies;
    this.selectedJob = this.items.length > 0 ? this.items[0] : {};
  },
  methods: {
    handleVacancy(e: Vacancy) {
      this.selectedJob = e;
    },
  },
});
</script>

<style scoped>
.row {
  height: inherit !important;
  min-height: 100% !important;
}
</style>
