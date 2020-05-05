<style type="text/css">
  .headline {
    max-width: 80%;
  }

  .overline {
    padding: 10px;
    background-color: #40C4FF;
    color: white;
  }
</style>
<template>

  <v-container style="max-width: 400px" v-if="$store.getters.currentUser">
    <v-card style="padding: 0; margin-bottom: 3em">
      <!-- <div
        class="overline mb-0"
        style="padding: 10px"
      v-if="!showItemForm">Додати новий запис</div>-->
      <div
        class="overline mb-0 display-3 "
      >Додати новий запис</div>
      <div style="background-color: #40C4FF ; height: 2em">
        <v-btn
          @click="createItem"
          class="mx-2"
          fab
          dark
          color="#01579B"
          style="position: absolute; margin-top: 0.3em;"
        >
          <v-icon dark v-if="!showItemForm">mdi-plus</v-icon>
          <v-icon dark v-if="showItemForm">mdi-close</v-icon>
        </v-btn>
      </div>
      <form style="padding: 10px; margin-top: 2em" @submit.prevent="submit" v-if="showItemForm">
        <v-text-field
          v-model="title"
          :error-messages="titleErrors"
          :counter="30"
          label="Title"
          required
          @input="$v.title.$touch()"
          @blur="$v.title.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="text"
          :error-messages="textErrors"
          :counter="150"
          label="Text"
          required
          @input="$v.text.$touch()"
          @blur="$v.text.$touch()"
        ></v-text-field>
        <!-- <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-select
              v-model="select"
              :items="items"
              :error-messages="selectErrors"
              label="Item"
              required
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
            ></v-select>
            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="Do you agree?"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
        ></v-checkbox>-->

        <v-btn
          :loading="savingdata"
          :disabled="savingdata"
          color="#01579B"
          class="ma-2 white--text"
          @click="submit"
        >
          Зберегти
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </v-card>

    <v-card v-for="t in todos" :key="t.title" style="margin-top: 1em;">
      <div style="background-color: #ff9800; height: 10px"></div>

      <v-card-title
        class="headline"
      >{{ t.title.replace(/^./, t.title[0].toUpperCase()) }}</v-card-title>
      <v-card-subtitle style="max-width: 80%">
        {{t.text}}
        <br />2020-05-03
      </v-card-subtitle>

      <v-btn
        @click="removeitem(t.id)"
        style="position: absolute; top: 30%; left: 80%"
        class="ma-2"
        outlined
        small
        fab
        color="blue-grey"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    text: { required, maxLength: maxLength(150) },
    title: { required, maxLength: maxLength(30) }
    // email: { required, email },
    // select: { required },
    // checkbox: {
    //   checked(val) {
    //     return val;
    //   }
    // }
  },

  data: () => ({
    text: "",
    email: "",
    title: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    showItemForm: false,
    savingdata: false
  }),

  computed: {
    // checkboxErrors() {
    //   const errors: any = [];
    //   if (!this.$v.checkbox.$dirty) return errors;
    //   !this.$v.checkbox.checked && errors.push("You must agree to continue!");
    //   return errors;
    // },
    // selectErrors() {
    //   const errors: any = [];
    //   if (!this.$v.select.$dirty) return errors;
    //   !this.$v.select.required && errors.push("Item is required");
    //   return errors;
    // },
    textErrors() {
      const errors: any = [];
      if (!this.$v.text.$dirty) return errors;
      !this.$v.text.maxLength &&
        errors.push("text must be at most 10 characters long");
      !this.$v.text.required && errors.push("text is required.");
      return errors;
    },

    titleErrors() {
      const errors: any = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.maxLength &&
        errors.push("Title must be at most 10 characters long");
      !this.$v.title.required && errors.push("Title is required.");
      return errors;
    },
    // emailErrors() {
    //   const errors: any = [];
    //   if (!this.$v.email.$dirty) return errors;
    //   !this.$v.email.email && errors.push("Must be valid e-mail");
    //   !this.$v.email.required && errors.push("E-mail is required");
    //   return errors;
    // },
    todos() {
      return this.$store.getters.getItemsSorterByAddding;
    }
  },

  methods: {
    submit() {
      console.log("submit");
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.savingdata = true;
        const newDocument = this.$fire
          .firestore()
          .collection(`users/${this.$store.getters.currentUser.uid}/tasks`)
          .doc();

        const itemData = {
          id: newDocument.id,
          text: this.text,
          title: this.title,
          date: Date.now()
        };

        newDocument
          .set(itemData)
          .then(() => {
            this.$store.dispatch("addTodoItem", itemData);
            this.$data.showItemForm = false;
            (this as any).clear();
          })
          .finally(() => {
            this.savingdata = false;
          });
      }
    },

    createItem() {
      this.$data.showItemForm = !this.$data.showItemForm;
    },

    removeitem(id: any) {
      console.log("remove: ", id);
      this.$fire
        .firestore()
        .collection(`users/${this.$store.getters.currentUser.uid}/tasks`)
        .doc(id)
        .delete()
        .then(() => {
          this.$store.dispatch("removeTodoItem", id);
        });
    },

    clear() {
      this.$v.$reset();
      this.text = "";
      this.title = "";
      this.select = null;
      this.checkbox = false;
      this.$data.showItemForm = false;
    }
  }
};
</script>
