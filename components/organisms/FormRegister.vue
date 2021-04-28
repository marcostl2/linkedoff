<template>
  <v-card max-width="600" class="pa-16">
    <v-form @submit.prevent="submit">
      <v-row>
        <v-col cols="12" align="center">
          <Logo />
        </v-col>
        <v-col cols="12" class="d-flex flex-column">
          <span>Nome</span>
          <v-text-field v-model="form.name" type="text" filled rounded dense />
        </v-col>
        <v-col cols="12" class="d-flex flex-column">
          <span>E-mail</span>
          <v-text-field
            v-model="form.email"
            type="email"
            filled
            rounded
            dense
          />
        </v-col>
        <v-col cols="12" class="d-flex flex-column">
          <span>Senha</span>
          <v-text-field
            v-model="form.password"
            filled
            rounded
            dense
            :type="showPass ? '' : 'password'"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
          />
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="form.isCompany" label="Sou empresa" />
        </v-col>
        <v-col cols="12" align="center">
          <v-btn
            :loading="loading"
            type="submit"
            color="primary"
            class="text-capitalize text-h6 px-8 py-4"
          >
            Criar conta
          </v-btn>
        </v-col>
        <v-col cols="12" align="center" class="mt-8">
          <NuxtLink to="/login" class="primary--text text-decoration-underline">
            Já tenho uma conta
          </NuxtLink>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        isCompany: false,
      },
      loading: false,
      snackbar: false,
      showPass: false,
    };
  },
  methods: {
    async submit() {
      try {
        this.loading = !this.loading;
        const userCredential = await this.$fire.auth.createUserWithEmailAndPassword(
          this.form.email,
          this.form.password
        );

        if (userCredential.user && userCredential.user.uid) {
          const ref = await this.$fire.database.ref("/users");
          const id = userCredential.user.uid;

          const payload = {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
            isCompany: this.form.isCompany,
            profileImgUrl: "",
            coverUrl: "",
            bio: "",
            latitude: "",
            profession: "",
            longitude: "",
          };
          ref.child(id).set(payload, (err) => {
            if (err) throw err;
            else this.$router.push("/");
          });

          user.create({ ...payload, uid: id } as any);
        }
        this.loading = !this.loading;
      } catch (error) {
        this.loading = !this.loading;
      }
    },
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
