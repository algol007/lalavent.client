<template>
<div>
    <div class="row">
       <div class="col-md-12 banner-w d-flex bg-light" style="border-bottom: 5px solid yellow;" >
            <img :src="dataDetail[0].image"  class="img-fluid w-100" style="height: 250px; object-fit: cover;" alt="banner">
       </div>
   </div>
   <div class="row">
        <div class="col-md-3 px-2 py-2 d-flex justify-content-center align-items-center evn-secondary" style="border-bottom-left-radius: 30px">
           <img :src="dataDetail[0].image" style="box-shadow: 1px 5px 10px 10px rgba(0,0,0,0.3); border-radius: 30px; width:180px; height: 180px;" class="img-fluid img-rounded" alt="thumb">
        </div>
        <div class="col-md-6 evn-secondary">
           <div class="card-title evn-title text-light py-3" style="font-size: 25px;">{{ dataDetail[0].title }}</div>
           <div class="card-text text-warning">Diselenggarakan oleh:
               <router-link :to="`/event/squad/${dataDetail[0].user_id}`">
               {{ dataDetail[0].user.name }}
               </router-link>
               </div>
        </div>
       <div class="col-md-3 evn-secondary d-flex justify-content-start" style="border-bottom-right-radius: 30px">
            <ul class="list-group w-100 my-2 mx-2">
                <li class="list-group-item bg-transparent border-0 evn-title text-light">Waktu Pelaksanaan</li>
                <li class="list-group-item bg-transparent border-0 text-light">{{new Date(dataDetail[0].date).toString().slice(3, 15) }}</li>
                <li class="list-group-item bg-transparent border-0 evn-title text-light">Kuota</li>
                <li class="list-group-item bg-transparent border-0 text-light">{{ dataDetail[0].quota }} Peserta</li>
            </ul>
       </div>
   </div>
   <div class="row mt-3">
       <div class="col-md-8 evn-secondary px-4 py-3" style="border-top-left-radius: 30px">
           <h2 class="text-light evn-title">Deskripsi</h2>
           <p class="lead text-light evn-desc border-bottom">
               <br>
               {{ dataDetail[0].description }}
               <br><br>
           </p>

           <!-- <h2 class="text-light evn-title">Rundown acara</h2>
           <ul class="list-group w-100 my-2 mx-2">
                <li class="list-group-item bg-transparent border-0 evn-title text-light">16.00 - 16.10 Pembukaan oleh moderator (Ziya El Arief - Product Developer)</li>
                <li class="list-group-item bg-transparent border-0 evn-title text-light">6.10 - 16.30 Nur Rohman - CPO Dicoding, materi yang akan dibawakan Intro to Software Product Management</li>
                <li class="list-group-item bg-transparent border-0 evn-title text-light">16.30 - 17.00 Q & A</li>
            </ul> -->
            <h3 class="lead evn-title mt-3 font-italic text-light">Note: setelah mendaftar dan mendapatkan tiket, Anda tidak perlu mendaftar ulang untuk konfirmasi kehadiran saat acara berlangsung</h3>
       </div>
       <div class="col-md-4 evn-secondary px-4 py-3" style="border-top-right-radius: 30px">
           <ul v-if="dataDetail[0].status === 1" class="list-group w-100 my-4 mx-2">
                <li class="list-group-item border-0 bg-transparent px-3 py-3">
                    <button @click.prevent="daftarEvent" class="text-light evn-title w-100  bg-warning evn-shadow btn-custom">
                        <slot>DAFTAR</slot>
                    </button>
                </li>
            </ul>

            <ul class="list-group w-100 my-2 mx-2">
                <li class="list-group-item bg-warning border-0 evn-title text-light mb-3">Jadwal Pelaksanaan</li>
                <li class="list-group-item bg-transparent border-0 evn-desc text-light">Mulai :  <b>{{ dataDetail[0].date == null ? ' - ' : dataDetail[0].date }} </b>| {{ dataDetail[0].time_start == null ? ' - ' : dataDetail[0].time_start }}</li>
                <li class="list-group-item bg-transparent border-0 evn-desc text-light">Selesai : <b>{{ dataDetail[0].date == null ? ' - ' : dataDetail[0].date }} </b>| {{ dataDetail[0].time_end == null ? ' - ' : dataDetail[0].time_end}}</li>
            </ul>

             <ul class="list-group w-100 my-2 mx-2">
                <li class="list-group-item bg-warning border-0 evn-title text-light mb-3">Lokasi</li>
                <li class="list-group-item bg-transparent border-0 evn-desc text-light">
                    <i class="fas fa-map-marker-alt mr-3"></i>
                    {{ dataDetail[0].location }}
                </li>
                <li class="list-group-item bg-transparent border-0 evn-desc text-light">
                    {{ dataDetail[0].status === 1 ? 'online' : 'offline' }}
                </li>
            </ul>
       </div>
   </div>
   <Footer />
   <!-- <SmallFooter /> -->
</div>
</template>

<script>
import axios from 'axios'
import Footer from '../components/_module/Footer.vue'
// import SmallFooter from '../components/_module/Small-Footer.vue'

export default {
  data () {
    return {
      dataDetail: []
    }
  },
  components: {
    Footer
    // SmallFooter
  },
  methods: {
    getDetailevent () {
      axios.get(`${process.env.VUE_APP_BASE_URL}event/${this.$route.params.eventDetail}`)
        .then((result) => {
          this.dataDetail.push(result.data.event)
        })
        .catch((eror) => {
          console.log(eror)
        })
    },
    daftarEvent (e) {
      e.preventDefault()
      const lc = localStorage.getItem('items')
      if (lc !== null) {
        this.$router.push(`/payment/${this.dataDetail[0].id}`)
      } else {
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getDetailevent()
    // console.log(this.dataDetail)
  }

}
</script>

<style scoped>
.btn-custom {
  padding: 5px 20px;
  border-radius: 25px;
}
</style>
