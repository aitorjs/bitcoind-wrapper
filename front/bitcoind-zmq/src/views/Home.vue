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
  }
};
</script>
