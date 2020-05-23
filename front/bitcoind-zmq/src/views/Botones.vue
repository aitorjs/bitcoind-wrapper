<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-btn>Texto</v-btn>

        <v-btn color="primary">Texto</v-btn>
        <v-btn dark color="red">Texto</v-btn>

        <v-btn color="secondary" text>Texto</v-btn>

        <v-btn color="warning" large>Largo</v-btn>
        <v-btn color="warning" small>Corto</v-btn>

        <v-btn color="warning" large disabled>Largo inactivo</v-btn>
        <v-btn color="warning" large :disabled="true">Inactivo</v-btn>
        <v-btn color="warning" large :disabled="false">Activo</v-btn>

        <v-btn color="info" depressed>Botón</v-btn>

        <v-btn>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn color="primary" icon text>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn color="primary" fab>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn color="primary" fab small>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn color="primary" fab large>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn color="success">
          Texto
          <v-icon>forum</v-icon>
        </v-btn>

        <v-btn color="success">
          Texto
          <v-icon class="ml-2">forum</v-icon>
        </v-btn>

        <v-btn color="success">
          Texto
          <v-icon right>forum</v-icon>
        </v-btn>

        <v-btn color="success" outlined>
          Texto
          <v-icon right>forum</v-icon>
        </v-btn>

        <v-btn color="success" outlined block>
          Texto
          <v-icon right>forum</v-icon>
        </v-btn>

        <v-btn color="success" outlined block rounded>
          Texto
          <v-icon right>forum</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
