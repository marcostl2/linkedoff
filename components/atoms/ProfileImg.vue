<template>
  <div class="profile-img">
    <img src="@/assets/images/raj.png" alt="Perfil" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped lang="scss">
.profile-img {
  width: 100px;
  height: 120px;
  position: absolute;
  top: -80px;

  img {
    width: 100%;
    border-radius: 8px;
  }
}
</style>
