import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#E75030', // 2196F3
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#E75030',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
