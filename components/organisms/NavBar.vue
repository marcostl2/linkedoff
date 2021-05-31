<template>
  <div>
    <v-app-bar color="white" flat center height="88">
      <v-container class="d-flex align-center wrapper" fluid>
        <v-row class="d-flex justify-space-between align-center" no-gutters>
          <v-col cols="11" md="2">
            <LogoCropped />
          </v-col>
          <v-col cols="8" class="d-none d-md-flex">
            <v-row>
              <v-col
                cols="11"
                md="2"
                class="d-flex align-center justify-center"
              >
                <v-btn
                  height="100%"
                  text
                  class="my-auto"
                  @click="$router.push('/')"
                >
                  Início
                </v-btn>
              </v-col>
              <v-col
                v-if="isCompany"
                cols="2"
                class="d-flex align-center justify-center"
              >
                <v-btn
                  height="100%"
                  text
                  class="my-auto"
                  @click="$router.push('/vacancies')"
                >
                  Anunciar
                  <br />
                  vagas
                </v-btn>
              </v-col>
              <v-col
                v-if="!isCompany"
                cols="2"
                class="d-flex align-center justify-center"
              >
                <v-btn
                  height="100%"
                  text
                  class="my-auto"
                  @click="$router.push('/vacancies')"
                >
                  Ver vagas
                </v-btn>
              </v-col>
              <v-col cols="6">
                <SearchBar />
              </v-col>
              <v-col
                cols="1"
                align="center"
                align-self="center"
                justify="center"
                class="pa-0"
              >
                <Notifications />
              </v-col>
              <v-col cols="1" align="center">
                <ProfileAvatar />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1" class="d-block d-md-none">
            <v-btn icon @click.prevent="$emit('handleMenu')">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isCompany() {
      return user.$single.isCompany;
    },
  },
});
</script>
