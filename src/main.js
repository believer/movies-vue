import Vue from 'vue'
import App from './App'
import router from './router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://movies-api-graphql.33e99398.svc.dockerapp.io:4000/graphql',
    transportBatching: true
  }),
  addTypename: true,
  dataIdFromObject: r => {
    if (r.id && r.user) {
      return `${r.user.id}${r.id}`
    }
    return null
  }
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
