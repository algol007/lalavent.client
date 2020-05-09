import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default ({
  namespaced: true,
  state: {
    events: [],
    organizerEvents: []
  },
  mutations: {
    events (state, data) {
      state.events = data
<<<<<<< HEAD
      console.log(state.events)
=======
      // console.log(state.events)
    },
    organizerEvents (state, data) {
      state.organizerEvents = data
      // console.log(state.events)
>>>>>>> aa6a918435c37cfeaac72d17103c733926e9172c
    }
  },
  actions: {
    getAllEvents (context) {
      console.log(process.env.VUE_APP_BASE_URL)
      axios
        .get(process.env.VUE_APP_BASE_URL + 'event')
        .then(res => {
          // console.log(res)
          context.commit('events', res.data.events.rows)
        })
    },
    getEventsByOrganizer (context, organizerId) {
      console.log(process.env.VUE_APP_BASE_URL)
      axios
        .get(process.env.VUE_APP_BASE_URL + 'event/user/' + organizerId)
        .then(res => {
          // console.log(res)
          context.commit('organizerEvents', res.data.event.rows)
        })
    }
  }
})
