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
      <v-data-table :headers="headers" :items="rtblocks"></v-data-table>
    </v-card>
  </div>
</template>

<script>
/* export default {
  name: "About",
  data() {
    return {
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ]
    };
  }
}; */
</script>

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
          hash: "Dessert (100g serving)",
          align: "start",
          // sortable: false,
          value: "hash"
        },
        { text: "Length", value: "height" },
        { text: "Confirmations", value: "confirmations" },
        { text: "Transactions", value: 1 },
        { text: "Bits", value: "size" },
        { text: "Time", value: "time" }
      ],
      rtblocks: []
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
