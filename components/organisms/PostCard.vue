<template>
  <v-card class="pa-4 mb-4">
    <v-row>
      <v-col cols="7">
        <div class="d-flex">
          <img
            :src="userInfo.profileImgUrl"
            alt="Imagem de Perfil"
            class="profile-img"
          />
          <div class="ml-4 justify-center d-flex flex-column">
            <h3 class="primary--text">{{ userInfo.name }}</h3>
            <span v-if="userInfo.profession">{{ userInfo.profession }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <v-spacer />
      </v-col>
      <v-col cols="1">
        <v-menu left offset-y>
          <template #activator="{ on, attrs }">
            <v-btn icon color="primary" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-btn>Editar</v-btn>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        {{ post.content }}
      </v-col>
      <v-col cols="12" align="center">
        <img :src="post.imageUrl" class="post-img" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userInfo: {
        name: user.$single.name,
        profession: user.$single.profession,
        profileImgUrl: user.$single.profileImgUrl,
      },
    };
  },
});
</script>

<style scoped lang="scss">
.profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.post-img {
  max-width: 250px;
  max-height: 250px;
}
</style>
