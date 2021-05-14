<template>
  <div>
    <CreatePost />
    <div
      v-for="(post, i) in getPosts"
      :key="i"
      class="d-flex flex-column flex-wrap"
    >
      <PostCard :post="post" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  computed: {
    getPosts() {
      return user.$single.posts;
    },
  },
});
</script>

<style scoped></style>
