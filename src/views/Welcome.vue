<template>

  <v-container style="text-align: center; max-width: 400px">

    <div>
      <img src="@/assets/welcome.png" width="200px">
    </div>
    <div class="headline	font-weight-light mt-5">Вітаємо в "TODO"</div>


    <div class="subtitle-1 text-left mt-5 text-justify" >
      TODO список - це програма з категорії управління завдань, управління проектами,
      підвищення продуктивності, “Getting Things Done” (Робити речі зробленими), керування робочим графіком, співпрацею
    </div>

    <div class="subtitle-1 text-left mt-5 text-justify" >
       Для продовження знайомства необхідно увійти
    </div>

    <v-btn class="mt-5" dark outlined large color="primary" @click="signInWithGoogle" >
        <img
          style="margin: 5px"
          height="30px"
          src="https://cdn2.iconfinder.com/data/icons/social-icons-circular-color/512/google-512.png">
     Увійти з допомогою Google
    </v-btn>
  </v-container>
</template>

<script>
  export default {
    name: "Welcome",
    methods: {
      signInWithGoogle() {
        console.log("signInWithGoogle")
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>

</style>
