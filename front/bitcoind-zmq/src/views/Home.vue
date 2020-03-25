<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <!-- <div v-if="$apollo.queries.todos.loading">Loading...</div> -->
        <div v-if="error">{{ error }}</div>
        <div class="home">
          <!-- LISTADO DE BLOQUES {{ block }} -->
          <span>BLOQUES EN TIEMPO REAL</span>
          <ul v-for="(block) in rtblocks" :key="block.id">
            <li>
              <a href="#/block.hash">#{{ block.height }}</a>
            </li>
            <li>+{{ block.confirmations }} confirmations</li>
            <li>{{ JSON.parse(block.tx).length }} transactions</li>
            <li>{{ block.size }} bits</li>
            <li>{{ block.time }}</li>
          </ul>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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
      error: null
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
          // console.log('data', data)
          this.rtblocks = data.data.block;
        }
      }
    }
  }
};
</script>
