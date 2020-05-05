<template>
  <v-card>
    <div style="background-color: #ff9800; height: 10px"></div>

    <v-card-title
    >{{ title | capitalize }}
    </v-card-title>
    <v-card-subtitle style="max-width: 80%">
      {{ text | capitalize }}
      <br/> {{ date | formatDate}}
    </v-card-subtitle>

    <v-btn
      :disabled="load"
      :loading="load"
      @click="removeItem"
      class="ma-2"
      color="blue-grey"
      fab
      outlined
      small
      style="position: absolute; top: 30%; left: 80%"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-card>
</template>

<script lang="ts">
  export default {
    name: "todolistitem.vue",
    props: {
      id: String,
      title: String,
      text: String,
      date: Number
    },

    data: () => ({
      load: false
    }),

    methods: {

      removeItem() {
        this.$data.load = true;
        this.$fire
          .firestore()
          .collection(`users/${this.$store.getters.currentUser.uid}/tasks`)
          .doc(this.$props.id)
          .delete()
          .then(() => {
            this.$data.load = false;
          });
      },
    }
  }
</script>

<style scoped>

</style>
