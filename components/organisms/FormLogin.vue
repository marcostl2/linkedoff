<template>
  <v-card max-width="600" class="pa-16">
    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12" align="center">
          <Logo />
        </v-col>
        <v-col cols="12" class="d-flex flex-column">
          <span>Email</span>
          <v-text-field
            v-model="form.email"
            type="email"
            filled
            rounded
            required
            dense
          />
        </v-col>
        <v-col cols="12" class="d-flex flex-column">
          <span>Senha</span>
          <v-text-field
            v-model="form.password"
            filled
            required
            rounded
            dense
            :type="showPass ? '' : 'password'"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
          />
        </v-col>
        <v-col cols="12" align="center">
          <v-btn
            :loading="loading"
            type="submit"
            color="primary"
            class="text-capitalize text-h6 px-8 py-4"
          >
            Fazer login
          </v-btn>
        </v-col>
        <v-col cols="12" align="center" class="mt-8">
          <span>Não possui uma conta?</span>
          <NuxtLink
            to="/register"
            type="button"
            class="primary--text text-decoration-underline"
          >
            Criar conta
          </NuxtLink>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" color="error" timeout="2000">
        Login ou senha inválidos
      </v-snackbar>
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
      },
      loading: false,
      snackbar: false,
      showPass: false,
    };
  },
  methods: {
    handleShowPass() {
      this.showPass = !this.showPass;
    },
    handleSubmit() {
      this.loading = !this.loading;
      this.$fire.auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          const ref = this.$fire.database.ref(`users/${data.user!.uid}`);
          const uid = data.user!.uid;

          ref.on("value", (snapshot) => {
            const data = snapshot.val();

            const payload = {
              name: data.name,
              email: data.email,
              password: data.password,
              profileImgUrl: data.profileImgUrl,
              bio: data.bio,
              coverUrl: data.coverUrl,
              // formation: [],
              // techs: [],
              // connections: [],
            };

            user.create({ ...payload, uid } as any);

            this.loading = !this.loading;
            this.$router.push("/");
          });
        })
        .catch((): void => {
          this.snackbar = !this.snackbar;
          this.loading = !this.loading;
        });
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
