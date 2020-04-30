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
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import gql from "graphql-tag";

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
        /* {
          text: "Dessert (100g serving)",
          align: "start",
          // sortable: false,
          value: "hash"
        }, */
        {
          text: "Height",
          align: "start",
          // sortable: false,
          value: "height"
        },
        { text: "Confirmations", value: "confirmations" },
        { text: "Transactions", value: 1 },
        { text: "Bits", value: "size" },
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
  }
};
</script>
