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
                  <table style="display:table;width:100%;border-collapse:collapse">
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);padding:50px">
                      <td style="padding: 15px 5px 15px 15px">HEIGHT</td>
                      <td style="padding:15px;float:right">
                        <router-link
                          @click.native.stop="''"
                          :to="`/block/${block.hash}`"
                        >{{block.height}}</router-link>
                      </td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 15px 5px 15px 15px;">SIZE</td>
                      <td style="padding:15px;float:right">{{block.size}} bytes</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 15px 5px 15px 15px;">TIME</td>
                      <td style="padding:15px;float:right">{{ localtime(block.time) }}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 15px 5px 15px 15px;">MEDIAN TIME</td>
                      <td style="padding:15px;float:right">{{ localtime(block.mediantime) }}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 15px 5px 15px 15px;">MERKLE ROOT</td>
                      <td
                        style="padding:15px;float:right;word-break: break-word;"
                      >{{ block.merkleroot }}</td>
                    </tr>
                  </table>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <table style="display:table;width:100%;border-collapse:collapse">
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 10px 40px 10px 15px;">DIFFICULTY</td>
                      <td
                        style="padding:10px 30px 10px 10px;float:right;word-break: break-word;"
                      >{{ block.difficulty }}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 10px 40px 10px 15px;">BITS</td>
                      <td style="padding:10px 30px 10px 10px;float:right">{{ block.bits }}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                      <td style="padding: 10px 40px 10px 15px;">NONCE</td>
                      <td style="padding:10px 30px 10px 10px;float:right">{{ block.nonce }}</td>
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
                  <span class="mb-5 title">{{block.tx.length}} OF {{block.tx.length}} TRANSACTIONS</span>
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
                      <div class="pa-3" style="background-color:darkgrey;word-break: break-word">
                        {{tx.txid}}
                        <i
                          id="header-expansor"
                          @click="evaluate(x)"
                          :class="eval[x] === 'down' ? 'mdi-chevron-down':'mdi-chevron-up'"
                          aria-hidden="true"
                          class="v-icon notranslate mdi theme--light"
                        ></i>
                      </div>
                      <v-container style="width:100%" class="pa-3">
                        <v-row no-gutters>
                          <!-- vin -->
                          <v-col style="float:left;width:50%">
                            <v-expansion-panel
                              v-for="input in tx.vin"
                              :key="input.sequence"
                              style="padding:0 0 0 0;margin-right:40px;"
                            >
                              <v-expansion-panel-header
                                id="tx-input"
                                v-if="input.coinbase !== null"
                              >COINBASE</v-expansion-panel-header>
                              <v-expansion-panel-header id="tx-input" v-else>
                                <p
                                  style="background-color:lightgoldenrodyellow;padding:5px 5px 5px 20px;margin-bottom:0px"
                                >
                                  <span class="mr-1">#{{input.vout}} -</span>
                                  <span class="mr-1" style="word-break:break-word;">{{input.txid}}</span>
                                </p>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content v-if="input.coinbase !== null">
                                <table style="display:table;width:100%;border-collapse:collapse">
                                  <tr
                                    style="margin-top:10px;border-bottom: 1px solid rgb(223, 227, 235);"
                                  >
                                    <td
                                      style="width:48%;float:left;word-break:break-word;padding:5px;margin-left: 3px;margin-top: 3px;"
                                    >COINBASE</td>
                                    <td
                                      style="float:right;word-break:break-word;margin-bottom: 7px;margin-top: 7px;"
                                    >{{input.coinbase}}</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                                    <td
                                      style="width:48%;float:left;word-break:break-word;padding:5px;margin-left: 3px;margin-top: 3px;"
                                    >SEQUENCE</td>
                                    <td
                                      style="float:right;word-break:break-word;margin-bottom: 7px;margin-top: 7px;"
                                    >{{input.sequence}}</td>
                                  </tr>
                                </table>
                              </v-expansion-panel-content>
                              <v-expansion-panel-content v-else>
                                <table style="display:table;width:100%;border-collapse:collapse">
                                  <tr
                                    style="margin-top:10px;border-bottom: 1px solid rgb(223, 227, 235);"
                                  >
                                    <td
                                      style="width:48%;float:left;padding:5px;margin-left:3px;margin-top:3px;padding-right:20px;"
                                    >SCRIPTSIG (ASM)</td>
                                    <td
                                      style="word-break:break-word;margin-bottom:7px;margin-top:7px;"
                                    >{{input.scriptSig.asm}}</td>
                                  </tr>
                                  <tr
                                    style="margin-top:10px;border-bottom: 1px solid rgb(223, 227, 235);"
                                  >
                                    <td
                                      style="width:48%;float:left;padding:5px;margin-left:3px;margin-top:3px;padding-right:20px;"
                                    >SCRIPTSIG (HEX)</td>
                                    <td
                                      style="word-break:break-word;margin-bottom:7px;margin-top:7px;"
                                    >{{input.scriptSig.hex}}</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                                    <td
                                      style="width:48%;float:left;padding:5px;margin-left:3px;margin-top:3px;padding-right:20px;"
                                    >SEQUENCE</td>
                                    <td
                                      style="word-break:break-word;margin-bottom:7px;margin-top:7px;"
                                    >{{input.sequence}}</td>
                                  </tr>
                                </table>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-col>

                          <!-- vout -->
                          <v-col style="float:right;width:50%">
                            <v-expansion-panel v-for="output in tx.vout" :key="output.n">
                              <v-expansion-panel-header id="tx-output">
                                <p
                                  style="background-color:aliceblue;padding:5px 5px 5px 20px;margin-bottom:0"
                                >
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
                                <table style="display:table;width:100%;border-collapse:collapse">
                                  <tr
                                    style="margin-top:10px;border-bottom: 1px solid rgb(223, 227, 235);"
                                  >
                                    <td
                                      style="width:39%;float:left;word-break:break-word;margin-bottom: 15px;padding:5px;margin-left:3px;margin-top:3px;"
                                    >SCRIPTPUBKEY (ASM)</td>
                                    <td
                                      style="width:60%;float:right;word-break:break-word;margin-bottom:7px;margin-top:7px;"
                                    >{{output.scriptPubKey.asm}}</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid rgb(223, 227, 235);">
                                    <td
                                      style="width:39%;float:left;word-break:break-word;margin-bottom:15px;margin-left:3px;margin-bottom:7px;margin-top:7px;"
                                    >SCRIPTPUBKEY (HEX)</td>
                                    <td
                                      style="width:60%;float:right;word-break:break-word;margin-bottom:7px;margin-top:7px;"
                                    >{{output.scriptPubKey.hex}}</td>
                                  </tr>
                                </table>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-col>
                        </v-row>
                        <v-row no-gutters style="background-color:lightgrey;text-align:right">
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
                            >{{total[x]}} tBTC</v-chip>
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
      items: 5,
      eval: [],
      headerpanel: 1,
      total: []
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
      result({ data }) {
        /*         if (data.getblock === undefined) {
          // this.flashMessage.setStrategy("single");
        } */
        console.log("data from graphql", data);
      },
      error() {
        /*       console.log("ERROR making query", error.message);
        this.errors = JSON.stringify(error.message); */
        this.flashMessage.error({
          // status: "error",
          title: "Block not found",
          message: "Not yet in this bitcoin node",
          position: "bottom right",
          icon: "/error.svg"
        });
        this.$router.push("/");
      }
    }
  },
  created() {
    setTimeout(() => {
      this._emptyPanel();
      this._txtotals();
    }, 500);
  },
  watch: {
    $route() {
      setTimeout(() => {
        this._emptyPanel();
        this._txtotals();
      }, 500);
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
    },
    // Create an array the length of our items
    // with all values as true
    all(x) {
      const newdata = [...Array(this.items).keys()].map((k, i) => i);

      if (this.panel[x] !== undefined) {
        this.panel.splice(x, 1, newdata);
      } else {
        this.panel.push(newdata);
      }
    },
    // Reset the panel
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
    },
    _txtotals() {
      this.block.tx.map((tx, k) => {
        // console.log("txa", tx);
        tx.vout.map(v => (this.total[k] += v.value));
      });
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
</style>
