<template>
  <div class="mt-5">
    <v-icon style="font-size:44px;color:red;margin-top:-23px;margin-right:10px">mdi-bitcoin</v-icon>
    <span class="mb-1 display-2" style="line-height:1">Block {{ block.height }}</span>
    <p style="border-bottom: 1px solid black;">
      <span class="body-2" style="word-break: break-word">{{block.hash}}</span>
      <span>
        <v-icon style="font-size:14px;color:red;margin-left:10px;margin-top:-2px">mdi-content-copy</v-icon>
      </span>
    </p>
    <v-container>
      <v-row no-gutters>
        <v-layout row>
          <v-flex xs12>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <table style="display:table;width:100%;border-collapse:collapse">
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);padding:50px">
                      <td style="padding: 15px 40px 15px 10px;">HEIGHT</td>
                      <td style="padding:15px;float:right">{{block.height}}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 15px 40px 15px 10px;">SIZE</td>
                      <td style="padding:15px;float:right">{{block.size}} bytes</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 15px 40px 15px 10px;">TIME</td>
                      <td style="padding:15px;float:right">{{ localtime(block.time) }}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 15px 40px 15px 10px;">MEDIAN TIME</td>
                      <td style="padding:15px;float:right">{{ localtime(block.mediantime) }}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 15px 40px 15px 10px;">MERKLE ROOT</td>
                      <td
                        style="padding:15px;float:right;word-break: break-word;"
                      >{{ block.merkleroot }}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);padding:50px">
                      <td style="padding: 15px 40px 15px 10px;">PREVIOUS BLOCK HASH</td>
                      <td
                        style="padding:15px;float:right;word-break: break-word;"
                      >{{ block.previousblockhash }}</td>
                    </tr>
                  </table>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <table style="display:table;width:101%;border-collapse:collapse">
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 10px 40px 10px 10px;">DIFFICULTY</td>
                      <td
                        style="padding:10px;float:right;word-break: break-word;"
                      >{{ block.difficulty }}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 10px 40px 10px 10px;">BITS</td>
                      <td style="padding:10px;float:right">{{ block.bits }}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 10px 40px 10px 10px;">NONCE</td>
                      <td style="padding:10px;float:right">{{ block.nonce }}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 10px 40px 10px 10px;">CONFIRMATIONS</td>
                      <td style="padding:10px;float:right">{{block.confirmations}}</td>
                    </tr>
                  </table>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!--   <v-expansion-panel>
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
              </v-expansion-panel>-->
            </v-expansion-panels>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
    <v-container>
      <v-row no-gutters>
        <v-layout row>
          <v-flex xs12>
            <v-container class="grey lighten-5" style="margin-top:-15px">
              <v-row no-gutters>
                <v-col class="mb-5">
                  <span class="mb-5 title">{{block.tx.length}} OF {{block.tx.length}} TRANSACTIONS</span>
                </v-col>
              </v-row>
              <v-row no-gutters v-for="tx in block.tx" :key="tx.txid">
                <v-col style="background-color:lightgrey">
                  <div
                    class="pa-3"
                    style="background-color:darkgrey;word-break: break-word"
                  >{{tx.txid}}</div>
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
                          <p
                            style="background-color:aliceblue;padding:5px 5px 5px 20px;margin-bottom:10px"
                          >
                            <span>#{{output.n}} -</span>
                            <span v-if="output.scriptPubKey.addresses === null">OP_RETURN -</span>
                            <span v-else>
                              <span
                                v-for="address in output.scriptPubKey.addresses"
                                :key="address"
                                style="word-break: break-word"
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
<style>
.v-application--is-ltr .v-expansion-panel-header__icon {
  margin-top: -369px !important;
  width: 1% !important;
}
.v-expansion-panel::before {
  border-radius: none;
  box-shadow: none !important;
  -webkit-box-shadow: none;
}
.v-expansion-panel-header {
  padding: 0 !important;
  font-size: 1em !important;
}
.v-expansion-panel-content__wrap {
  padding: 0 25px 16px 0 !important;
}
</style>
