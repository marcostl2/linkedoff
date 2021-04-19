<template>
  <v-card class="pa-4">
    <v-row>
      <v-col cols="7">
        <div class="d-flex">
          <img src="@/assets/images/raj.png" alt="Imagem de Perfil" />
          <div class="ml-4 justify-center d-flex flex-column">
            <h3 class="primary--text">Hélio da Silva</h3>
            <span>CEO da Alien X</span>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <v-btn icon>
          <v-spacer />
        </v-btn>
      </v-col>
      <v-col cols="1">
        <v-menu left offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="primary" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-btn>Editar publicação</v-btn>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil excepturi
        neque molestias adipisci et nostrum, eos maxime optio amet incidunt
        repudiandae quaerat rem corrupti cum! Nisi odit velit vel temporibus!
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped lang="scss">
img {
  width: 100px;
  height: 100px;
}
</style>
