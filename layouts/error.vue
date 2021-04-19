<template>
  <v-app> Erro </v-app>
</template>

<script>
import { user } from "@/store";

export default {
  created() {
    if (!user.$single.uid) this.$router.push("/login");
    else this.$router.push("/");
  },
};
</script>
