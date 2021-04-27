<template>
  <div>
    <v-card class="pa-0" width="100%">
      <UploadCoverImg :forceUrl="defaultUrl" />
      <ProfileImg />
      <v-container class="py-12 px-5 profile-container d-flex flex-column">
        <v-row>
          <v-col class="d-flex flex-column">
            <h2>{{ form.name }}</h2>
            <span v-if="form.profession">{{ form.profession }}</span>
            <span v-if="form.location">
              {{ form.location }}
            </span>
          </v-col>
          <v-col align="end">
            <v-btn v-if="profile" color="primary" @click="dialog = !dialog">
              Editar perfil
              <v-icon class="ml-2">mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              v-else-if="!profile && status_connection === 0"
              color="primary"
              @click="addFriend()"
            >
              Solicitar Conexão
              <v-icon class="ml-2">mdi mdi-account-plus</v-icon>
            </v-btn>
            <v-btn
              v-else-if="!profile && status_connection === 1"
              color="warning"
              @click="removeFriend()"
            >
              Cancelar Pedido de Amizade
              <v-icon class="ml-2">mdi mdi-account-plus</v-icon>
            </v-btn>
            <v-btn
              v-else-if="!profile && status_connection === 2"
              color="warning"
              @click="addFriend()"
            >
              Aceitar Pedido de Amizade
              <v-icon class="ml-2">mdi mdi-account-plus</v-icon>
            </v-btn>
            <v-btn
              v-else-if="!profile && status_connection === 3"
              color="error"
              @click="removeFriend()"
            >
              Remover Conexão
              <v-icon class="ml-2">mdi mdi-account-minus</v-icon>
            </v-btn>

            <!-- <v-btn color="secondary" @click="getGeo()">
              Localização Atual
              <v-icon class="ml-2">mdi-earth</v-icon>
            </v-btn> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <ProfileAbout :bio="form.bio" />
          </v-col>
        </v-row>
        <v-row v-if="!isCompany">
          <v-col>
            <v-card color="grey01" elevation="0" class="pa-4">
              <div class="d-flex justify-space-between mb-4">
                <h3>Tecnologias</h3>
              </div>
              <v-chip
                v-for="tech in techs"
                :key="tech"
                class="mr-2"
                color="primary"
              >
                {{ tech }}
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <v-card color="grey01" elevation="0" class="pa-4">
              <div class="d-flex justify-space-between mb-4">
                <h3>Vagas</h3>
                <v-btn small color="primary">Anunciar vagas</v-btn>
              </div>
              <div class="d-flex">
                <v-card class="d-flex flex-column my-2 mr-4" max-width="300">
                  <v-card-title>Vaga de motorista</v-card-title>
                  <v-card-text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Voluptatibus odit eos praesentium voluptate pariatur?
                    Itaque, molestiae. Quam atque rem beatae similique. Nemo
                    quaerat molestias odio, vel tenetur veritatis perspiciatis
                    animi.
                  </v-card-text>
                </v-card>
                <v-card class="d-flex flex-column my-2 mr-4" max-width="300">
                  <v-card-title>Vaga de motorista</v-card-title>
                  <v-card-text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Voluptatibus odit eos praesentium voluptate pariatur?
                    Itaque, molestiae. Quam atque rem beatae similique. Nemo
                    quaerat molestias odio, vel tenetur veritatis perspiciatis
                    animi.
                  </v-card-text>
                </v-card>
              </div>
              <div class="mt-2 d-flex flex-column align-center justify-center">
                <v-btn text color="primary" class="mb-4">
                  Visualizar todas as vagas
                </v-btn>
                <v-btn
                  v-if="isCompany && !visitProfile"
                  block
                  color="primary"
                  class="mb-4"
                >
                  Ver empresa no mapa
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <EditProfile
      v-if="dialog"
      :dialog="dialog"
      @closeDialog="dialog = !dialog"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";

