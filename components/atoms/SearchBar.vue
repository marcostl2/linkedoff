<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="q"
      hide-details=""
      prepend-inner-icon="mdi-magnify"
      rounded
      filled
      placeholder="Buscar pessoas"
      @click:prepend-inner="handleSubmit"
    />
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      q: "",
    };
  },
  methods: {
    handleSubmit() {
      let router = this.$router;
      let query = this.q;
      setTimeout(function () {
        router.push(`/search?q=${query}`);
      }, 5);
      router.push("/");
    },
  },
});
</script>

<style scoped></style>

