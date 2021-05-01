<template>
  <v-card class="pa-4" max-width="300">
    <v-row column>
      <v-col cols="12">
        <h3>Suas conexões</h3>
      </v-col>
      <div v-if="users ? users.length > 0 : false">
        <v-col v-for="user in users" :key="user[0]" cols="12">
          <NuxtLink :to="`/users/${user[1].name.split(' ').join('_')}`">
            <div class="d-flex">
              <img
                :src="
                  user[1].profileImgUrl
                    ? user[1].profileImgUrl
                    : 'https://storage.googleapis.com/kondzilla-wp/2020/07/marks2.jpg'
                "
                alt="Profile Connection"
              />
              <div class="d-flex flex-column pl-2">
                <h4>{{ user[1].name }}</h4>
                <span v-if="user[1].profession">{{ user[1].profession }}</span>
                <span v-else>Desempregado</span>
              </div>
            </div>
          </NuxtLink>
        </v-col>
      </div>
      <v-col v-else cols="12">
        <span>Sem contatos</span>
      </v-col>
      <v-col v-if="users ? users.length > 0 : false" cols="12">
        <NuxtLink to="/connections">
          <v-btn width="100" color="primary" text>Ver todas</v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
// import { user } from "@/store";

export default Vue.extend({
  data() {
    return {
      users: [],
    };
  },

  // created() {
  //   // let aux=[]
  //   let connections = user.$single.connections;
  //   for (let i of connections) {
  //     const ref = this.$fire.database.ref(`/users/${i.uid}`);
  //     // ref.on("value", (snapshot) => {
  //       // let connection={
  //       //   profileImgUrl:snapshot.val().profileImgUrl as string,
  //       //   name:snapshot.val().name as string,
  //       //   profession:snapshot.val().profession as string,
  //       // }

  //       // const entries: any = Object.entries(snapshot.val());
  //       // let us = entries.filter((u: any) => {
  //       //   const c = u[1].connections
  //       //     ? u[1].connections.map((t: any) => Object.keys(t)[0])
  //       //     : [];
  //       //   return c.includes(user.$single.uid) && uc.includes(u[0]);
  //       // });
  //       // this.users = us;
  //       // this.users.push(connection)
  //     });
  //   }
  // },
  // created() {
  //   let aux=[]
  //   let connections=user.$single.connections
  //   for(let i of connections){

  //   }
  //   const ref = this.$fire.database.ref("/users/");
  //   ref.on("value", (snapshot) => {

  //     // const uc = user.$single.connections
  //     //   ? user.$single.connections.map((t: any) => Object.keys(t)[0])
  //     //   : [];
  //     const entries: any = Object.entries(snapshot.val());
  //     let us = entries.filter((u: any) => {
  //       const c = u[1].connections
  //         ? u[1].connections.map((t: any) => Object.keys(t)[0])
  //         : [];
  //       return c.includes(user.$single.uid) && uc.includes(u[0]);
  //     });
  //     this.users = us;
  //   });
  // },
});
</script>

<style scoped lang="scss">
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.d-flex.flex-column.pl-2 {
  h4 {
    color: #32b295;
  }
  span {
    color: black;
  }
}
</style>
