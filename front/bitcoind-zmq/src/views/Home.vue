<template>
  <v-content>
    <v-container class="fill-height" fluid>
      Home content
      <router-link :to="{ name: 'Home' }">Home</router-link>
    </v-container>
  </v-content>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>
