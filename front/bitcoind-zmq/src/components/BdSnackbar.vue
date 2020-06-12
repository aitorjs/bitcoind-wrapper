<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout">
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
      timeout: 3000
    };
  },
  methods: {
    deactive() {
      console.log("deactive");

      // this.snackbar = false;
      this.$emit("close", false);
    }
  },
  watch: {
    active(newV, oldV) {
      console.log("snackbar cambiaa de", oldV, newV);
      this.snackbar = newV;
    },
    snackbar(newV, oldV) {
      // when is not closed, autoclose
      console.log("snackbar", newV, oldV);
      if (newV === false && oldV === true) {
        this.$emit("close", false);
      }
    }
  },
  destroy() {
    console.log("agur");
  }
};
</script>

<style>
</style>
