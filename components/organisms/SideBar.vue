<template>
  <div class="sidebar d-flex flex-column align-center justify-center">
    <Logo />
    <h5 class="text-h5 font-weight-bold text-center mt-6 mb-16">
      Você conectado, SEMPRE!
    </h5>
    <img
      class="illustration"
      src="@/assets/images/sidebar-illustration.png"
      alt="SideBar Img"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;

  .illustration {
    width: 100%;
    max-width: 240px;
  }
}
</style>
