<template>
  <div class="mb-4">
    <v-card class="d-flex pa-4 flex-column">
      <div class="d-flex">
        <img :src="getImage" alt="Image" />
        <button
          id="create-post"
          type="text"
          class="ml-4"
          placeholder="Criar nova publicação"
          @click="dialog = !dialog"
        >
          Criar nova publicação
        </button>
      </div>
      <v-btn text class="mt-4" color="primary">
        <v-icon class="mr-2">mdi-image-multiple-outline</v-icon>
        Foto
      </v-btn>
    </v-card>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-4 d-flex flex-column">
        <div class="d-flex justify-space-between align-center mb-4">
          <h3>Nova publicação</h3>
          <v-btn icon @click="dialog = !dialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-textarea filled rounded placeholder="Escreva algo"></v-textarea>
        <v-btn color="primary">Criar</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    getImage() {
      return user.$single.profileImgUrl;
    },
  },
});
</script>

<style scoped lang="scss">
img {
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
</style>
