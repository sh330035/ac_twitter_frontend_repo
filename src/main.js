import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/stylesheets/styles.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

// user Socket.io :
Vue.use(
  new VueSocketIO({
    debug: true,
    // // connection : Websocket server url or socket.io-client instance
    // connection: 'https://alphitter-api-server.herokuapp.com/api/',
    connection: 'http//:localhost:3000/',
    store
    // options: {
    //   path: 'http://localhost:3000/' } //Optional options
  })
)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
