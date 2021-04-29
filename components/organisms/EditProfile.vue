<template>
  <v-dialog :value="dialog" max-width="800">
    <v-card class="py-4 px-sm-8">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-space-between align-center">
              <span class="text-h6 font-weight-bold">Editar perfil</span>
              <v-btn icon @click="$emit('closeDialog')">
                <v-icon color="primary">mdi-close</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12">
            <span>Profissão</span>
            <v-text-field
              v-model="form.profession"
              filled
              hide-details
              required
              rounded
              dense
              placeholder="Sua profissão"
            />
          </v-col>
          <v-col cols="12">
            <span>Sobre</span>
            <v-textarea
              v-model="form.bio"
              filled
              required
              no-resize
              hide-details
              rounded
              height="300"
              dense
              placeholder="Escreva algo sobre você"
            />
          </v-col>
          <v-col cols="12" align="center">
            <v-btn
              color="primary"
              class="text-capitalize"
              large
              :loading="loading"
              @click="create"
            >
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  props: {
    dialog: {
      required: true,
      type: Boolean,
    },
    loading: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      form: {
        profession: "",
        bio: "",
      },
    };
  },
  mounted() {
    this.form.profession = user.$single.profession;
    this.form.bio = user.$single.bio;
  },
  methods: {
    async create() {
      try {
        const ref = await this.$fire.database.ref(`/users/${user.$single.uid}`);

        ref.update({
          profession: this.form.profession,
          bio: this.form.bio,
        });

        user.create({
          ...user.$single,
          profession: this.form.profession,
          bio: this.form.bio,
        } as any);

        this.$emit("updateInfo", this.form);
      } catch (error) {
        // console.log(error);
        throw new Error("ERRO");
      }
    },
  },
});
</script>

<style scoped></style>
