<template>
    <div>
        <div class="row mt-3 mb-3">
            <div class="col-md-12">
                <OrganizerCard
                :organizerImage="dataOrganizer[0].image"
                :organizerName="dataOrganizer[0].name"
                :organizerEvents="eventUser[0].length"
                :organizerDesc="dataOrganizer[0].description === null ? ' no description ' : dataOrganizer[0].description "
                />
            </div>
        </div>

        <div v-for="data in eventUser[0]" :key="data.id" class="row mb-3 evn-secondary" style="border-radius: 30px">
            <div class="col-md-3 px-2 py-2 d-flex justify-content-center align-items-center">
                <router-link :to="'/event/detail/' + data.id">
                <img :src="data.image" style="box-shadow: 1px 5px 10px 10px rgba(0,0,0,0.3); border-radius: 30px; width:180px; height: 180px;" class="img-fluid img-rounded" alt="thumb">
                </router-link>
            </div>
            <div class="col-md-6">
                <div class="card-title evn-title text-light py-3" style="font-size: 25px;">
                    <router-link :to="'/event/detail/' + data.id">
                    {{ data.title }}
                    </router-link>
                </div>
                <div class="card-text text-warning">Diselenggarakan oleh: {{ data.user.name }}</div>
                </div>
            <div class="col-md-3 d-flex justify-content-start">
                <ul class="list-group w-100 my-2 mx-2">
                        <li class="list-group-item bg-transparent border-0 evn-title text-light">Waktu Pelaksanaan</li>
                        <li class="list-group-item bg-transparent border-0 text-light">{{ new Date(data.date).toString().slice(3, 15) }}</li>
                        <li class="list-group-item bg-transparent border-0 evn-title text-light">Kuota</li>
                        <li class="list-group-item bg-transparent border-0 text-light">{{ data.quota }} Peserta</li>
                </ul>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import axios from 'axios'
import OrganizerCard from '@/components/OrganizerCard'
import Footer from '../components/_module/Footer.vue'

export default {
  data () {
    return {
      eventUser: [],
      dataOrganizer: []
    }
  },
  components: {
    OrganizerCard,
    Footer
  },
  methods: {
    eventByUserId () {
      axios.get(process.env.VUE_APP_BASE_URL + 'event/user/' + this.$route.params.id)
        .then((result) => {
          this.eventUser.push(result.data.events.rows)
        })
        .catch((eror) => {
          console.log(eror)
        })
    },
    getDataOrganizer () {
      axios.get(process.env.VUE_APP_BASE_URL + 'user/' + this.$route.params.id)
        .then((result) => {
          this.dataOrganizer.push(result.data.user)
        })
        .catch((eror) => {
          console.log(eror)
        })
    }
  },
  created () {
    this.eventByUserId()
    this.getDataOrganizer()
    console.log(this.dataOrganizer)
    // console.log(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
