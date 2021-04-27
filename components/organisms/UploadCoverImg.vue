<template>
  <div>
    <div class="profile-cover" :style="`background:url(${getImg})`">
      <v-btn
        class="cover-picker d-flex align-center justify-center"
        fab
        depressed
        color="white"
        @click="dialog = !dialog"
      >
        <v-icon>mdi-camera</v-icon>
      </v-btn>
    </div>
    <v-dialog v-if="dialog" v-model="dialog" max-width="600" min-height="600">
      <v-card class="pa-4">
        <v-row align="center">
          <v-col cols="12">
            <h4>Selecione uma nova imagem de capa</h4>
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="file"
              type="file"
              accept="image/*"
              placeholder="Selecione uma imagem"
              prepend-icon="mdi-camera"
              truncate-length="15"
            />
          </v-col>
          <v-col cols="12" @click="handleUpload">
            <v-btn color="primary">Salvar</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  props: {
    forceUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      file: Object,
    };
  },
  computed: {
    getImg() {
      return this.forceUrl !== "" ? this.forceUrl : user.$single.profileImgUrl;
    },
  },
  methods: {
    async handleUpload() {
      try {
        const file: Object = (this as any).file;
        let filename = `${user.$single.uid}_${+new Date()}_cover`;
        let snapshot = await this.$fire.storage
          .ref("covers")
          .child(filename)
          .put(file as any);

        const url = await snapshot.ref.getDownloadURL();

        user.create({ ...user.$single, profileImgUrl: url } as any);
        this.$fire.database.ref(`/users/${user.$single.uid}`).update({
          profileImgUrl: url,
        });
      } catch (error) {
        // console.error(error);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.profile-cover {
  height: 160px;
  width: 100%;
  //   background: url(https://media.istockphoto.com/photos/money-background-picture-id453623995);
  position: relative;

  .cover-picker {
    position: absolute;
    right: 16px;
    bottom: 16px;
  }
}

.profile-container {
  position: relative;
}
</style>
