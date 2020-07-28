// const ELECTRS_API_URL = "https://www.blockstream.info/testnet/api";
/*const ELECTRS_API_URL = "http://localhost:50001";
const request = require("request");

request(ELECTRS_API_URL + '/mempool', { json: true, timeout: 10000 }, (err, res, resp) => {
  if (err) { */
    /* reject(err); */
    /* console.log("error", err);
  } else if (res.statusCode !== 200) {
    /* reject(response); */
    /* console.log("no resp", res);
  } else {
    if (typeof resp.count !== 'number') {
      /* reject('Empty data'); */
      /* console.log("empty data")
      return;
    }
    /* resolve({
      size: response.count,
      bytes: response.vsize,
    }); */
    /* console.log("resp", resp);
  }
}); */

global.net = require('net');
global.tls = require('tls');

var dotenv = require("dotenv");
var fs = require('fs');
var path = require('path');
var os = require('os');
// var utils = require('./utils');

var configPaths = [ path.join(os.homedir(), '.config', 'btc-rpc-explorer.env'), path.join(process.cwd(), '.env') ];
configPaths.filter(fs.existsSync).forEach(path => {
	console.log('Loading env file:', path);
	dotenv.config({ path });
});

const ElectrumClient = require('electrum-client')
var electrumAddressApi = require("./electrumAddressApi.js");



const main = async () => {
/*     const ecl = new ElectrumClient(50001, 'localhost', 'tcp')
    await ecl.connect()
    /* try{
     */    
    
    
    /* const balance = await ecl.blockchainAddress_getBalance("2MtP4GtNePK5cwX27yxs3hWq7bKwczKkLFN")
        console.log('balance', balance)
       /*  const unspent = await ecl.blockchainAddress_listunspent("12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX")
        console.log(unspent)
        const tx1 = await ecl.blockchainTransaction_get("f91d0a8a78462bc59398f2c5d7a84fcff491c26ba54c4833478b202796c8aafd", false)
        console.log(tx1)
        const tx2 = await ecl.blockchainTransaction_get("f91d0a8a78462bc59398f2c5d7a84fcff491c26ba54c4833478b202796c8aafd", true)
        console.log(tx2) */
    /* }catch(e){
        console.log('error', e)
    } */
    /* await ecl.close() */

    electrumAddressApi.connectToServers().then(async function() {
      // global.electrumAddressApi = electrumAddressApi;
      const address = "N9bzWUV8aLzaQsBh7ss7Yk1FEsyrNgAubY"
      const scriptPubkey = "a914b36f7ee2787ab46bc1633f3c6e340476a1ebee8187"
      console.log('inicio')
      const a = await getAddressDetails(address, scriptPubkey)
      console.log('RESULT', a);
    }).catch(function(err) {
      console.log("31207ugf4e0fed", err);
    });
  
}


function getAddressDetails(address, scriptPubkey, sort, limit, offset) {
	return new Promise(function(resolve, reject) {
		var promises = [];

			console.log('AQUI')
			promises.push(electrumAddressApi.getAddressDetails(address, scriptPubkey, sort, limit, offset));

			promises.push(new Promise(function(resolve, reject) {
				resolve({addressDetails:null, errors:["No address API configured"]});
			}));
      console.log('AAA', promises)
		Promise.all(promises).then(function(results) {
			if (results && results.length > 0) {
				console.log('res', results[0]);
				resolve(results[0]);

			} else {
				resolve(null);
			}
		}).catch(function(err) {
			reject(err);
		});
	});
}

main()
