<template>
  <v-app-bar color="white" flat center height="88">
    <LogoCropped />
    <v-spacer />
    <v-row>
      <v-col cols="2" class="d-flex align-center justify-center">
        <v-btn height="100%" text class="my-auto">
          <NuxtLink to="/" style="color: inherit"> Início </NuxtLink>
        </v-btn>
      </v-col>
      <v-col cols="9">
        <SearchBar />
      </v-col>
      <v-col cols="1">
        <ProfileAvatar />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped></style>
