<template>
  <div class="mt-5" v-if="!$apollo.queries.tx.loading">
    <v-icon class="bd-icon-btc">mdi-bitcoin</v-icon>
    <span class="mb-1 display-2" style="line-height:1">Transaction XXXXX</span>
    <p style="border-bottom: 1px solid black;">
      <span class="body-2" style="word-break: break-word">{{tx.hash}}</span>
      <span>
        <v-icon class="bd-icon-copy">mdi-content-copy</v-icon>
      </span>
    </p>
    <v-container>
      <v-row no-gutters>
        <v-layout row>
          <v-flex xs12>
            <v-expansion-panels multiple>
              <v-row no-gutters style="background-color:lightgrey">
                <v-col>
                  <div class="pa-3" id="nocoinbase-header">
                    <router-link @click.native.stop="''" :to="`/tx/${tx.txid}`">{{tx.txid}}</router-link>
                    <i id="header-expansor" aria-hidden="true" class="mdi-chevron-down"></i>
                  </div>
                  <v-container style="width:100%" class="pa-3">
                    <v-row>
                      <!-- vin-->
                      <v-col>
                        <v-expansion-panel v-for="(input,k) in tx.vin" :key="k" class="every-tx">
                          <v-expansion-panel-header
                            id="tx-input"
                            v-if="input.coinbase !== null"
                          >COINBASE</v-expansion-panel-header>
                          <v-expansion-panel-header id="tx-input" v-else>
                            <p id="coinbase-header">
                              <span class="mr-1">#{{k}} -</span>
                              <span class="mr-1" style="word-break:break-word;">{{input.txid}}</span>
                            </p>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content v-if="input.coinbase !== null">
                            <table id="inputcollasecoinbase">
                              <tr style="margin-top:10px;">
                                <td style="word-break:break-word;">COINBASE</td>
                                <td>{{input.coinbase}}</td>
                              </tr>
                              <tr>
                                <td style="word-break:break-word;">SEQUENCE</td>
                                <td>{{input.sequence}}</td>
                              </tr>
                            </table>
                          </v-expansion-panel-content>
                          <v-expansion-panel-content v-else>
                            <table id="outputcollase1">
                              <tr>
                                <td class="bd-pr-20">SCRIPTSIG (ASM)</td>
                                <td>{{input.scriptSig.asm}}</td>
                              </tr>
                              <tr>
                                <td class="bd-pr-20">SCRIPTSIG (HEX)</td>
                                <td>{{input.scriptSig.hex}}</td>
                              </tr>
                              <tr>
                                <td class="bd-pr-20">SEQUENCE</td>
                                <td>{{input.sequence}}</td>
                              </tr>
                            </table>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-col>

                      <!-- vout -->
                      <v-col>
                        <v-expansion-panel v-for="output in tx.vout" :key="output.n">
                          <v-expansion-panel-header id="tx-output">
                            <p id="tx-output-header">
                              <span class="mr-1">#{{output.n}} -</span>
                              <span
                                class="mr-1"
                                v-if="output.scriptPubKey.addresses === null"
                              >OP_RETURN -</span>
                              <span v-else>
                                <span
                                  v-for="address in output.scriptPubKey.addresses"
                                  :key="address"
                                  style="word-break:break-word"
                                >{{address}} -</span>
                              </span>
                              <span>{{output.value}} tBTC</span>
                            </p>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <table id="outputcollase2">
                              <tr>
                                <td>SCRIPTPUBKEY (ASM)</td>
                                <td>{{output.scriptPubKey.asm}}</td>
                              </tr>
                              <tr>
                                <td>SCRIPTPUBKEY (HEX)</td>
                                <td>{{output.scriptPubKey.hex}}</td>
                              </tr>
                            </table>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-col>
                    </v-row>
                    <v-row no-gutters id="extradata-header">
                      <v-col>
                        <v-chip class="ma-2" color="grey" label text-color="white">
                          <v-icon left>mdi-checkbox-marked-circle</v-icon>##### CONFIRMATIONS
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          color="grey"
                          label
                          text-color="white"
                        >{{tx.totalamount}} tBTC</v-chip>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-expansion-panels>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
const MY_QUERY = gql`
  query MyQuery($txid: String!) {
    gettransaction(txid: $txid) {
      hash
      hex
      locktime
      size
      totalamount
      txid
      version
      vin {
        coinbase
        scriptSig {
          asm
          hex
        }
        sequence
        txid
        txinwitness
        vout
      }
      vout {
        n
        scriptPubKey {
          addresses
          asm
          hex
          reqSigs
          type
        }
        value
      }
      vsize
      weight
    }
  }
`;
export default {
  data() {
    return {
      tx: {}
    };
  },
  apollo: {
    tx: {
      query: MY_QUERY,
      variables() {
        return {
          txid: this.$route.params.txid
        };
      },
      update: data => data.gettransaction,
      result({ data }) {
        console.log("data from graphql", data);
        // this.length = Math.ceil(data.getblock.totaltx / 10);
      },
      error(err) {
        let message = err;

        console.log("ERROR", err, message);

        /*  if (
          err
            .toString()
            .includes(
              "Cannot return null for non-nullable field Query.getblock."
            )
        ) {
          message = "Block not found";
        }
        this.$emit("error", {
          status: true,
          message,
          color: "red"
        });
        this.$router.push("/"); */
      }
    }
  }
};
</script>

<style>
</style>
