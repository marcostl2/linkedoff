<template>
  <a class="d-flex flex-column">
    <v-avatar s color="primary" size="40" tile>
      <img src="@/assets/images/raj.png" alt="John" />
    </v-avatar>
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          x-small
          v-bind="attrs"
          max-width="40"
          text
          v-on="on"
        >
          EU
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <div class="d-flex flex-column">
        <NuxtLink to="/profile">
          <v-btn>Perfil</v-btn>
        </NuxtLink>
        <v-btn @click="handleSignOut">Sair</v-btn>
      </div>
    </v-menu>
  </a>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    handleSignOut() {
      this.$fire.auth.signOut();
    },
  },
});
</script>

<style scoped></style>
