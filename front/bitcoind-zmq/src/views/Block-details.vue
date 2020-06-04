<template>
  <div class="mt-5">
    <v-icon style="font-size:44px;color:red;margin-top:-23px;margin-right:10px">mdi-bitcoin</v-icon>
    <span class="mb-1 display-2" style="line-height:1">Block {{ block.height }}</span>
    <p style="border-bottom: 1px solid black;">
      <span class="body-2">{{block.hash}}</span>
      <span>
        <v-icon style="font-size:14px;color:red;margin-left:10px;margin-top:-2px">mdi-content-copy</v-icon>
      </span>
    </p>

    <v-container>
      <v-row class="xl-9" justify="center" no-gutters>
        <v-layout row>
          <v-flex xs12>
            <table style="display:table;table-layout:fixed;width:100%">
              <tr>
                <td style="padding-right:40px">HEIGHT</td>
                <td style="float:right">{{block.height}}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">SIZE</td>
                <td style="float:right">{{block.size}} bytes</td>
              </tr>
              <tr>
                <td style="padding-right:40px">TIME</td>
                <td style="float:right">{{ localtime(block.time) }}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">MEDIAN TIME</td>
                <td style="float:right">{{ localtime(block.mediantime) }}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">MERKLE ROOT</td>
                <td style="float:right">{{ block.merkleroot }}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">PREVIOUS BLOCK HASH</td>
                <td style="float:right">{{ block.previousblockhash }}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">DIFFICULTY</td>
                <td style="float:right">{{ block.difficulty }}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">BITS</td>
                <td style="float:right">{{ block.bits }}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">NONCE</td>
                <td style="float:right">{{ block.nonce }}</td>
              </tr>
              <tr>
                <td style="padding-right:40px">CONFIRMATIONS</td>
                <td style="float:right">{{block.confirmations}}</td>
              </tr>
            </table>

            <v-container class="grey lighten-5" style="margin-top:20px">
              <v-row no-gutters>
                <v-col class="mb-5">
                  <span class="mb-5 title">{{block.tx.length}} OF {{block.tx.length}} TRANSACTIONS</span>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col v-for="tx in block.tx" :key="tx.txid" style="background-color:lightgrey">
                  <div class="pa-3" style="background-color:darkgrey">{{tx.txid}}</div>
                  <v-container style="width:100%" class="pa-3">
                    <v-row no-gutters>
                      <!-- vin -->
                      <v-col style="float:left;width:50%">
                        <div
                          v-for="input in tx.vin"
                          :key="input.sequence"
                          style="background-color:lightgoldenrodyellow;padding:5px 5px 5px 20px;margin-right:40px;"
                        >COINBASE</div>
                      </v-col>

                      <!-- vout -->
                      <v-col style="float:right;width:50%">
                        <div v-for="output in tx.vout" :key="output.n">
                          <p style="background-color:aliceblue;padding:5px 5px 5px 20px;">
                            <span>#{{output.n}} -</span>
                            <span v-if="output.scriptPubKey.addresses === null">OP_RETURN -</span>
                            <span v-else>
                              <span
                                v-for="address in output.scriptPubKey.addresses"
                                :key="address"
                              >{{address}} -</span>
                            </span>
                            <span>{{output.value}} BTC</span>
                          </p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
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
      difficulty
      mediantime
      merkleroot
      nonce
      previousblockhash
      bits
      tx {
        hash
        hex
        locktime
        size
        txid
        version
        vsize
        weight
        vin {
          coinbase
          sequence
        }
        vout {
          n
          scriptPubKey {
            addresses
            asm
            hex
            type
            reqSigs
          }
          value
        }
      }
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
