<template>
  <div>
    <div
      class="profile-cover"
      :style="`background:url('${
        coverUrl || require('@/assets/images/default-cover.png')
      }') center center / cover no-repeat`"
    >
      <v-file-input
        v-show="false"
        ref="coverFileInput"
        type="file"
        accept="image/*"
        prepend-icon="mdi-camera"
        truncate-length="15"
        @change="handleUpload"
      />

      <v-btn
        v-if="!profileUID"
        class="cover-picker d-flex align-center justify-center"
        fab
        depressed
        color="white"
        @click="
          $refs.coverFileInput.$el.childNodes[1].childNodes[0].childNodes[0].childNodes[1].click()
        "
      >
        <v-icon>mdi-camera</v-icon>
      </v-btn>
    </div>
    <!-- <v-dialog v-if="dialog" v-model="dialog" max-width="600" min-height="600">
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
    </v-dialog> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      dialog: false,
      file: Object,
      coverUrl: "",
      profileUID: null,
    };
  },
  mounted() {
    let nickname = this.$route.params.nickname;

    /* Fetch user UID based on url */
    this.$fire.database.ref("users").on("value", (snapshot) => {
      if (nickname) {
        const entries: any = Object.entries(snapshot.val());
        const users: any = entries.filter(
          (u: any) => u[1].name === nickname.split("_").join(" ")
        );
        this.profileUID = users[0][0];
      }

      if (this.profileUID) {
        /* Other persons */
        this.$fire.database
          .ref(`/users/${this.profileUID}`)
          .on("value", (snapshot) => {
            this.coverUrl = snapshot.val().coverUrl;
          });
      } else {
        this.coverUrl = user.$single.coverUrl
          ? user.$single.coverUrl
          : this.coverUrl;
      }
    });
  },
  methods: {
    async handleUpload(fileEvent: any) {
      try {
        this.file = fileEvent;
        const file: Object = (this as any).file;

        /* Deletes other covers in the firestore */
        let snap = await this.$fire.storage.ref("covers").listAll();
        snap.items
          .filter((item) => item.fullPath.includes(user.$single.uid))
          .forEach((item) => {
            item.delete();
          });

        let filename = `${user.$single.uid}_${+new Date()}_cover`;
        let snapshot = await this.$fire.storage
          .ref("covers")
          .child(filename)
          .put(file as any);

        const url = await snapshot.ref.getDownloadURL();
        user.create({ ...user.$single, coverUrl: url } as any);

        this.coverUrl = url;
        this.$fire.database.ref(`/users/${user.$single.uid}`).update({
          coverUrl: url,
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
