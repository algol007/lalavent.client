<template>
  <div class="container-login evn-primary">
    <div class="left-login">
      <h1 class="evn-title">Rayakan Eventmu<br>
        di <span class="env-desc">#LalaventAja</span></h1>
    </div>
    <div class="right-login">
      <div class="title-login">
        <h5 class="evn-title">Daftar</h5>
      </div>
      <div class="mt-2 text-white">
        <div class="form-group">
          <label for="title" class="evn-title">Nama<span class="star">*</span></label>
          <input type="text" placeholder="Lalavent" :class="$v.name.$error ? 'form-control is-invalid' : 'form-control'" v-model="name">
          <p v-if="$v.name.$error" class="invalid-feedback">Nama harus diisi!</p>
        </div>
        <div class="form-group">
          <label for="email" class="evn-title">Email<span class="star">*</span></label>
          <input type="email" placeholder="event@lalavent.com" :class="$v.email.$error ? 'form-control is-invalid' : 'form-control'" v-model="email">
          <p v-if="$v.email.$error"  class="invalid-feedback">Email belum diisi!</p>
        </div>
        <div class="form-group">
          <label for="password" class="evn-title">Kata Sandi<span class="star">*</span></label>
          <input type="password" placeholder="Kata Sandi" :class="$v.password.$error ? 'form-control is-invalid' : 'form-control'" v-model="password">
          <p v-if="$v.password.$error" class="invalid-feedback">Kata Sandi harus diisi!</p>
        </div>
        <div class="mt-4">
          <Button @btn-click="submitEvent">Daftar</Button>
        </div>
      </div>
      <div class="account evn-title">
        <p>Sudah punya akun? <router-link to="/login" class="sign">Masuk</router-link></p>
        <p class="event">Atau buat eventmu sendiri <router-link to="/register-organizer" class="sign"> sekarang! </router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Button from '../components/Button.vue'
import axios from 'axios'

export default {
  name: 'Register',
  components: {
    Button
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      submitStatus: false
    }
  },
  validations: {
    name: { required },
    email: { required },
    password: { required }
  },
  methods: {
    submitEvent () {
      // e.preventDefault()
      this.submitStatus = true
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        // eslint-disable-next-line no-useless-return
        return
      } else {
        console.log('Submit ok')
        axios.post(process.env.VUE_APP_BASE_URL + 'auth/signup', {
          name: this.name, email: this.email, password: this.password
        })
          .then((res) => {
            console.log(res)
            this.$router.push('/login')
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container-login{
  display: flex;
  .left-login{
    background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('../assets/img/event.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 60%;
    height: 100vh;
    h1{
      margin: 80px;
      color: white;
      font-weight: bold;
      font-size: 60px;
      span{
        color: #f1c40f;
      }
    }
  }
  .right-login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 140px;
    .title-login{
      h5{
        font-size: 50px;
        font-weight: bolder;
        color: white;
      }
    }
    label {
      font-size: 1.5rem;
    }
    .star {
      color: #f1c40f;
    }
    .is-invalid {
      border-color: red !important;
    }
    .invalid-feedback {
      color: red;
    }
    .account{
      .event{
        margin: 0 0;
      }
      p{
        margin: 15px 0 0;
        color: white;
        .sign{
          color: #f1c40f;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
.container-login{
  display: flex;
  flex-direction: column;
  .left-login{
    background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('../assets/img/event.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 150px;
    h1{
      margin-left: 40px;
      margin-top: 50px;
      margin-bottom: 30px;
      margin-right: 0;
      color: white;
      font-weight: bold;
      font-size: 20px;
      span{
        color: #f1c40f;
      }
    }
  }
  .right-login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 35px;
    margin: 0;
    .title-login{
      h5{
        font-size: 50px;
        font-weight: bolder;
        color: white;
      }
    }
    label {
      font-size: 1.5rem;
    }
    .star {
      color: #f1c40f;
    }
    .is-invalid {
      border-color: red !important;
    }
    .invalid-feedback {
      color: red;
    }
    .account{
      .event{
        margin: 0 0;
      }
      p{
        margin: 15px 0 0;
        color: white;
        .sign{
          color: #f1c40f;
        }
      }
    }
  }
}
}
</style>
