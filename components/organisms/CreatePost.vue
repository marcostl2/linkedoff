<template>
  <div class="mb-4">
    <v-card class="d-flex pa-4 flex-column">
      <div class="d-flex">
        <img
          id="profile-img"
          :src="getImage || require('@/assets/images/default-profile.png')"
          alt="Image"
        />
        <button
          id="create-post"
          type="text"
          class="mx-4"
          placeholder="Criar nova publicação"
          @click="dialog = !dialog"
        >
          Criar nova publicação
        </button>
        <v-btn fab depressed color="primary" @click="dialog = !dialog">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-4 d-flex flex-column">
        <div class="d-flex justify-space-between align-center">
          <h3>Nova publicação</h3>
          <v-btn icon @click="dialog = !dialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-tooltip color="primary">
          <template #activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-checkbox
                v-model="form.globalScope"
                label="Escopo Global"
                color="primary"
                hide-details
                class="mb-4"
              ></v-checkbox>
            </div>
          </template>
          <span>
            Caso o escopo não for global apenas suas conexões podem ver a
            publicação.
          </span>
        </v-tooltip>
        <v-textarea
          v-model="form.content"
          filled
          rounded
          placeholder="Escreva algo"
        ></v-textarea>
        <v-file-input
          v-model="form.file"
          label="Escolha uma imagem para o post"
          filled
          accept="image/*"
          rounded
          prepend-icon="mdi-camera"
          @change="loadImage"
        ></v-file-input>
        <img
          v-if="form.imageUrl && form.file"
          class="preview-img mx-auto mb-4"
          :src="form.imageUrl"
          alt="Imagem"
        />
        <v-btn color="primary" :loading="loading" @click="create">
          Criar publicação
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { object, string } from "yup";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        file: null,
        imageUrl: "",
        content: "",
        globalScope: true,
      },
      loginFormSchema: object().shape({
        content: string().required("Escreva o conteúdo do post"),
      }),
    };
  },
  computed: {
    getImage() {
      return user.$single.profileImgUrl;
    },
  },
  methods: {
    async create() {
      try {
        this.loading = !this.loading;
        let id =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

        let url = null;
        if (this.form.imageUrl && this.form.file) {
          let snap = await this.$fire.storage
            .ref(`posts/${user.$single.uid}`)
            .child(`${id}`)
            .put(this.form.file as any);
          url = await snap.ref.getDownloadURL();
        }

        let snapPost = this.$fire.database.ref(
          `posts/${user.$single.uid}/${id}`
        );
        const payload = {
          content: this.form.content,
          likes: [],
          date: new Date().toJSON(),
          global: this.form.globalScope,
          imageUrl: url || "",
        };
        snapPost.set(payload);

        this.dialog = !this.dialog;

        this.form.file = null;
        this.form.imageUrl = "";
        this.form.content = "";

        this.loading = !this.loading;
      } catch (error) {
        this.loading = !this.loading;
        console.log(error);
      }
    },
    loadImage() {
      this.form.imageUrl = window.URL.createObjectURL(
        new Blob([this.form.file] as any)
      );
    },
  },
});
</script>

<style scoped lang="scss">
#profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

#create-post {
  background: white;
  outline: none;
  width: 100%;
  text-align: left;
  border-radius: 20px !important;
  border: 1px solid #e5e5e5;
  padding-left: 16px;

  &:hover {
    background: #ebebeb;
  }
}

.preview-img {
  max-height: 200px;
  max-width: 200px;
}
</style>
