<template>
  <div>
    <client-only>
      <v-container fill-height fluid class="pa-0">
        <v-card v-if="loading" min-height="600" width="100%">
          <v-skeleton-loader
            type="card-avatar, article, actions"
          ></v-skeleton-loader>
        </v-card>
        <v-card v-else min-height="600" max-height="45rem" width="100%">
          <v-row no-gutters class="pa-4">
            <v-col align-self="center">
              <h2>Confira as vagas mais quentes do momento</h2>
            </v-col>
            <v-col cols="12" class="mt-4">
              <v-text-field
                v-model="search"
                placeholder="Buscar vagas"
                prepend-inner-icon="mdi-magnify"
                filled
                rounded
                @click:prepend-inner="handleSearch"
              ></v-text-field>
            </v-col>
          </v-row>
          <div v-if="jobs.length > 0" class="d-flex">
            <div class="col-12 col-md-4 pa-0" style="overflow-y: hidden">
              <Vacancies
                :items="jobs"
                @clickedVacancy="handleVacancy($event)"
              />
            </div>
            <div
              v-if="Object.keys(getSelectedJob).length"
              class="col-12 col-md-8 py-0"
            >
              <v-card outlined class="pa-6">
                <p class="text-h4">{{ selectedJob.title }}</p>
                <p class="text-body-1">{{ selectedJob.description }}</p>
                <p v-if="selectedJob.company" class="text-body-1">
                  <b>Empresa:</b>
                  {{ selectedJob.company.name }}
                </p>
                <b class="mb-3">Localização:</b>
                <v-row v-if="selectedJob.company">
                  <v-col>
                    <VacancyMap :company="selectedJob.company" />
                  </v-col>
                </v-row>
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
    </client-only>
  </div>
</template>

<script>
import { user } from "@/store";

export default {
  data() {
    return {
      loading: true,
      dialog: false,
      selectedJob: {},
      jobs: [],
      search: "",
      newJobs: [],
    };
  },
  computed: {
    isCompany() {
      return user.$single.isCompany;
    },
    getSelectedJob() {
      return this.selectedJob;
    },
  },
  created() {
    let aux = [];
    this.$fire.database
      .ref("/vacancies")
      .limitToFirst(10)
      .get()
      .then((snap) => {
        let keys = snap.val();
        aux = Object.keys(snap.val());

        for (let i = 0; i < aux.length; i++) {
          let company;
          this.$fire.database.ref(`/users/${aux[i]}`).on("value", (snap) => {
            company = snap.val();
            // console.log(company);

            let companyVacancies = Object.keys(keys[aux[i]]);
            for (let j = 0; j < companyVacancies.length; j++) {
              this.newJobs.push({
                ...keys[aux[i]][companyVacancies[j]],
                company,
              });
            }
          });
        }
        this.loading = false;
        this.jobs = this.newJobs;
      });
    // this.$fire.database
    //   .ref("/vacancies")
    //   .limitToFirst(10)
    //   .on("value", (snap) => {
    //     let keys = snap.val();
    //     aux = Object.keys(snap.val());

    //     for (let i = 0; i < aux.length; i++) {
    //       let company;
    //       this.$fire.database.ref(`/users/${aux[i]}`).on("value", (snap) => {
    //         company = snap.val();
    //         // console.log(company);

    //         let companyVacancies = Object.keys(keys[aux[i]]);
    //         for (let j = 0; j < companyVacancies.length; j++) {
    //           this.newJobs.push({
    //             ...keys[aux[i]][companyVacancies[j]],
    //             company,
    //           });
    //         }
    //       });
    //     }
    //     this.loading = false;
    //   });
  },
  watch: {
    loading() {
      this.selectedJob = this.jobs.length ? this.jobs[0] : [];
    },
  },
  methods: {
    handleVacancy(e) {
      this.selectedJob = e;
    },
    handleSearch() {
      let aux = [];
      let auxVacancies = [];
      const ref = this.$fire.database.ref("/vacancies");

      ref.on("value", (snap) => {
        let keys = snap.val();
        aux = Object.keys(snap.val());

        let regex = new RegExp(this.search, "i");

        for (let i = 0; i < aux.length; i++) {
          let company;
          this.$fire.database.ref(`/users/${aux[i]}`).on("value", (snap) => {
            company = snap.val();
          });

          let companyVacancies = Object.keys(keys[aux[i]]);
          for (let j = 0; j < companyVacancies.length; j++) {
            if (keys[aux[i]][companyVacancies[j]].title.match(regex)) {
              auxVacancies.push({
                ...keys[aux[i]][companyVacancies[j]],
                company,
              });
            }
          }
          this.jobs = auxVacancies || [];
          this.selectedJob = auxVacancies[0] || {};
        }
      });
    },
  },
};
</script>

<style scoped></style>
