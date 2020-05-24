<template>
  <div class="about">
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

      <v-data-table :headers="headers" :items="rtblocks" sortBy="height" :sortDesc="true">
        <template v-slot:item.height="{ item }">
          <a :href="'#/hash/' + item.hash">{{item.height}}</a>
        </template>
        <template v-slot:item.tx="{ item }">
          <p>{{ JSON.parse(item.tx).length }}</p>
        </template>
        <template v-slot:item.time="{ item }">
          <!-- <p>{{ timeformat(item) }}</p> -->

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <!-- <v-btn color="primary" dark v-on="on">{{ timeformat(item) }}</v-btn> -->
              <p v-on="on">{{ timeformat(item) }}</p>
            </template>
            <span>{{ item.time }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </div>
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
  methods: {
    timeformat: function(block) {
      return format(block.time);
    }
  }
};
</script>
