<template>
  <div class="home evn-primary">
    <!-- <ProfilUser /> -->
    <!-- <Tabel /> -->
    <Jumbotron />
    <NavCaty />
    <div class="card-lists d-flex flex-wrap justify-content-center mb-4 pt-3">
          <CardEvent
          v-for="data in eventStatus"
          :key="data.id"
          :linkDetail="'/event/detail/' + data.id"
          :eventImage="data.image"
          :eventTitle="data.title"
          :eventCategory="data.category.name"
          :eventDate="data.date"
          :eventStart="data.time_start"
          :eventEnd="data.time_end"
          :eventLocation="data.location"
          :eventOrganizer="data.user.name"
          />
    </div>
    <div class="row d-flex justify-content-center mb-5">
      <div class="col-md-7 d-flex justify-content-center">
        <router-link to="/event" class="lead text-warning evn-desc">Event selengkapnya ></router-link>
      </div>
    </div>
    <sEasy />
    <Footer/>
    <!-- <SmallFooter/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import ProfilUser from '../components/ProfilUser'
// import Tabel from '../components/Tabel'
import Footer from '../components/_module/Footer.vue'
// import SmallFooter from '../components/_module/Small-Footer.vue'
import axios from 'axios'
import Jumbotron from '../components/_module/Jumbotron.vue'
import sEasy from '../components/_module/SectionEeasy.vue'
import NavCaty from '../components/_module/NavCategory.vue'
import CardEvent from '../components/EventList/CardEvent.vue'
// import SmallFooter from '../components/_module/Small-Footer.vue'

export default {
  name: 'Home',
  data () {
    return {
      eventsKuy: [],
      linkEvent: []
    }
  },
  components: {
    Footer,
    CardEvent,
    NavCaty,
    sEasy,
    Jumbotron
    // SmallFooter
  },
  computed: {
    eventStatus () {
      return this.eventsKuy.filter((e) => {
        return e.status === 1
      })
    }
  },
  methods: {
    getAllEvent () {
      axios.get('http://192.168.1.97:5000/api/lalavent/event')
        .then((result) => {
          this.eventsKuy = result.data.events.rows
          // console.log(vs)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getAllEvent()
    // console.log(this.eventsKuy)
  }
}
</script>

<style lang="scss" scoped>

</style>
