<template>
  <div>
    <CreatePost />
    <div v-for="(post, i) in posts" :key="i" class="d-flex flex-column">
      <PostCard :post="post" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.$fire.database.ref("/posts/").on("value", (snapshot) => {
      this.posts = [];
      const users = snapshot.val();
      const usersUID = Object.keys(users);
      usersUID.forEach((userUID) => {
        const posts = users[userUID];
        const postKeys = Object.keys(posts);
        postKeys.forEach((postKey) => {
          if (
            posts[postKey].global ||
            userUID === user.$single.uid ||
            user.$single.connections.map((x) => x.uid).includes(userUID)
          ) {
            this.posts.push({
              uid: postKey,
              owner: userUID,
              ...posts[postKey],
            } as never);
            this.posts.sort((a: any, b: any) => {
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
    });
  },
});
</script>

<style scoped></style>
