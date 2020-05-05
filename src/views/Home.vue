<style type="text/css">

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
      >Додати новий запис
      </div>
      <div style="background-color: #40C4FF ; height: 2em">
        <v-btn
          @click="createItem"
          class="mx-2"
          color="#01579B"
          dark
          fab
          style="position: absolute; margin-top: 0.3em;"
        >
          <v-icon dark v-if="!showItemForm">mdi-plus</v-icon>
          <v-icon dark v-if="showItemForm">mdi-close</v-icon>
        </v-btn>
      </div>
      <form @submit.prevent="submit" style="padding: 10px; margin-top: 2em" v-if="showItemForm">
        <v-text-field
          :counter="30"
          :error-messages="titleErrors"
          @blur="$v.title.$touch()"
          @input="$v.title.$touch()"
          label="Title"
          required
          v-model="title"
        ></v-text-field>

        <v-text-field
          :counter="150"
          :error-messages="textErrors"
          @blur="$v.text.$touch()"
          @input="$v.text.$touch()"
          label="Text"
          required
          v-model="text"
        ></v-text-field>

        <v-btn
          :disabled="savingdata"
          :loading="savingdata"
          @click="submit"
          class="ma-2 white--text"
          color="#01579B"
        >
          Зберегти
          <v-icon dark right>mdi-cloud-upload</v-icon>
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </v-card>

    <TodoListItem
      :key="t.title"
      style="margin-top: 1em;"
      v-for="t in todos"
      v-bind:id="t.id"
      v-bind:title="t.title"
      v-bind:text="t.text"
      v-bind:date="t.date"
    >

    </TodoListItem>

  </v-container>
</template>

<script lang="ts">
  import {validationMixin} from "vuelidate";
  import {maxLength, required} from "vuelidate/lib/validators";
  import store from "@/store";
  import TodoListItem from '@/components/TodoListItem.vue';
  export default {
    components: { TodoListItem },
    mixins: [validationMixin],

    validations: {
      text: {required, maxLength: maxLength(150)},
      title: {required, maxLength: maxLength(30)}
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



      clear() {
        this.$v.$reset();
        this.text = "";
        this.title = "";
        this.select = null;
        this.checkbox = false;
        this.$data.showItemForm = false;
      }
    },

    mounted() {

      const u = this.$store.getters.currentUser
      if (u) {
        this.$fire.firestore().collection(`users/${u.uid}/tasks`)
          .onSnapshot(data => {
            console.log('on snapshot')
            console.log(data);
            store.dispatch('setTodoItemsList', data.docs.map(d => d.data()));
          });
      }
    }
  };
</script>
