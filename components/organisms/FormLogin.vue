<template>
  <v-card max-width="600" class="pa-16">
    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12">
          <Input text="Nome" :value="form.name" />
        </v-col>
        <v-col cols="12">
          <Input text="E-mail" :value="form.email" />
        </v-col>
        <v-col cols="12">
          <Input text="Login" :value="form.userName" />
        </v-col>
        <v-col cols="12">
          <Input text="Senha" password :value="form.password" />
        </v-col>
        <v-col cols="12">
          <Input text="Nome" :value="form.name" />
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn type="submit" color="primary" class="text-capitalize">
            Criar conta
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      form: {
        name: "",
        email: "",
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    // handleSubmit(val: any) {
    //   // console.log(val);
    // },
  },
});
</script>

<style scoped lang="scss">
.v-card {
  border-radius: 16px !important;
}

.col {
  padding: 0;
}
</style>
