<template>
  <div>
    <p class="ma-5">Block #{{ block.height }}</p>
    <v-container class="grey lighten-5">
      <v-row class="xs-12" justify="center" no-gutters>
        <v-col>
          <v-card class="pa-2" outlined tile>
            <p>Hash: {{ block.hash }}</p>
            <p>Confirmations: {{ block.confirmations }}</p>
            <p>Height: #{{ block.height }}</p>
            <p>Size: {{ block.size }} bytes</p>
            <p>Time: {{ block.time }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!--     <p class="ma-5">Block #{{ block.height }} transactions</p>
    <v-container class="grey lighten-5">
      <v-row class="xs-12" justify="center" no-gutters>
        <v-col>
          <p>Hash: hhhhhh</p>
          <p>Confirmations: 10</p>
          <p>Height: #3</p>
          <p>Size: 30 bytes</p>
          <p>Time: 1234567</p>
        </v-col>
      </v-row>
    </v-container>-->
  </div>
</template>

<script>
import gql from "graphql-tag";
const MY_QUERY = gql`
  query MyQuery($hash: String) {
    getblock(hash: $hash) {
      hash
      height
      confirmations
      size
      time
    }
  }
`;
export default {
  data() {
    return {
      block: {}
    };
  },
  apollo: {
    block: {
      query: MY_QUERY,
      variables() {
        return {
          hash: this.$route.params.hash
        };
      },
      update: data => data.getblock,
      error(error) {
        this.error = JSON.stringify(error.message);
      }
    }
  }
};
</script>
