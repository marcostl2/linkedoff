<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="800"
    @click:outside="$emit('close')"
  >
    <v-card class="pa-6">
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <h2>Editar vaga</h2>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon @click="$emit('close')">mdi-close</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.title"
            dense
            label="Título"
            filled
            rounded
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="form.description"
            filled
            label="Descrição"
            dense
            rounded
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-btn :loading="loading" color="primary" @click="handleSave">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { user } from "@/store";

// interface Vacancy {
//   title: string;
//   description: string;
// }

export default {
  props: {
    vacancy: { type: Object },
  },
  data() {
    return {
      loading: false,
      dialog: true,
      form: {
        title: "",
        description: "",
      },
    };
  },
  beforeMount() {
    this.form = { ...this.vacancy };
  },
  methods: {
    handleSave() {
      let vacancies = user.$single.vacancies;
      vacancies[this.vacancy.index] = this.form;
      this.$fire.database.ref(`/vacancies/${user.$single.uid}`).set(vacancies);

      this.$emit("saved", { index: this.vacancy.index });

      this.$swal.fire({
        title: "Vaga atualizada com sucesso!",
        icon: "success",
        timer: 2000,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
