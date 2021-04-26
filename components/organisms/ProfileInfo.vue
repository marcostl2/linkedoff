<template>
  <div>
    <v-card class="pa-0" width="100%">
      <UploadCoverImg />
      <v-container class="py-12 px-5 profile-container d-flex flex-column">
        <ProfileImg />
        <v-row>
          <v-col class="d-flex flex-column">
            <h2>{{ form.name }}</h2>
            <span v-if="form.profession">{{ form.profession }}</span>
            <span v-if="form.location">
              {{ form.location }}
            </span>
            <span v-else>Sem acesso a localização</span>
          </v-col>
          <v-col align="end">
            <v-btn color="primary" @click="dialog = !dialog">
              Editar perfil
              <v-icon class="ml-2">mdi-pencil</v-icon>
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
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="py-4 px-sm-8">
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="d-flex justify-space-between align-center">
                <span class="text-h6 font-weight-bold">Editar perfil</span>
                <v-btn icon @click="dialog = !dialog">
                  <v-icon color="primary">mdi-close</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12">
              <span>Nome</span>
              <v-text-field
                v-model="form.password"
                filled
                required
                rounded
                hide-details
                dense
                placeholder="Seu nome"
              />
            </v-col>
            <v-col cols="12">
              <span>Profissão</span>
              <v-text-field
                v-model="form.password"
                filled
                hide-details
                required
                rounded
                dense
                placeholder="Sua profissão"
              />
            </v-col>
            <v-col cols="12">
              <span>Sobre</span>
              <v-textarea
                :value="form.password"
                filled
                required
                no-resize
                hide-details
                rounded
                dense
                placeholder="Escreva algo sobre você"
              />
            </v-col>
            <v-col cols="12" align="center">
              <v-btn color="primary" class="text-capitalize" large>
                Salvar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { user } from "@/store";
import axios from "axios";

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
    };
  },
  computed: {
    isCompany() {
      return user.$single.isCompany;
    },
  },
  mounted() {
    this.nickname = this.$route.params.nickname;
    this.profile = !this.nickname && this.$route.fullPath === "/profile";

    if (this.profile) {
      this.form.name = user.$single.name;
      this.form.profession = user.$single.profession;
      this.form.bio = user.$single.bio;

      this.$fire.database
        .ref(`users/${user.$single.uid}`)
        .on("value", (snapshot) => {
          this.form.location = snapshot.val().location;
        });
    }
  },
  methods: {
    showPosition(position: any) {
      const latlon = position.coords.latitude + "," + position.coords.longitude;
      const geolocationApi =
        "http://api.positionstack.com/v1/reverse?access_key=630b083e74caa3e74e70c54012be6e2e&query=" +
        latlon;

      axios.get(geolocationApi).then((response: any) => {
        this.$fire.database.ref(`/users/${user.$single.uid}`).update({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          location:
            response.data.data[0].county +
            ", " +
            response.data.data[0].region +
            ", " +
            response.data.data[0].country,
        });
      });
    },

    getGeo() {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    },
  },
});
</script>
