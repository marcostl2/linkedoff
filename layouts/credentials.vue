<template>
  <v-app>
    <v-container style="height: 100vh" class="ma-0 pa-0" fluid>
      <v-row no-gutters>
        <v-col cols="4" class="d-none d-md-block">
          <SideBar />
        </v-col>
        <v-col
          cols="12"
          md="8"
          class="form-section d-flex align-center justify-center px-4"
        >
          <slot>
            <Nuxt />
          </slot>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  middleware: "auth",
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.form-section {
  background: $primary-background;
}

.row {
  height: 100%;
}
</style>
