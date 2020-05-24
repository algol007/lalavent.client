<template>
  <!-- Image and text -->
  <nav class="navbar navbar-expand-lg navbar-dark evn-secondary sticky-top">
    <div class="container">

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <!-- <span class="navbar-toggler-icon"></span> -->
        <i class="fas fa-bars"></i>
      </button>
      <div class="brands">
        <i class="fas fa-campground mr-2"></i>
        <router-link to="/" class="navbar-brand">LALAVENT</router-link>
      </div>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li class="nav-item mr-3" v-if="this.local.role == 2">
            <i class="fas fa-calendar-plus mr-1"></i>
            <router-link to="/1/add-event" class="nav-link">Tambah Event</router-link>
          </li>
          <li class="nav-item mr-3" v-if="this.local.role == 2">
            <i class="fas fa-calendar-alt mr-1"></i>
            <router-link :to="`/${this.local.id}/event-list`" class="nav-link">Daftar Event</router-link>
          </li>
          <li class="nav-item mr-3" v-if="this.local.role == 1">
            <i class="fas fa-calendar-alt mr-1"></i>
            <router-link to="/event" class="nav-link">Semua Event</router-link>
          </li>
          <li class="nav-item mr-4 dropdown" v-if="this.local.id !== null">
            <img :src="this.user.image" alt="profile-img" class="profile-img mr-1">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ this.user.name }}</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/profile" class="dropdown-item">
                <i class="fas fa-user-cog mr-1"></i>
                Edit Profile
              </router-link>
              <router-link to="/dashboard" class="dropdown-item" v-if="this.local.role == 1">
                <i class="fas fa-history mr-1 mt-1"></i>
                History Event
              </router-link>
              <router-link :to="`/${this.local.id}/event-statistic`" class="dropdown-item" v-if="this.local.role == 2">
                <i class="fas fa-chart-bar mr-1 mt-1"></i>
                Statistik Event
              </router-link>
              <router-link to="/admin/admin-organizer-list" class="dropdown-item" v-if="this.local.role == 3">
                <i class="fas fa-users mr-1 mt-1"></i>
                Organizers
              </router-link>
              <router-link to="/admin/admin-event-list" class="dropdown-item" v-if="this.local.role == 3">
                <i class="fas fa-calendar-alt mr-1 mt-1"></i>
                Events
              </router-link>
              <div class="dropdown-divider"></div>
              <router-link to="/logout" class="dropdown-item">
                <i class="fas fa-sign-out-alt mr-1"></i>
                Logout
              </router-link>
            </div>
          </li>
          <li class="nav-item mr-4" v-else>
            <i class="fas fa-sign-in-alt mr-2"></i>
            <a class="nav-link"> <router-link to="/login">Login</router-link> </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: false,
      local: {
        id: null,
        role: 1
      }
    }
  },
  created () {
    const parsed = JSON.parse(localStorage.getItem('items'))
    if (parsed) {
      this.local = parsed
    }
  },
  methods: {
    ...mapActions('user', ['getUserById']),
    ...mapActions('user', ['getLocalStorage'])
  },
  mounted () {
    // console.log(this.local.role)
    this.getLocalStorage(this.local)
    this.getUserById(this.local.id)
  },
  computed: {
    ...mapState('user', ['user'])
  }
}
</script>

<style lang="scss" scoped>
  .nav-item{
    display: flex;
    align-items: center;
    color: #eeeeee;
    .fas{
      font-size: 20px;
    }
    .nav-link{
      color: #eeeeee;
    }
  }
  .brands{
    color: #eeeeee;
    .fas{
      font-size: 25px;
    }
  }
  .navbar-toggler{
    color: #eeeeee;
  }
  .profile-img{
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  .dropdown-item{
    color: #2c3e50;
  }
  .navbar-brand{
    font-weight: bold;
  }
</style>
