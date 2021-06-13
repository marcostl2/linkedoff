<template>
  <v-menu offset-y :close-on-content-click="false">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-badge v-if="notLen" color="green" :content="notLen">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
        <v-icon v-else>mdi-bell</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-subheader>Notificações</v-subheader>
      <v-list-item-group v-model="notifications" color="primary">
        <div v-for="not in notifications" :key="not.uid" class="notication-row">
          <v-row>
            <v-col cols="auto">
              <NuxtLink :to="`/users/${not.name.split(' ').join('_')}`">
                <img class="not-img" :src="not.profileImgUrl" />
              </NuxtLink>
            </v-col>
            <v-col>
              <span>
                <NuxtLink :to="`/users/${not.name.split(' ').join('_')}`">
                  <b>{{ not.name }}</b>
                </NuxtLink>
                , vulgo
                <b>{{ not.profession }}</b>
                te enviou uma solicitação de conexão...
              </span>
              <div class="mt-2 d-flex justify-content">
                <v-btn
                  class="mr-2"
                  fab
                  depressed
                  dark
                  x-small
                  color="green"
                  @click="addRealFriend(not.uid)"
                >
                  <v-icon dark>mdi-account-check</v-icon>
                </v-btn>
                <v-btn
                  fab
                  depressed
                  dark
                  x-small
                  color="red"
                  @click="removeFriendRequest(not.uid)"
                >
                  <v-icon dark>mdi-account-remove</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";
export default Vue.extend({
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
.notication-row {
  padding: 15px;
  max-width: 500px;
  color: black;
  .not-img {
    width: 92px;
    height: 92px;
    border-radius: 64px;
  }
}
</style>
