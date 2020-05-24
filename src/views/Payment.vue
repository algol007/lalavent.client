<template>
  <div>
    <div class="container">
      <EventName v-bind:eventd="myEvent"/>
      <PersonalUser v-bind:users="user"/>
      <PaymentInfo v-bind:events="myEvent"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import EventName from '../components/Payment/EventName'
import PersonalUser from '../components/Payment/PersonalUser'
import PaymentInfo from '../components/Payment/PaymentInfo'
import axios from 'axios'
export default {
  name: 'Payment',
  props: ['idEvent'],
  components: {
    EventName,
    PersonalUser,
    PaymentInfo
  },
  data () {
    return {
      myEvent: []
    }
  },
  methods: {
    getEvent () {
      axios.get(process.env.VUE_APP_BASE_URL + `event/${this.$route.params.idEvent}`)
        .then((res) => {
          this.myEvent = res.data.event
        })
        .catch((error) => {
          console.log(error)
        })
    },
    ...mapActions('user', ['getUserById'])
  },
  mounted () {
    this.getEvent()
    this.getUserById(this.local.id)
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('user', ['local'])
  }
}
</script>

<style>

</style>
