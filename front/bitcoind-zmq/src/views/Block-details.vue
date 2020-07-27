<template>
  <div class="mt-5" v-if="!$apollo.queries.block.loading">
    <v-icon class="bd-icon-btc">mdi-bitcoin</v-icon>
    <span class="mb-1 display-2" style="line-height:1">Block {{ block.height }}</span>
    <p style="border-bottom: 1px solid black;">
      <span class="body-2" style="word-break: break-word">{{block.hash}}</span>
      <span>
        <v-icon class="bd-icon-copy">mdi-content-copy</v-icon>
      </span>
    </p>
    <v-container>
      <v-row no-gutters>
        <v-layout row>
          <v-btn
            color="primary"
            dark
            @click="_emptyPanel()"
            :to="`/block/${block.previousblockhash}`"
          >
            <v-icon small dark left>mdi-arrow-left</v-icon>PREVIOUS
          </v-btn>
          <v-flex xs12>
            <v-expansion-panels v-model="headerpanel">
              <v-expansion-panel>
                <v-expansion-panel-header id="header">
                  <table id="table1">
                    <tr style="padding:50px">
                      <td>HEIGHT</td>
                      <td style>
                        <router-link
                          @click.native.stop="''"
                          :to="`/block/${block.hash}`"
                        >{{block.height}}</router-link>
                      </td>
                    </tr>
                    <tr>
                      <td>SIZE</td>
                      <td>{{block.size}} bytes</td>
                    </tr>
                    <tr>
                      <td>TIME</td>
                      <td>{{ localtime(block.time) }}</td>
                    </tr>
                    <tr>
                      <td>MEDIAN TIME</td>
                      <td>{{ localtime(block.mediantime) }}</td>
                    </tr>
                    <tr>
                      <td>MERKLE ROOT</td>
                      <td style="word-break: break-word;">{{ block.merkleroot }}</td>
                    </tr>
                  </table>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <table id="table2">
                    <tr>
                      <td>DIFFICULTY</td>
                      <td style="word-break: break-word">{{ block.difficulty }}</td>
                    </tr>
                    <tr>
                      <td>BITS</td>
                      <td>{{ block.bits }}</td>
                    </tr>
                    <tr>
                      <td>NONCE</td>
                      <td>{{ block.nonce }}</td>
                    </tr>
                  </table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>

    <v-container>
      <v-row no-gutters>
        <v-layout row>
          <v-flex xs12>
            <v-container>
              <v-row no-gutters>
                <v-col class="mb-5">
                  <span class="mb-5 title">{{ dinamictotaltx }} OF {{block.totaltx}} TRANSACTIONS</span>
                </v-col>
              </v-row>
              <v-container
                class="grey lighten-5"
                style="margin-top:-15px"
                v-for="(tx,x) in block.tx"
                :key="tx.txid"
              >
                <v-expansion-panels v-model="panel[x]" multiple>
                  <v-row no-gutters style="background-color:lightgrey">
                    <v-col>
                      <div class="pa-3" id="nocoinbase-header">
                        <router-link @click.native.stop="''" :to="`/tx/${tx.txid}`">{{tx.txid}}</router-link>
                        <i
                          id="header-expansor"
                          @click="evaluate(x)"
                          :class="eval[x] === 'down' ? 'mdi-chevron-down':'mdi-chevron-up'"
                          aria-hidden="true"
                          class="v-icon notranslate mdi theme--light"
                        ></i>
                      </div>
                      <v-container style="width:100%" class="pa-3">
                        <v-row>
                          <!-- vin -->
                          <v-col>
                            <v-expansion-panel
                              v-for="(input,k) in tx.vin"
                              :key="k"
                              class="every-tx"
                            >
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
                              <v-icon left>mdi-checkbox-marked-circle</v-icon>
                              {{block.confirmations}} CONFIRMATIONS
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
              </v-container>
            </v-container>
          </v-flex>
        </v-layout>
        <v-pagination
          :length="length"
          v-model="pagination"
          @input="next"
          :total-visible="7"
          v-if="length > 1"
        ></v-pagination>
      </v-row>
    </v-container>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import gql from "graphql-tag";
