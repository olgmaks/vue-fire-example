import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Vuelidate from 'vuelidate';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);
Vue.use(Vuelidate);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
});
