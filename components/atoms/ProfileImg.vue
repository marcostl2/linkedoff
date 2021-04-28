<template>
  <div class="profile-img">
    <v-file-input
      v-show="false"
      ref="profileFileInput"
      type="file"
      accept="image/*"
      prepend-icon="mdi-camera"
      truncate-length="15"
      @change="handleUpload"
    />

    <img :src="profileImgUrl" alt="Perfil" />
    <v-btn
      v-if="!profileUID"
      class="profile-picker d-flex align-center justify-center"
      fab
      x-small
      depressed
      color="white"
      @click="
        $refs.profileFileInput.$el.childNodes[1].childNodes[0].childNodes[0].childNodes[1].click()
      "
    >
      <v-icon>mdi-camera</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      file: Object,
      profileImgUrl: "",
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

      this.profileImgUrl =
        "https://storage.googleapis.com/kondzilla-wp/2020/07/marks2.jpg";

      if (this.profileUID) {
        /* Other persons */
        this.$fire.database
          .ref(`/users/${this.profileUID}`)
          .on("value", (snapshot) => {
            this.profileImgUrl =
              snapshot.val().profileImgUrl !== ""
                ? snapshot.val().profileImgUrl
                : this.profileImgUrl;
          });
      } else {
        this.profileImgUrl = user.$single.profileImgUrl
          ? user.$single.profileImgUrl
          : this.profileImgUrl;
      }
    });
  },

  methods: {
    async handleUpload(fileEvent: any) {
      try {
        this.file = fileEvent;
        const file: Object = (this as any).file;

        /* Deletes other profiles images in the firestore */
        let snap = await this.$fire.storage.ref("profile-imgs").listAll();
        snap.items
          .filter((item) => item.fullPath.includes(user.$single.uid))
          .forEach((item) => {
            item.delete();
          });

        let filename = `${user.$single.uid}_${+new Date()}_profile`;
        let snapshot = await this.$fire.storage
          .ref("profile-imgs")
          .child(filename)
          .put(file as any);

        const url = await snapshot.ref.getDownloadURL();
        user.create({ ...user.$single, profileImgUrl: url } as any);

        this.profileImgUrl = url;
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
.profile-img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 90px;
  left: 20px;

  img {
    width: 100%;
    border-radius: 8px;
    width: 100px;
    height: 120px;
    max-width: 100px;
    max-height: 100px;
  }
}

.profile-picker {
  position: absolute;
  right: 8px;
  bottom: 8px;
}
</style>