const MY_QUERY = gql`
  query MyQuery($hash: String, $first: Int, $skip: Int) {
    getblock(hash: $hash, first: $first, skip: $skip) {
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
      totaltx
      tx {
        hash
        totalamount
        hex
        locktime
        size
        txid
        version
        vsize
        weight
        vin {
          sequence
          txinwitness
          coinbase
          txid
          vout
          scriptSig {
            asm
            hex
          }
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
      block: {},
      panel: [],
      eval: [],
      headerpanel: 1,
      pagination: 1,
      length: 0
    };
  },
  apollo: {
    block: {
      query: MY_QUERY,
      variables() {
        return {
          hash: this.$route.params.hash,
          first: 0,
          skip: 10
        };
      },
      update: data => data.getblock,
      result({ data }) {
        console.log("data from graphql", data);
        this.length = Math.ceil(data.getblock.totaltx / 10);
      },
      error(err) {
        let message = err;

        console.log("ERROR", err);

        if (
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
        this.$router.push("/");
      }
    }
  },
  created() {
    setTimeout(() => {
      this._emptyPanel();
    }, 500);
  },
  watch: {
    $route() {
      setTimeout(() => {
        this._emptyPanel();
        this.pagination = 1;
      }, 500);
    }
  },
  computed: {
    dinamictotaltx() {
      const total = this.pagination * 10;

      if (total >= this.block.totaltx) {
        return this.block.totaltx;
      }
      return total;
    }
  },
  methods: {
    next(page) {
      console.log("next", 10 * (page - 1), 10 * page);

      const vm = this;
      vm.isLoading = true;
      vm.$apolloProvider.defaultClient
        .query({
          query: MY_QUERY,
          variables: {
            hash: this.$route.params.hash,
            first: 10 * (page - 1),
            skip: 10 * page
          }
        })
        .then(res => {
          console.log("RESPUESTA", res);
          setTimeout(() => {
            this._emptyPanel();
          }, 100);

          vm.block = res.data.getblock;
          vm.isLoading = res.data.loading;
        });
    },
    emit() {
      this.$emit("errorOnRouter", true);
    },
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
    },
    all(x) {
      const total = this.block.tx[x].vin.length + this.block.tx[x].vout.length;
      const newdata = [...Array(total).keys()].map((k, i) => i);

      if (this.panel[x] !== undefined) {
        this.panel.splice(x, 1, newdata);
      } else {
        this.panel.push(newdata);
      }
    },
    none(x) {
      this.panel.splice(x, 1, []);
    },
    evaluate(x) {
      if (this.eval[x] === "down") {
        this.eval[x] = "up";
        this.all(x);
      } else {
        this.eval[x] = "down";
        this.none(x);
      }
    },
    _emptyPanel() {
      this.panel = new Array(this.block.tx.length).fill(0);
      this.eval = new Array(this.block.tx.length).fill("down");
      this.total = new Array(this.block.tx.length).fill(0);
      this.headerpanel = 1;
    }
  }
};
</script>
<style>
#header
  div.v-expansion-panel-header__icon
  i.v-icon.notranslate.mdi.mdi-chevron-down.theme--light {
  top: -195px;
  position: relative;
}
.v-expansion-panel::before {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
.v-expansion-panel-header {
  padding: 0 !important;
  font-size: 1em !important;
}
button#tx-input.v-expansion-panel-header {
  background-color: lightgoldenrodyellow !important;
  /*padding-left: 7px !important;*/
}
button#tx-output.v-expansion-panel-header {
  background-color: aliceblue !important;
}
.v-expansion-panel-content__wrap {
  padding: 0 10px 10px 0 !important;
}
#header-expansor {
  float: right;
  cursor: pointer;
}
/* body {
  counter-reset: txcnt;
}
.v-application .mr-1::before {
  content: "#" counter(txcnt) "- ";
  counter-increment: txcnt;
} */
#table1,
#table2,
#inputcollasecoinbase,
#outputcollase1,
#outputcollase2 {
  display: table !important;
  width: 100% !important;
  border-collapse: collapse !important;
}
#table1 tr,
#table2 tr,
#inputcollasecoinbase tr,
#outputcollase1 tr,
#outputcollase2 tr {
  border-bottom: 1px solid rgb(223, 227, 235) !important;
}
#table1 tr td:nth-child(1) {
  padding: 15px 5px 15px 15px !important;
}
#table2 tr td:nth-child(1) {
  padding: 10px 40px 10px 15px !important;
}
#table1 tr td:nth-child(2) {
  padding: 15px !important;
  float: right !important;
}
#table2 tr td:nth-child(2) {
  padding: 10px 30px 10px 50px !important;
  float: right !important;
}
#inputcollasecoinbase tr td:nth-child(2),
#outputcollase1 tr td:nth-child(2),
#outputcollase2 tr td:nth-child(2) {
  word-break: break-word !important;
  margin: 7px !important;
}
#outputcollase2 tr td:nth-child(1) {
  word-break: break-word !important;
  margin-bottom: 15px !important;
  margin-left: 10px !important;
  padding: 5px !important;
  margin: 3px !important;
  font-weight: 300 !important;
  min-width: 69px !important;
}
#outputcollase1 tr td:nth-child(1),
#inputcollasecoinbase tr td:nth-child(1) {
  padding: 5px !important;
  margin-left: 3px !important;
  margin-top: 3px !important;
  font-weight: 300 !important;
}
.bd-pr-20 {
  padding-right: 20px;
}
#coinbase-header {
  background-color: lightgoldenrodyellow !important;
  padding: 5px 5px 5px 20px !important;
  margin-bottom: 0px !important;
}
#tx-output-header {
  background-color: aliceblue !important;
  padding: 5px 5px 5px 20px !important;
  margin-bottom: 0 !important;
}
#extradata-header {
  background-color: lightgrey !important;
  text-align: right !important;
}

#nocoinbase-header {
  background-color: darkgrey !important;
  word-break: break-word !important;
}
.every-tx {
  padding: 0 0 0 0 !important;
  margin-right: 40px !important;
}
.bd-icon-copy {
  font-size: 14px !important;
  color: red !important;
  margin-left: 10px !important;
  margin-top: -2px !important;
}
.bd-icon-btc {
  font-size: 44px !important;
  color: red !important;
  margin-top: -23px !important;
  margin-right: 10px !important;
}

@media only screen and (max-width: 1020px) {
  #header,
  #table2 {
    width: 98.5% !important;
  }
  #table2 tr td:nth-child(2) {
    padding: 10px 20px 10px 10px !important;
    float: right !important;
  }
  .v-content {
    margin: 0 2px 0 2px !important;
  }
  #inputcollasecoinbase tr {
    display: grid;
  }
  #inputcollasecoinbase tr td:nth-child(1) {
    border-bottom: 1px solid rgb(223, 227, 235);
  }
  #inputcollasecoinbase tr td {
    text-align: center;
  }
  #outputcollase1 tr,
  #outputcollase2 tr {
    display: grid;
  }
  #outputcollase1 tr td,
  #outputcollase2 tr td {
    text-align: center;
  }
  #outputcollase1 tr td:nth-child(1),
  #outputcollase2 tr td:nth-child(1) {
    border-bottom: 1px solid rgb(223, 227, 235);
  }
  .v-expansion-panel {
    margin-right: 5px !important;
  }

  #header.v-expansion-panel-header table tr td:nth-child(2) {
    padding-right: 0px !important;
  }
  #header .v-container {
    padding: 5px !important;
  }
  .v-col {
    display: none;
    width: 100%;
  }
}

@media only screen and (max-width: 360px) {
  div.container.pa-3 {
    width: 84% !important;
    /* padding: 0 40px 0 40px !important; */
  }
}
</style>
