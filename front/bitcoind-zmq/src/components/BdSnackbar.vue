<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
      {{ text }}
      <v-btn dark text @click.native="deactive()">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "bdSnackbar",
  props: ["active"],
  data() {
    return {
      snackbar: false,
      text: "ERROR",
      timeout: 3000,
      color: null
    };
  },
  methods: {
    deactive() {
      this.$emit("close", false);
    }
  },
  watch: {
    active(newV, oldV) {
      console.log("snackbar cambiaa de", oldV, newV);
      this.snackbar = newV.status;
      this.text = newV.message;
      this.color = newV.color;
    },
    snackbar(newV) {
      // when is not closed by user, autoclose
      if (!newV) {
        this.$emit("close", false);
      }
    }
  }
};
</script>

<style>
</style>
