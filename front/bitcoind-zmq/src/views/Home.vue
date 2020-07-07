<template>
  <div class="home" v-if="!$apollo.subscriptions.newBlocks.loading">
    <v-card>
      <v-card-title>
        Blocks in real time
        <v-spacer></v-spacer>
        <!-- <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>-->
      </v-card-title>

      <v-data-table :headers="headers" :items="rtblocks" sortBy="time" :sortDesc="true">
        <template v-slot:item.height="{ item }">
          <router-link :to="`/block/${item.hash}`">{{item.height}}</router-link>
        </template>
        <template v-slot:item.tx="{ item }">
          <p>{{ JSON.parse(item.tx).length }}</p>
        </template>
        <template v-slot:item.time="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <p v-on="on">{{ timeago(item.time) }}</p>
            </template>
            <span>{{ localtime(item.time) }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import gql from "graphql-tag";
import { format } from "timeago.js";

const MY_SUBSCRIPTION = gql`
  subscription getNewBlocks {
    block {
      hash
      bits
      confirmations
      difficulty
      height
      mediantime
      merkleroot
      nonce
      previousblockhash
      size
      time
      tx
      version
    }
  }
`;

/* const MY_QUERY = gql`
  query MyQuery {
    block {
      id
      hash
    }
  }` */

export default {
  name: "Home",
  data() {
    return {
      blocks: [],
      rtblocks: [],
      error: null,
      headers: [
        {
          text: "Height",
          // sortable: false,
          value: "height"
        },
        // { text: "Confirms", value: "confirmations" },
        { text: "TXs", value: "tx" },
        { text: "Size", value: "size" },
        { text: "Time", value: "time" }
      ]
    };
  },
  apollo: {
    /* block: {
      query: MY_QUERY,
      error (error) {
        this.error = JSON.stringify(error.message)
      }
    }, */
    $subscribe: {
      newBlocks: {
        query: MY_SUBSCRIPTION,
        result(data) {
          console.log("data", data);
          this.rtblocks = data.data.block;
        }
      }
    }
  },
  mounted() {
    console.log(this.$apollo);
  },
  methods: {
    timeago: time => {
      return format(time);
    },
    localtime: time => {
      const date = new Date(time);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
        // hour12: false,
        // timeZone: "Europe/Madrid"
      };

      return new Intl.DateTimeFormat(undefined, options).format(date);
    }
  }
};
</script>
