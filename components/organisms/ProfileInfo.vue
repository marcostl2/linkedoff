<template>
  <div>
    <v-card class="pa-0" width="100%">
      <UploadCoverImg />
      <ProfileImg />
      <v-container class="py-12 px-5 profile-container d-flex flex-column">
        <v-row>
          <v-col class="d-flex flex-column">
            <h2>{{ form.name }}</h2>
            <span v-if="form.profession">
              {{ form.profession }}
            </span>
            <span v-if="form.location">
              {{ form.location }}
            </span>
          </v-col>
          <v-col align="end">
            <v-btn
              v-if="profile && $route.fullPath === '/profile'"
              color="primary"
              @click="dialog = !dialog"
            >
              Editar perfil
              <v-icon class="ml-2">mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              v-else-if="!profile && status_connection === 0"
              color="primary"
              @click="addNotFriend()"
            >
              Solicitar Conexão
              <v-icon class="ml-2">mdi mdi-account-plus</v-icon>
            </v-btn>
            <v-btn
              v-else-if="!profile && status_connection === 1"
              color="warning"
              @click="removeFriendRequest()"
            >
              Cancelar Pedido de Amizade
              <v-icon class="ml-2">mdi mdi-account-plus</v-icon>
            </v-btn>
            <v-btn
              v-else-if="!profile && status_connection === 2"
              color="warning"
              @click="addRealFriend()"
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
        <!-- <v-row>
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
        </v-row> -->
        <v-row v-if="form.isCompany">
          <v-col>
            <v-card color="grey01" elevation="0" class="pa-4">
              <div class="d-flex justify-space-between mb-4">
                <h3>Últimas Vagas</h3>
                <v-btn
                  v-if="!visitProfile"
                  small
                  color="primary"
                  @click="$router.push('/vacancies')"
                >
                  Anunciar vagas
                </v-btn>
              </div>
              <v-row no-gutters>
                <v-col v-for="(vacancy, i) in getVacancies" :key="i" cols="6">
                  <v-card
                    class="pa-4 d-flex flex-column my-2 mr-2"
                    height="100%"
                  >
                    <h4>{{ vacancy.title }}</h4>
                    <p>
                      {{ vacancy.description }}
                    </p>
                  </v-card>
                </v-col>
              </v-row>
              <div class="mt-6 d-flex flex-column align-center justify-center">
                <v-btn
                  v-if="getVacancies.length"
                  text
                  color="primary"
                  class="mb-4"
                >
                  Visualizar todas as vagas
                </v-btn>
                <h4 v-if="!getVacancies.length">Nenhuma vaga no momento</h4>
                <v-btn
                  v-if="!isCompany && !visitProfile"
                  block
                  color="primary"
                  class="mb-4"
                >
                  Ver empresa no mapa
                </v-btn>
              </div>
            </v-card>
          </v-col>
          <v-col v-if="!hasLatLong" cols="12">
            <AddLocation />
          </v-col>
          <v-col v-if="!visitProfile" cols="12">
            <Map />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <EditProfile
      v-if="dialog"
      :dialog="dialog"
      :loading="loading"
      @closeDialog="dialog = !dialog"
      @updateInfo="updateInfo"
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
      loading: false,
      dialog: false,
      nickname: "", // slug
      profile: false,
      form: {
        name: "",
        profession: "",
        bio: "",
        location: "",
        isCompany: false,
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
    getVacancies() {
      return user.$single.vacancies && user.$single.vacancies.length > 2
        ? user.$single.vacancies.slice(0, 2)
        : user.$single.vacancies;
    },
    hasLatLong() {
      return user.$single.latitude && user.$single.longitude;
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
        this.form.isCompany = cUser.isCompany;
        this.form.location = cUser.location;
        this.defaultUrl = cUser.coverUrl;

        this.status_connection = 0;
        this.$fire.database
          .ref(`users/${user.$single.uid}`)
          .on("value", (snapshot) => {
            let myRequests = snapshot.val().requests;
            let myConnections = snapshot
              .val()
              .connections?.map((x: any) => x.uid);

            /* Friend Requests */
            if (myRequests && myRequests.includes(this.profileUID)) {
              this.status_connection = 2;
            }

            /* Already has a connection */
            if (myConnections && myConnections.includes(this.profileUID)) {
              this.status_connection = 3;
            }

            /* I send a request */
            if (cUser.requests && cUser.requests.includes(user.$single.uid)) {
              this.status_connection = 1;
            }
          });
      });
    }
  },
  methods: {
    updateInfo(e: any) {
      this.loading = !this.loading;
      this.form.profession = e.profession;
      this.form.bio = e.bio;
      user.create({
        ...user.$single,
        profession: e.profession,
        bio: e.bio,
      } as any);

      this.$swal.fire({
        title: "Dados atualizados com sucesso!",
        icon: "success",
        timer: 1500,
      });

      this.dialog = !this.dialog;
      this.loading = !this.loading;
    },

    // showPosition(position: any) {
    //   const latlon = position.coords.latitude + "," + position.coords.longitude;
    //   const geolocationApi =
    //     "http://api.positionstack.com/v1/reverse?access_key=630b083e74caa3e74e70c54012be6e2e&query=" +
    //     latlon;

    //   axios.get(geolocationApi).then((response: any) => {
    //     this.$fire.database.ref(`/users/${user.$single.uid}`).update({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       location:
    //         response.data.data[0].county +
    //         ", " +
    //         response.data.data[0].region +
    //         ", " +
    //         response.data.data[0].country,
    //     });
    //   });
    // },

    // getGeo() {
    //   navigator.geolocation.getCurrentPosition(this.showPosition);
    // },

    addNotFriend() {
      /* Get connections */
      const ref = this.$fire.database.ref(`/users/${this.profileUID}`);
      let requests: string[] = [];

      ref.on("value", (snapshot) => {
        const profileUser = snapshot.val();

        /* If in friends list */
        if (profileUser.requests) {
          requests = Array.from(snapshot.val().requests);
          requests.push(user.$single.uid);
        } else {
          requests = [user.$single.uid];
        }
      });

      this.$fire.database.ref(`/users/${this.profileUID}`).update({
        requests,
      });
    },

    removeFriendRequest() {
      const ref = this.$fire.database.ref(`/users/${this.profileUID}`);

      let requests: any[] = [];
      ref.on("value", (snapshot) => {
        const profileUser = snapshot.val();

        /* If in friends list */
        if (profileUser.requests) {
          requests = Array.from(profileUser.requests).filter(
            (x: any) => user.$single.uid !== x
          );
        }
      });
      this.$fire.database.ref(`/users/${this.profileUID}`).update({
        requests,
      });
    },

    addRealFriend() {
      const ref = this.$fire.database.ref(`/users/${this.profileUID}`);
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
            uid: this.profileUID,
            since: new Date().toJSON(),
          });
          /* Removes friend request in user pool  */
          cUserRequests = snapshot.val().requests
            ? snapshot.val().requests
            : [];
          cUserRequests = cUserRequests.filter(
            (x: any) => x !== this.profileUID
          );
        });
      /* Updates in database for friend */
      this.$fire.database
        .ref(`/users/${this.profileUID}`)
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

    removeFriend() {
      const refOther = this.$fire.database.ref(`/users/${this.profileUID}`);
      const refUser = this.$fire.database.ref(`/users/${user.$single.uid}`);
      let otherProfileConnections: { uid: string; since: string }[] = [];
      let cUserConnections: { uid: string; since: string }[] = [];

      /* Remove connection on friend */
      refOther.on("value", (snapshot) => {
        otherProfileConnections = snapshot.val().connections
          ? snapshot.val().connections
          : [];
        otherProfileConnections = otherProfileConnections.filter(
          (x: any) => x.uid !== user.$single.uid
        );
      });

      /* Remove connection on user */
      refUser.on("value", (snapshot) => {
        cUserConnections = snapshot.val().connections
          ? snapshot.val().connections
          : [];

        cUserConnections = cUserConnections.filter(
          (x: any) => x.uid !== this.profileUID
        );
      });

      /* Updates friend profile */
      refOther.update({
        connections: otherProfileConnections,
      });

      /* Updates user profile */
      refUser.update({
        connections: cUserConnections,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.add-location {
  border: 2px dashed #c2c2c2;
  width: 100%;
  padding: 20px 0;
}
</style>
