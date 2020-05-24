<template>
  <div class="container container-fluid my-5">
    <ProfilUser />
    <Footer/>
  </div>
</template>

<script>
// import { mapActions, mapState } from 'vuex'
import ProfilUser from '../components/ProfilUser'
import Footer from '../components/_module/Footer.vue'
export default {
  name: 'Profil',
  components: {
    ProfilUser,
    Footer
  },
  methods: {
  },
  mounted () {
    // this.historyEvent()
  },
  computed: {
    // ...mapState('profil', ['myHistory'])
  }

}
</script>

<style lang="scss" scoped>

</style>
