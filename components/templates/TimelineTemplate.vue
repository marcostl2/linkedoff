<template>
  <div>
    <CreatePost />
    <v-card v-if="loading" class="pa-4">
      <v-skeleton-loader
        type="list-item-avatar, list-item-three-line,  image"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mt-8"
        type="list-item-avatar, list-item-three-line,  image"
      ></v-skeleton-loader>
    </v-card>
    <div v-else>
      <div v-for="(post, i) in posts" :key="i" class="d-flex flex-column">
        <PostCard :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      posts: [],
      loading: true,
    };
  },
  computed: {
    $getPosts() {
      return this.posts;
    },
  },
  beforeMount() {
    this.$fire.database.ref("/posts/").on("value", (snapshot) => {
      this.posts = [];
      const users = snapshot.val();
      if (!Object.keys(users).length) {
        this.loading = false;
        return;
      }
      const usersUID = Object.keys(users);
      usersUID.forEach((userUID) => {
        const posts = users[userUID];
        const postKeys = Object.keys(posts);
        postKeys.forEach((postKey) => {
          if (posts[postKey].global || userUID === user.$single.uid) {
            this.posts.push({
              uid: postKey,
              owner: userUID,
              ...posts[postKey],
            });
            this.posts.sort((a, b) => {
              if (a.date > b.date) {
                return -1;
              } else if (a.date === b.date) {
                return 0;
              } else {
                return 1;
              }
            });
          }
        });
      });
      this.loading = false;
    });
  },
});
</script>

<style scoped></style>
