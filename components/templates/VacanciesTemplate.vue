<template>
  <div>
    <v-container fill-height fluid class="pa-0">
      <v-card min-height="600" max-height="45rem">
        <v-row class="pa-4">
          <v-col align-self="center">
            <h2>Suas vagas</h2>
          </v-col>
          <v-col align="end">
            <v-btn small color="primary" @click="dialog = !dialog">
              Anunciar nova vaga
            </v-btn>
          </v-col>
        </v-row>
        <div class="d-flex">
          <div class="col-4 pa-0" style="overflow-y: hidden">
            <Vacancies :items="items" @clickedVacancy="handleVacancy($event)" />
          </div>
          <div class="col-8 py-0">
            <v-card v-if="items.length > 0" outlined class="pa-6">
              <p class="text-h3">{{ selectedJob.title }}</p>
              <p class="text-body-1">{{ selectedJob.description }}</p>
            </v-card>
          </div>
        </div>
        <!-- <v-row
          style="align-items: stretch !important"
          class="fill-height"
          no-gutters
        >
          <v-col cols="4" class="d-flex flex-column" style="overflow: hidden">
            <Vacancies :items="items" @clickedVacancy="handleVacancy($event)" />
          </v-col>
          <v-col min-height="100%" cols="8">
            <v-card v-if="items.length > 0" outlined class="pa-6">
              <p class="text-h3">{{ selectedJob.title }}</p>
              <p class="text-body-1">{{ selectedJob.description }}</p>
            </v-card>
          </v-col>
        </v-row> -->
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

interface Vacancy {
  title: string;
  description: string;
}

export default Vue.extend({
  data() {
    return {
      dialog: false,
      selectedJob: {},
      items: [
        {
          title: "Especialista Sênior em jogo do bixo com mestrado e doutorado",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
        {
          title: "Especialista Sênior em jogo do bixo",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            dicta harum veritatis non facilis quod voluptate perferendis! Iste
            animi voluptatibus commodi repudiandae facilis natus consequatur
            laudantium sit, dolorem officia adipisci?`,
        },
      ],
    };
  },
  created() {
    this.selectedJob = this.items.length > 0 ? this.items[0] : {};
  },
  methods: {
    handleVacancy(e: Vacancy) {
      this.selectedJob = e;
    },
  },
});
</script>

<style scoped></style>