export default Vue.extend({
  props: {
    visitProfile: { type: Boolean },
  },
  data() {
    return {
      dialog: false,
      nickname: "", // slug
      profile: false,
      form: {
        name: "",
        profession: "",
        bio: "",
        location: "",
      },
      techs: ["Cobol", "Python", "Javascript"],
      /* Other profiles */
      profileUID: "",
      defaultUrl: "",
      status_connection: 0, // Not friend, waiting aproval, friend
    };
  },
  computed: {
    isCompany() {
      return user.$single.isCompany;
    },
  },
  mounted() {
    this.nickname = this.$route.params.nickname;
    this.profile =
      (!this.nickname && this.$route.fullPath === "/profile") ||
      user.$single.name === this.nickname.split("_").join(" ");

    if (this.profile) {
      this.form.name = user.$single.name;
      this.form.profession = user.$single.profession;
      this.form.bio = user.$single.bio;
      this.form.location = user.$single.location;

      /*
      this.$fire.database
        .ref(`users/${user.$single.uid}`)
        .on("value", (snapshot) => {
          this.form.location = snapshot.val().location;
        });
      */
    } else {
      const ref = this.$fire.database.ref("users");

      ref.on("value", (snapshot) => {
        const entries: any = Object.entries(snapshot.val());
        const users: any = entries.filter(
          (u: any) => u[1].name === this.nickname.split("_").join(" ")
        );

        /* Definition */
        let cUser = users[0][1];
        this.profileUID = users[0][0];
        this.form.name = cUser.name;
        this.form.profession = cUser.profession;
        this.form.bio = cUser.bio;
        this.form.location = cUser.location;
        this.defaultUrl = cUser.profileImgUrl;

        let arrowHim = cUser.connections
          ? cUser.connections.filter((c: any) => user.$single.uid in c).length >
            0
          : false;
        let arrowMe =
          user.$single.connections !== undefined
            ? Array.from(user.$single.connections).filter(
                (c: any) => this.profileUID in c
              ).length > 0
            : false;

        if (!arrowMe && !arrowHim) this.status_connection = 0;
        else if (arrowMe && !arrowHim) this.status_connection = 1;
        else if (!arrowMe && arrowHim) this.status_connection = 2;
        else if (arrowMe && arrowHim) this.status_connection = 3;
      });
    }
  },
  methods: {
    // showPosition(position: any) {
    //   const latlon = position.coords.latitude + "," + position.coords.longitude;
    //   const geolocationApi =
    //     "http://api.positionstack.com/v1/reverse?access_key=630b083e74caa3e74e70c54012be6e2e&query=" +
    //     latlon;

    // axios.get(geolocationApi).then((response: any) => {
    //   this.$fire.database.ref(`/users/${user.$single.uid}`).update({
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     location:
    //       response.data.data[0].county +
    //       ", " +
    //       response.data.data[0].region +
    //       ", " +
    //       response.data.data[0].country,
    //   });
    // });
    // },

    // getGeo() {
    //   navigator.geolocation.getCurrentPosition(this.showPosition);
    // },

    addFriend() {
      /* Get connections */
      const ref = this.$fire.database.ref(`/users/${user.$single.uid}`);
      let connections: any[] = [];
      ref.on("value", (snapshot) => {
        const cUser = snapshot.val();

        /* If in friends list */
        if (cUser.connections) {
          connections = Array.from(snapshot.val().connections);
          connections.push({ [this.profileUID]: new Date() });
        } else {
          connections = [{ [this.profileUID]: new Date() }];
        }
      });

      user.create({ ...user.$single, connections } as any);

      this.$fire.database.ref(`/users/${user.$single.uid}`).update({
        connections,
      });
    },

    removeFriend() {
      const ref = this.$fire.database.ref(`/users/${user.$single.uid}`);

      let connections: any[] | undefined = [];
      ref.on("value", (snapshot) => {
        const cUser = snapshot.val();

        /* If in friends list */
        if (cUser.connections) {
          connections = Array.from(snapshot.val().connections).filter(
            (x: any) => !(this.profileUID in x)
          );
        } else {
          connections = undefined;
        }
      });

      user.create({ ...user.$single, connections } as any);

      this.$fire.database.ref(`/users/${user.$single.uid}`).update({
        connections,
      });
    },
  },
});
</script>
