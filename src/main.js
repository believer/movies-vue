// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://movies-api-graphql.33e99398.svc.dockerapp.io:4000/graphql',
    transportBatching: true,
  }),
})

// Install the vue plugin
Vue.use(VueApollo, {
  apolloClient,
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
