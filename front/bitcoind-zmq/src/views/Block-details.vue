<template>
  <div class="mt-5">
    <v-icon
      style="font-size:44px;color:red;margin-top:-17px !important;margin-right:10px"
    >mdi-bitcoin</v-icon>
    <span class="mb-1 display-2" style="line-height:1">Block #{{ block.height }}</span>
    <hr class="mb-5" />
    <v-container>
      <v-row class="xl-9" justify="center" no-gutters>
        <v-layout row>
          <v-flex xs12 md8>
            <table style="display:table;table-layout:fixed;width:100%;">
              <tr>
                <td style="padding-right:40px">Hash</td>
                <td>{{block.hash}}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">Confirmations</td>
                <td>{{block.confirmations}}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">Height</td>
                <td>#{{block.height}}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">Size</td>
                <td>{{block.size}} bytes</td>
              </tr>
              <tr>
                <td style="padding-right:40px">Time</td>
                <td>{{ localtime(block.time) }}</td>
              </tr>
              <tr>
                <td style="padding-top: 5%">
                  <span class="mb-3" style="line-height:1;">Transactions</span>
                  <hr />
                </td>
              </tr>
              <tr>
                <td>
                  <v-row class="xs-12" justify="center" no-gutters>
                    <v-layout row>
                      <v-flex xs12 class="mt-2" style="margin-left:20px">DATA</v-flex>
                    </v-layout>
                  </v-row>
                </td>
              </tr>
            </table>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
    <!--
    <v-container class="grey lighten-5">
      <p class="mb-1" style="line-height:1">Transactions</p>
      <hr />
      <v-row class="xs-12" justify="center" no-gutters>
        <v-layout row>
          <v-flex xs12 class="mt-5">DATA</v-flex>
        </v-layout>
      </v-row>
    </v-container>-->

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
  },
  methods: {
    localtime: time => {
      if (!time) return null;

      console.log("date", time);
      const date = new Date(time * 1000);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "Europe/Madrid"
      };

      return new Intl.DateTimeFormat(undefined, options).format(date);
    }
  }
};
</script>
