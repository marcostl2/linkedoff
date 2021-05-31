<template>
  <div>
    <div class="text-center mb-6">
      <Logo />
    </div>
    <NuxtLink to="/">
      <v-btn large class="text-left" text block depressed>Início</v-btn>
    </NuxtLink>
    <NuxtLink to="/vacancies">
      <v-btn large class="text-left" text block depressed>Ver Vagas</v-btn>
    </NuxtLink>
    <NuxtLink to="/connections">
      <v-btn large class="text-left" text block depressed>Conexões</v-btn>
    </NuxtLink>
    <NuxtLink to="/profile">
      <v-btn large class="text-left" text block depressed>Perfil</v-btn>
    </NuxtLink>
    <NuxtLink to="/notifications">
      <v-btn large class="text-left" text block depressed>Notificações</v-btn>
    </NuxtLink>
    <a @click="handleSignOut">
      <v-btn large class="text-left" text block depressed>Sair</v-btn>
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    handleSignOut() {
      this.$fire.auth.signOut();
    },
  },
};
</script>

<style lang="scss" scoped></style>
