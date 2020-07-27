const ELECTRS_API_URL = "https://www.blockstream.info/testnet/api";
const request = require("request");

request(ELECTRS_API_URL + '/mempool', { json: true, timeout: 10000 }, (err, res, resp) => {
  if (err) {
    /* reject(err); */
    console.log("error", err);
  } else if (res.statusCode !== 200) {
    /* reject(response); */
    console.log("no resp", res);
  } else {
    if (typeof resp.count !== 'number') {
      /* reject('Empty data'); */
      console.log("empty data")
      return;
    }
    /* resolve({
      size: response.count,
      bytes: response.vsize,
    }); */
    console.log("resp", resp);
  }
});
