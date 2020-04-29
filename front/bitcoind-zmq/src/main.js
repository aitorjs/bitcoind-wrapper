import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueApollo from 'vue-apollo'

import ApolloClient from 'apollo-client'
// import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import vuetify from './plugins/vuetify';

Vue.use(VueApollo)

Vue.config.productionTip = false

// Create an http link:
/* const link = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql',
  fetch,
  headers: { 'x-hasura-admin-secret': 'secretkey' }
}) */
// Create a WebSocket link:
const link = new WebSocketLink({
  uri: process.env.VUE_APP_HASURA_SCHEMA,
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      headers: { 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_PASS }
    }
  }
})

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
  vuetify,
  render: h => h(App)
}).$mount('#app')
