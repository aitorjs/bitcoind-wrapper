import Vue from 'vue';
import App from './App.vue';
import router from './router';

import ApolloClient from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache}  from 'apollo-cache-inmemory';

import VueApollo from 'vue-apollo'

Vue.use(VueApollo)
Vue.config.productionTip = false;

const getHeaders = () => {
  let headers= {'x-hasura-admin-secret': ''};
  const token = 'secretkey'
  if (token) {
    headers['x-hasura-admin-secret'] = token
  }

  return headers
}

/* // Create an http link:
const link = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql',
  fetch,
 // headers: getHeaders()
}) */

// Create a WebSocket link:
const link = new WebSocketLink({
  uri: 'ws://localhost:8080/v1/graphql',
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      headers: { 'x-hasura-admin-secret': 'secretkey' }
    }
  }
});
// x-hasura-access-key
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true
  })
})

const apolloProvider = new VueApollo({
  defaultClient: client
})

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
