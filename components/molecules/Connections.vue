<template>
  <v-card class="pa-4" max-width="300">
    <v-row column>
      <v-col cols="12">
        <h3>Suas conexões</h3>
      </v-col>
      <v-col cols="12">
        <div class="d-flex">
          <img src="@/assets/images/raj.png" alt="Profile Connection" />
          <div class="d-flex flex-column pl-2">
            <h4>Hélio da Silva</h4>
            <span>CEO da India Enterprises</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="d-flex">
          <img src="@/assets/images/raj.png" alt="Profile Connection" />
          <div class="d-flex flex-column pl-2">
            <h4>Hélio da Silva</h4>
            <span>CEO da India Enterprises</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="d-flex">
          <img src="@/assets/images/raj.png" alt="Profile Connection" />
          <div class="d-flex flex-column pl-2">
            <h4>Hélio da Silva</h4>
            <span>CEO da India Enterprises</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="d-flex">
          <img src="@/assets/images/raj.png" alt="Profile Connection" />
          <div class="d-flex flex-column pl-2">
            <h4>Hélio da Silva</h4>
            <span>CEO da India Enterprises</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <NuxtLink to="/connections">
          <v-btn width="100" color="primary" text> Ver todas</v-btn>
        </NuxtLink>
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
