<template>
  <v-row
    align-content="center"
    class="fill-height"
    justify="center"
  >
    <v-col
      class="subtitle-1 text-center"
      cols="12"
    >
      Please wait ...
    </v-col>
    <v-col cols="12" style="text-align: center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script lang="ts">

  import {doLogin, getCurrentAuthUser} from "@/auth.service";

  export default {
    name: "Login.vue",
    mounted() {
      getCurrentAuthUser().then(user => {
        if (user) {
          this.$store.dispatch('loginSuccess', user);
          this.$router.push({path: '/'});
        } else {
          this.$fire.auth().getRedirectResult()
            .then(results => {
              if (!results.user) {
                doLogin();
              } else {
                this.$store.dispatch('loginSuccess', results.user);
                this.$router.push({path: '/'});
              }
            });
        }
      })

    }
  }
</script>

<style scoped>

</style>
