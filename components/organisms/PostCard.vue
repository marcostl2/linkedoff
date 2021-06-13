<template>
  <div>
    <v-card class="pa-4 mb-4">
      <v-row>
        <v-col cols="10" md="11">
          <NuxtLink :to="`/users/${userInfo.name.split(' ').join('_')}`">
            <div class="d-flex">
              <img
                :src="getImg(userInfo.profileImgUrl)"
                alt="Imagem de Perfil"
                class="profile-img"
              />
              <div class="ml-4 justify-center d-flex flex-column">
                <h3 class="primary--text">{{ userInfo.name }}</h3>
                <span v-if="userInfo.profession" class="black--text">
                  {{ userInfo.profession }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </v-col>
        <v-spacer />
        <v-col v-if="isOwner()" cols="2" md="1" align-self="center">
          <v-menu left offset-y>
            <template #activator="{ on, attrs }">
              <v-btn icon color="primary" v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <div class="d-flex flex-column">
              <v-btn @click="dialog = !dialog">Editar</v-btn>
              <v-btn @click="deletePost">Excluir</v-btn>
            </div>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div
            v-for="lines in post.content.split('\n')"
            :key="lines + new Date().toString()"
            class="post-content mt-1"
          >
            {{ lines }}
          </div>
        </v-col>
        <v-col cols="12" align="center">
          <img :src="post.imageUrl" class="post-img" />
          <v-row class="stats mb-1">
            <v-col cols="3" class="d-flex justify-start">
              <div>
                <v-icon color="amber darken-1">mdi-bitcoin</v-icon>
                <span>
                  <b class="mx-1">{{ likes.length }}</b>
                </span>
              </div>
            </v-col>
            <v-col class="d-flex justify-end align-center">
              <span>
                {{ getMoment() }}
              </span>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="actions my-1">
            <v-col cols="12" class="d-flex justify-center">
              <v-btn depressed @click="like">
                <div :class="hasLiked ? 'primary--text' : ''">
                  <v-icon>mdi-trending-up</v-icon>
                  <span class="mx-2">Stonks</span>
                </div>
              </v-btn>
              <v-btn
                class="ml-2"
                depressed
                @click="dialogComments = !dialogComments"
              >
                <v-icon>mdi-comment</v-icon>
                <span class="mx-2">Comentar</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-scroll-y-transition>
            <div v-if="dialogComments">
              <v-divider></v-divider>
              <v-row class="mx-0 my-0">
                <v-col cols="1" class="d-flex justify-center align-center">
                  <img :src="getUser().profileImgUrl" class="comment-img" />
                </v-col>

                <v-col cols="10">
                  <v-form @submit.prevent="addComment">
                    <v-text-field
                      v-model="form.comment"
                      class="mt-2"
                      hide-details=""
                      rounded
                      filled
                      placeholder="Fazer comentário..."
                    />
                  </v-form>
                </v-col>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-btn color="primary" icon @click="addComment">
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <div v-if="!fetching" class="pl-1">
                <v-row
                  v-for="comment in comments"
                  :key="comment.content + new Date()"
                  class="mx-0 my-3"
                >
                  <v-col cols="1" class="d-flex justify-center align-center">
                    <img
                      :src="comment.user.profileImgUrl"
                      class="comment-img mr-1"
                    />
                  </v-col>
                  <v-col
                    cols="11"
                    md="11"
                    class="d-flex justify-start px-0 py-0"
                  >
                    <div class="comment-block">
                      <v-row no-gutters>
                        <v-col cols="10" align="left">
                          <b>{{ comment.user.name }}</b>
                          <br />
                          <span>
                            {{ comment.content }}
                          </span>
                        </v-col>
                        <v-col cols="2" align-self="center">
                          <v-icon
                            v-if="compareOwner(comment.uid)"
                            @click="removeComment(comment.content, comment.uid)"
                          >
                            mdi-close
                          </v-icon>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <!-- <v-col
                    v-if="compareOwner(comment.uid)"
                    cols="1"
                    class="d-flex justify-center align-center"
                  >
                    <v-icon
                      @click="removeComment(comment.content, comment.uid)"
                    >
                      mdi-close
                    </v-icon>
                  </v-col> -->
                </v-row>
              </div>
              <div v-else>
                <v-progress-circular
                  indeterminate
                  color="green"
                ></v-progress-circular>
              </div>
            </div>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-4 d-flex flex-column">
        <div class="d-flex justify-space-between align-center mb-4">
          <h3>Editar publicação</h3>
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
        <v-img
          v-if="form.imageUrl"
          class="preview-img mx-auto mb-4"
          :src="form.imageUrl"
          alt="Imagem"
        ></v-img>
        <v-btn color="primary" @click="edit">Salvar</v-btn>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snack" timeout="1500" color="success">
      Editado com sucesso!
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";
import moment from "moment";

export default Vue.extend({
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      snack: false,
      snackMsg: "",
      fetching: true,
      dialogComments: false,
      dialog: false,
      likes: [] as any,
      comments: [] as any,
      hasLiked: false,

      form: {
        file: null,
        imageUrl: "",
        content: "",
        globalScope: true,
        comment: "",
      },
      userInfo: {
        name: user.$single.name,
        profession: user.$single.profession,
        profileImgUrl: user.$single.profileImgUrl,
      },
    };
  },
  mounted() {
    this.comments = [];
    this.form.content = this.post.content;
    this.form.imageUrl = this.post.imageUrl;
    this.form.globalScope = this.post.global;

    this.$fire.database
      .ref(`/users/${this.post.owner}`)
      .on("value", (snapshot) => {
        this.userInfo.name = snapshot.val().name;
        this.userInfo.profession = snapshot.val().profession;
        this.userInfo.profileImgUrl = snapshot.val().profileImgUrl;
        // snapshot.val().profileImgUrl
        //   ? snapshot.val().profileImgUrl
        //   :
        // ("https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png");
      });

    this.$fire.database
      .ref(`/posts/${this.post.owner}/${this.post.uid}`)
      .on("value", (snapshot) => {
        // Likes
        this.likes = snapshot.val()?.likes ? snapshot.val().likes : [];
        this.hasLiked = snapshot.val()?.likes
          ? snapshot.val().likes.includes(user.$single.uid)
          : false;
        // Comments
        const c = snapshot.val()?.comments ? snapshot.val().comments : [];

        c.reverse();
        let promises = c.map((comment: any) => {
          return new Promise((resolve) => {
            this.$fire.database
              .ref(`/users/${comment.uid}`)
              .once("value", (snapshot) => {
                resolve(snapshot.val());
              });
          });
        });
        Promise.all(promises).then((data) => {
          for (let i = 0; i < c.length; i++) {
            c[i].user = data[i];
          }
          this.comments = c;
          this.fetching = false;
        });
      });
  },
  methods: {
    getImg(img: string) {
      return img || require("@/assets/images/default-profile.png");
    },
    getUser() {
      return user.$single;
    },
    isOwner() {
      return this.post.owner === user.$single.uid;
    },
    compareOwner(uid: string) {
      return uid === user.$single.uid;
    },
    getMoment() {
      return moment(new Date(this.post.date)).locale("pt-br").fromNow();
    },
    deletePost() {
      this.$fire.database
        .ref(`/posts/${this.post.owner}/${this.post.uid}`)
        .remove();
    },
    loadImage() {
      this.form.imageUrl = window.URL.createObjectURL(
        new Blob([this.form.file] as any)
      );
    },
    async edit() {
      try {
        let url = null;
        if (this.form.imageUrl && this.form.file) {
          let snap = await this.$fire.storage
            .ref(`posts/${this.post.owner}`)
            .child(`${this.post.uid}`)
            .put(this.form.file as any);
          url = await snap.ref.getDownloadURL();
        }
        this.$fire.database
          .ref(`posts/${this.post.owner}/${this.post.uid}`)
          .update({
            content: this.form.content,
            imageUrl: url || this.form.imageUrl,
            global: this.form.globalScope,
          });
        this.dialog = !this.dialog;
        this.snack = !this.snack;
      } catch (error) {
        // console.log(error);
      }
    },
    like() {
      this.$fire.database
        .ref(`/posts/${this.post.owner}/${this.post.uid}`)
        .once("value", (snapshot) => {
          this.likes = snapshot.val().likes ? snapshot.val().likes : [];
          if (!this.hasLiked) {
            this.likes.push(user.$single.uid);
            this.hasLiked = true;
          } else {
            this.likes = this.likes.filter(
              (users: string) => users !== user.$single.uid
            );
            this.hasLiked = false;
          }
        });
      this.$fire.database
        .ref(`/posts/${this.post.owner}/${this.post.uid}`)
        .update({
          likes: Array.from(new Set(this.likes)),
        });
    },

    addComment() {
      let comments: any[] = [];
      if (this.form.comment !== "") {
        this.$fire.database
          .ref(`/posts/${this.post.owner}/${this.post.uid}`)
          .once("value", (snapshot) => {
            comments = snapshot.val().comments ? snapshot.val().comments : [];
            comments.push({
              uid: user.$single.uid,
              content: this.form.comment,
            });
          });
        this.$fire.database
          .ref(`/posts/${this.post.owner}/${this.post.uid}`)
          .update({
            comments,
          });
        this.form.comment = "";
      }
    },

    removeComment(content: string, uid: string) {
      const comments = this.comments.filter(
        (x: any) => x.content !== content || x.uid !== uid
      );
      comments.reverse();
      this.$fire.database
        .ref(`/posts/${this.post.owner}/${this.post.uid}`)
        .update({ comments });
    },
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
  max-width: 360px;
  max-height: 300px;
}

.post-content {
  line-height: 1.3333;
}

.preview-img {
  max-height: 300px;
  max-width: 200px;
}

.comment-img {
  width: 32px;
  height: 32px;
  border-radius: 64px;
}

.stats {
  span {
    vertical-align: middle;
  }
}

.comment-block {
  background-color: #f0f0f0;
  padding: 12px;
  width: 100%;
  border-radius: 30px;
}

@media screen and (max-width: 800px) {
  .post-img {
    max-width: 200px;
  }
}
</style>
