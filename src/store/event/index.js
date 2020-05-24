import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default ({
  namespaced: true,
  state: {
    events: [],
    organizerEvents: [],
    search: null,
    ongoingEvent: [],
    totalEvents: []
  },
  mutations: {
    events (state, data) {
      state.events = data
      // console.log(state.events)
    },
    organizerEvents (state, data) {
      state.organizerEvents = data
      console.log(state.organizerEvents)
    },
    organizerOngoingEvent (state, data) {
      const d = new Date()
      const date = ('0' + d.getDate()).slice(-2)
      const month = ('0' + (d.getMonth() + 1)).slice(-2)
      const year = d.getFullYear()
      const dateStr = year + '-' + month + '-' + date
      // console.log(dateStr)

      const events = data
      const ongoingEvent = events.filter(event => event.date === dateStr)
      state.ongoingEvent = ongoingEvent
      // console.log(events[0].date)
      console.log(state.ongoingEvent[0].title)
      console.log(state.organizerEvents)
    },
    search (state, data) {
      state.events = data
      // console.log(data)
    },
    totalEvent (state, data) {
      state.totalEvents = data
      // console.log(state.totalEvents)
    },
    searchInput (state, data) {
      state.search = data
      console.log(state.search)
    }
  },
  actions: {
    getAllEvents (context) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'event')
        .then(res => {
          // console.log(res)
          context.commit('events', res.data.events.rows)
        })
    },
    getAllPages (context, page) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'event?page=' + page)
        .then(res => {
          // console.log(res)
          context.commit('events', res.data.events.rows)
        })
    },
    eventNewest (context) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'event?time=DESC')
        .then(res => {
          // console.log(res)
          context.commit('events', res.data.events.rows)
        })
    },
    eventOldest (context) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'event?time=ASC')
        .then(res => {
          // console.log(res)
          context.commit('events', res.data.events.rows)
        })
    },
    totalEvent (context) {
      // console.log(process.env.VUE_APP_BASE_URL)
      axios
        .get(process.env.VUE_APP_BASE_URL + 'event')
        .then(res => {
          // console.log(res)
          context.commit('totalEvent', res.data.events.count)
        })
    },
    searchInput (context, data) {
      context.commit('searchInput', data)
    },
    searchEvent (context, data) {
      // console.log(data)
      axios
        .get(process.env.VUE_APP_BASE_URL + 'event?search=' + data)
        .then(res => {
          // console.log(res)
          context.commit('search', res.data.events.rows)
        })
    },
    getEventsByOrganizer (context, organizerId) {
      // console.log(process.env.VUE_APP_BASE_URL)
      axios
        .get(process.env.VUE_APP_BASE_URL + 'event/user/' + organizerId)
        .then(res => {
          // console.log(res)
          context.commit('organizerEvents', res.data.events.rows)
        })
    },
    getOrganizerOngoingEvent (context, organizerId) {
      console.log(process.env.VUE_APP_BASE_URL)
      axios
        .get(process.env.VUE_APP_BASE_URL + 'event/user/' + organizerId)
        .then(res => {
          console.log(res)
          context.commit('organizerOngoingEvent', res.data.event.rows)
        })
    }
  }
})
