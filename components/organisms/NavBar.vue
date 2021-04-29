<template>
  <v-app-bar color="white" flat center height="88">
    <v-container class="d-flex align-center wrapper" fluid>
      <v-row class="d-flex justify-space-between align-center">
        <v-col cols="2">
          <LogoCropped />
        </v-col>
        <v-col cols="9">
          <v-row>
            <v-col cols="2" class="d-flex align-center justify-center">
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
            <v-col :cols="isCompany ? 7 : 9">
              <SearchBar />
            </v-col>
            <v-col cols="1">
              <ProfileAvatar />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  computed: {
    isCompany() {
      return user.$single.isCompany;
    },
  },
});
</script>

<style scoped></style>
