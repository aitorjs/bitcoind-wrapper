// const ELECTRS_API_URL = "https://www.blockstream.info/testnet/api";
// const ELECTRS_API_URL = "http://localhost:50001";

global.net = require('net');
global.tls = require('tls');

var dotenv = require("dotenv");
var fs = require('fs');
var path = require('path');
var os = require('os');
// var utils = require('./utils');

var configPaths = [path.join(os.homedir(), '.config', 'btc-rpc-explorer.env'), path.join(process.cwd(), '.env')];
configPaths.filter(fs.existsSync).forEach(path => {
  console.log('Loading env file:', path);
  dotenv.config({ path });
});

var electrumAddressApi = require("./electrumAddressApi.js");

const main = async () => {
  electrumAddressApi.connectToServers().then(async function () {

    const address = "2N1rjhumXA3ephUQTDMfGhufxGQPZuZUTMk"

    // TODO: Sacar este dato desde el RPC asi:
    // bitcoin-cli getaddressinfo "2N1rjhumXA3ephUQTDMfGhufxGQPZuZUTMk"
    const scriptPubkey = "a9145e785f3cb8254f81d3fdfa14e69d3b9bbe95ea6787"

    const a = await getAddressDetails(address, scriptPubkey)
    console.log('RESULT', a);
  }).catch(function (err) {
    console.log("31207ugf4e0fed", err);
  });
}

function getAddressDetails(address, scriptPubkey, sort, limit = 10, offset = 0) {
  return new Promise(function (resolve, reject) {
    var promises = [];

    promises.push(electrumAddressApi.getAddressDetails(address, scriptPubkey, sort, limit, offset));

    promises.push(new Promise(function (resolve, reject) {
      resolve({ addressDetails: null, errors: ["No address API configured"] });
    }));

    Promise.all(promises).then(function (results) {
      if (results && results.length > 0) {
        resolve(results[0]);

      } else {
        resolve(null);
      }
    }).catch(function (err) {
      reject(err);
    });
  });
}

main()
