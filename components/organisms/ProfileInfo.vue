<template>
  <div>
    <v-card class="pa-0" max-width="50rem">
      <div class="profile-cover"></div>
      <v-container class="py-12 px-5 profile-container d-flex flex-column">
        <ProfileImg />
        <v-row>
          <v-col class="d-flex flex-column">
            <h2>Harold Macgroove</h2>
            <span>Engenheiro QUimico</span>
            <span>Altamira</span>
          </v-col>
          <v-col align="end">
            <v-btn color="primary" @click="dialog = !dialog">
              Editar perfil
              <v-icon class="ml-2"> mdi-pencil </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="grey01" elevation="0" class="pa-4">
              <div class="d-flex justify-space-between mb-4">
                <h3>Sobre mim</h3>
              </div>
              <span>
                Após ser expulso do colégio público Alberto Caeiro como
                professor de química público do MEC, me aventurei no ramo
                armamentista e agora faturo alto com as Forças Especiais
              </span>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="grey01" elevation="0" class="pa-4">
              <div class="d-flex justify-space-between mb-4">
                <h3>Tecnologias</h3>
              </div>
              <v-chip
                class="mr-2"
                color="primary"
                v-for="tech in techs"
                :key="tech"
              >
                {{ tech }}
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="py-4 px-sm-8">
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="d-flex justify-space-between align-center">
                <span class="text-h6 font-weight-bold">Editar perfil</span>
                <v-btn icon @click="dialog = !dialog">
                  <v-icon color="primary">mdi-close</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12">
              <span>Nome</span>
              <v-text-field
                v-model="form.password"
                filled
                required
                rounded
                hide-details
                dense
                placeholder="Seu nome"
              />
            </v-col>
            <v-col cols="12">
              <span>Profissão</span>
              <v-text-field
                v-model="form.password"
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
                :value="form.password"
                filled
                required
                no-resize
                hide-details
                rounded
                dense
                placeholder="Escreva algo sobre você"
              />
            </v-col>
            <v-col cols="12" align="center">
              <v-btn color="primary" class="text-capitalize" large>
                Salvar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      dialog: false,
      form: {
        name: "",
        profession: "",
      },
      techs: ["Cobol", "Python", "Javascript"],
    };
  },
});
</script>

<style scoped lang="scss">
.profile-cover {
  height: 140px;
  width: 100%;
  background: url(https://media.istockphoto.com/photos/money-background-picture-id453623995);
}

.profile-container {
  position: relative;
}
</style>
