<template>
  <v-layout class="">
    <v-row>
      <v-col cols="4">
        <SideBar />
      </v-col>
      <v-col cols="8" class="form-section d-flex align-center justify-center">
        <FormLogin />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped lang="scss">
// @import url(@/assets/variables.scss);

// .form-section {
//   background-color: $primary-background;
// }
</style>
