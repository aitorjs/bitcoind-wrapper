const express = require('express')
const history = require('connect-history-api-fallback');

const app = express()
const port = 3000

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static('dist');

// 1st call for unredirected requests
app.use(staticFileMiddleware);

// Support history api
app.use(history({
  index: '/dist/index.html'
}));

// 2nd call for redirected requests
app.use(staticFileMiddleware);

app.listen(port, () => console.log(`Serving front on ${port}!`))
