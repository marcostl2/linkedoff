<template>
  <v-dialog :value="dialog" max-width="800">
    <v-card class="pa-6">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="mb-8 d-flex justify-space-between align-center">
            <h2>Anunciar nova vaga</h2>
            <v-btn icon @click="$emit('close')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.title"
            label="Título"
            filled
            rounded
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="form.description"
            label="Descrição"
            filled
            rounded
            dense
          ></v-textarea>
        </v-col>
        <v-col cols="12" align="center">
          <v-btn :loading="loading" color="primary" @click="createVacancy">
            Criar vaga
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  props: {
    dialog: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    createVacancy() {
      this.loading = !this.loading;

      let vacancies = user.$single.vacancies;
      vacancies[vacancies.length] = { ...this.form, index: vacancies.length };
      this.$fire.database.ref(`/vacancies/${user.$single.uid}`).set(vacancies);

      this.$emit("saved", { index: vacancies.length - 1 });

      this.$swal.fire({
        title: "Vaga criada com sucesso!",
        icon: "success",
        timer: 2000,
      });

      this.loading = !this.loading;

      // let newPostKey = this.$fire.database.ref().child(`vacancies").push().key;

      // let payload = {
      //   title: this.form.title,
      //   description: this.form.description,
      // };

      // let updates: { [key: string]: Object } = {};
      // updates["/vacancies/" + user.$single.uid + "/" + newPostKey] = payload;

      // this.$fire.database.ref().update(updates);

      // this.loading = !this.loading;
      // this.$emit("close");

      // this.$swal.fire({
      //   title: "Vaga criada com sucesso!",
      //   icon: "success",
      //   timer: 1500,
      // });
    },
  },
});
</script>

<style scoped></style>
