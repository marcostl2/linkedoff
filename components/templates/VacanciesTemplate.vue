<template>
  <div>
    <v-container v-if="isCompany" fluid class="pa-0">
      <v-card width="100%" min-height="500">
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
        <div v-if="getItems.length > 0" class="d-flex">
          <div class="col-12 col-md-4 pa-0">
            <Vacancies
              :items="getItems"
              @clickedVacancy="handleVacancy($event)"
            />
          </div>
          <div class="d-none d-md-block col-12 col-md-8 py-0">
            <v-card outlined class="pa-6">
              <div class="d-flex justify-space-between">
                <v-spacer></v-spacer>
                <v-menu left offset-y>
                  <template #activator="{ on, attrs }">
                    <v-btn icon color="primary" v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <div class="d-flex flex-column">
                    <v-btn tile @click="editDialog = !editDialog">Editar</v-btn>
                    <v-btn tile @click="handleDeleteVacancy">Excluir</v-btn>
                  </div>
                </v-menu>
              </div>
              <p class="text-h4">{{ getJob.title }}</p>
              <p class="text-body-1">{{ getJob.description }}</p>
            </v-card>
          </div>
          <v-dialog v-model="vacancyDialog">
            <v-card>
              <div class="pa-4">
                <div style="width: 100%" class="d-flex justify-end">
                  <v-btn icon @click="vacancyDialog = !vacancyDialog">
                    <v-icon color="primary">mdi-close</v-icon>
                  </v-btn>
                </div>
                <p class="text-h5">{{ getJob.title }}</p>
                <p class="text-body-1">{{ getJob.description }}</p>
              </div>
            </v-card>
          </v-dialog>
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
      @saved="handleCreatedVacancy($event)"
    />
    <FindVacancies v-if="!isCompany" />
    <EditVacancy
      v-if="editDialog"
      :vacancy="selectedJob"
      @close="editDialog = !editDialog"
      @saved="handleSaved($event)"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      dialog: false,
      selectedJob: {},
      editDialog: false,
      vacancyDialog: false,
    };
  },
  computed: {
    getItems() {
      return user.$single.vacancies ? user.$single.vacancies : [];
    },
    isCompany() {
      return user.$single.isCompany;
    },
    getJob() {
      return this.selectedJob;
    },
  },
  created() {
    this.selectedJob =
      this.getItems.length > 0 ? { ...this.getItems[0], index: 0 } : {};
  },
  methods: {
    handleVacancy(e) {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.vacancyDialog = !this.vacancyDialog;
      }
      this.selectedJob = e.data.vacancy;
      this.selectedJob.index = e.data.index;
    },
    handleCreatedVacancy(e) {
      this.dialog = !this.dialog;
      this.selectedJob = this.getItems[e.index];
      this.selectedJob.index = e.index;
    },
    handleDeleteVacancy() {
      let vacancies = JSON.parse(JSON.stringify(user.$single.vacancies));
      vacancies.splice(this.selectedJob.index, 1);
      vacancies.forEach((val, index) => {
        val.index = index;
      });
      this.$fire.database.ref(`/vacancies/${user.$single.uid}`).set(vacancies);

      this.$swal.fire({
        title: "Vaga deletada com sucesso!",
        icon: "success",
        timer: 2000,
      });
      user.create({ ...user.$single, vacancies });

      this.selectedJob =
        this.getItems.length > 0 ? { ...this.getItems[0], index: 0 } : {};
    },
    handleSaved(e) {
      this.editDialog = !this.editDialog;
      this.selectedJob = user.$single.vacancies[e.index];
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
