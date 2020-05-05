<template>
  <v-app>
    <v-app-bar app color="#01579B" dark>
      <v-spacer></v-spacer>

      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="!currentUser" @click="onLogin">
            <v-list-item-avatar>
              <img src="https://cdn2.iconfinder.com/data/icons/social-icons-circular-color/512/google-512.png">
            </v-list-item-avatar>
            <v-list-item-title>Sign in</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="currentUser">
            <v-list-item-avatar>
              <img v-bind:src="currentUser.photoURL">
            </v-list-item-avatar>
            <v-list-item-title>{{currentUser.email}}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-if="currentUser" @click="onLogout">
            <v-list-item-avatar>
              <img src="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/Power_-_Logoff.png">
            </v-list-item-avatar>
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>

        </v-list>
      </v-menu>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import {doLogin, doLogout} from "@/auth.service";
import router from "@/router";

export default Vue.extend({
  name: "App",

  data: () => ({}),

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },

  methods: {
    onLogin() {
      router.push({path: 'login'})
    },
    onLogout() {
      doLogout()
    }
  },
  mounted(){
    console.log('mounted')
    if (!this.$store.getters.currentUser) {
      router.push('login')
    }
  }
});
</script>
