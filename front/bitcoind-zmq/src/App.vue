<template>
  <v-app>
    <v-app-bar app class="warning">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn class="success">ingreso</v-btn>
      <v-btn class="error">salir</v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary dark>
      <v-layout mt-4 column align-center>
        <v-flex>
          <v-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt />
          </v-avatar>
        </v-flex>

        <v-flex>
          <p class="white--text mt-3 headline">Juanito Perez</p>
        </v-flex>
      </v-layout>

      <v-layout column>
        <v-flex mx-3>
          <v-btn class="success" block :to="{name: 'Home'}">Home</v-btn>
          <v-btn class="success" block :to="{name: 'Tareas-crud'}">Lista de tareas</v-btn>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
    <v-content style="margin: 0 50px 0 50px;">
      <!-- <FlashMessage></FlashMessage> -->
      {{ snackbar}}
      <bd-snackbar :active="snackbar" @close="snackbar = $event"></bd-snackbar>

      <router-view @error="snackbar = $event" />
    </v-content>
  </v-app>
</template>

<script>
import bdSnackbar from "./components/BdSnackbar";

export default {
  name: "App",
  components: { bdSnackbar },
  data() {
    return {
      drawer: false,
      snackbar: false,
      text: "ERROR",
      data: ""
    };
  }
};
</script>
<style>
._vue-flash-msg-body__icon {
  background-color: #f56969 !important;
}
._vue-flash-msg-body__icon img {
  width: 40% !important;
}
._vue-flash-msg-body._vue-flash-msg-body_error ._vue-flash-msg-body__content {
  border-left: none !important;
}
._vue-flash-msg-body {
  z-index: 9;
  border-radius: 0;
}
</style>
