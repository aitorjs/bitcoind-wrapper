<template>
  <div>
    <!-- <div v-if="$apollo.queries.todos.loading">Loading...</div> -->
    <div v-if="error">{{ error }}</div>
    <div class="home">
      <!-- LISTADO DE BLOQUES {{ block }} -->
      <span>BLOQUES EN TIEMPO REAL</span>
      <ul>
        <li v-for="(block, index) in rtblocks" :key="block.id">{{ index }} {{ block.hash }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { subscribe } from "graphql";

const MY_SUBSCRIPTION = gql`
  subscription getNewBlocks {
    block {
      id
      hash
    }
  }
`;

const MY_QUERY = gql`
  query MyQuery {
    block {
      id
      hash
    }
  }
`;

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
    block: {
      query: MY_QUERY,
      error(error) {
        this.error = JSON.stringify(error.message);
      }
    },
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
