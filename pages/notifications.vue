<template>
  <v-card class="pa-4" min-height="500">
    <h3 class="">Suas notificações</h3>
    <v-divider class="my-3"></v-divider>
    <div
      v-if="!notifications.length"
      style="width: 100%; min-height: 400px"
      class="d-flex flex-column justify-center align-center"
    >
      <img
        src="@/assets/images/empty.svg"
        alt="Empty"
        :width="$vuetify.breakpoint.mdAndUp ? 400 : 260"
      />
      <h4 class="text-center mt-6">Você não possui nenhuma notificação</h4>
    </div>
    <div v-for="not in notifications" :key="not.uid" class="notication-row">
      <div class="d-flex align-center">
        <NuxtLink :to="`/users/${not.name.split(' ').join('_')}`">
          <img
            class="not-img"
            :src="not.profileImgUrl"
            width="50"
            height="50"
          />
        </NuxtLink>
        <div class="px-4 d-flex flex-column flex-md-row align-md-center">
          <NuxtLink :to="`/users/${not.name.split(' ').join('_')}`">
            <b>{{ not.name }}</b>
          </NuxtLink>
          <div class="ml-md-4 d-flex">
            <v-btn
              class="mr-2 white--text"
              depressed
              color="green"
              @click="addRealFriend(not.uid)"
            >
              <v-icon dark>mdi-account-check</v-icon>
              Aceitar
            </v-btn>
            <v-btn
              class="white--text"
              depressed
              color="red"
              @click="removeFriendRequest(not.uid)"
            >
              <v-icon dark>mdi-account-remove</v-icon>
              Excluir
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  layout: "logged",
  data() {
    return {
      notLen: 0,
      notifications: [] as any,
    };
  },
  created() {
    this.$fire.database
      .ref(`/users/${user.$single.uid}`)
      .on("value", (snapshot) => {
        this.notifications = [];
        const requests = snapshot.val()?.requests;
        this.notLen = requests ? requests.length : 0;

        if (requests) {
          requests.forEach((request: any) => {
            this.$fire.database
              .ref(`/users/${request}`)
              .once("value", (snapshot) => {
                this.notifications.push({
                  uid: snapshot.key,
                  ...snapshot.val(),
                });
              });
          });
        }
      });
  },

  methods: {
    removeFriendRequest(uid: string) {
      const ref = this.$fire.database.ref(`/users/${user.$single.uid}`);

      let requests: any[] = [];
      ref.on("value", (snapshot) => {
        const profileUser = snapshot.val();

        /* If in friends list */
        if (profileUser.requests) {
          requests = Array.from(profileUser.requests).filter(
            (x: any) => uid !== x
          );
        }
      });
      this.$fire.database.ref(`/users/${user.$single.uid}`).update({
        requests,
      });
    },

    addRealFriend(uid: string) {
      const ref = this.$fire.database.ref(`/users/${uid}`);
      let otherProfileConnections: { uid: string; since: string }[] = [];
      let cUserConnections: { uid: string; since: string }[] = [];
      let cUserRequests: string[] = [];

      ref.on("value", (snapshot): void => {
        /* Add a new connection in friend pool */
        otherProfileConnections = snapshot.val().connections
          ? snapshot.val().connections
          : [];
        otherProfileConnections.push({
          uid: user.$single.uid,
          since: new Date().toJSON(),
        });
      });
      this.$fire.database
        .ref(`/users/${user.$single.uid}`)
        .on("value", (snapshot) => {
          /* Add a new connection in user pool */
          cUserConnections = snapshot.val().connections
            ? snapshot.val().connections
            : [];
          cUserConnections.push({
            uid,
            since: new Date().toJSON(),
          });
          /* Removes friend request in user pool  */
          cUserRequests = snapshot.val().requests
            ? snapshot.val().requests
            : [];
          cUserRequests = cUserRequests.filter((x: any) => x !== uid);
        });
      /* Updates in database for friend */
      this.$fire.database
        .ref(`/users/${uid}`)
        .update({ connections: otherProfileConnections });

      /* Updates in database for user */
      this.$fire.database.ref(`/users/${user.$single.uid}`).update({
        connections: cUserConnections,
        requests: cUserRequests,
      });
      user.create({
        ...user.$single,
        connections: cUserConnections,
        requests: cUserRequests,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.not-img {
  border-radius: 50%;
}
</style>
