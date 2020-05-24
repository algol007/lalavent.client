<template>
  <div class="container-login evn-primary">
    <div class="left-login">
      <h1 class="evn-title">Rayakan Eventmu<br>
        di <span class="env-desc">#LalaventAja</span></h1>
    </div>
    <div class="right-login">
      <div class="title-login">
        <h5 class="evn-title">Masuk</h5>
      </div>
      <form @submit="submitEvent" class="mt-2 text-white">
        <div v-if="code === 1" class="alertdiv color-red">
          <i class="material-icons evn-desc" style="color:red">Silakan aktivasi email terlebih dahulu.</i>
        </div>
        <div v-if="code === 2" class="alertdiv wrong color-orange">
          <i class="material-icons evn-desc" style="color:orange">Kata Sandi salah.</i>
        </div>
        <div v-if="code === 3" class="alertdiv color-orange">
          <i class="material-icons evn-desc" style="color:orange">Email belum terdaftar.</i>
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
          <Button type="submit">Masuk</Button>
        </div>
      </form>
      <div class="account evn-title">
        <p>Belum punya akun? <router-link to="/register" class="sign">Daftar</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
import Button from '../components/Button.vue'

export default {
  name: 'Register',
  components: {
    Button
  },
  data () {
    return {
      email: '',
      password: '',
      code: 0,
      submitStatus: false,
      local: {
        id: null,
        token: null,
        role: null
      }
    }
  },
  validations: {
    email: { required },
    password: { required }
  },
  created () {
    if (localStorage.getItems('id')) {
      this.$router.push('/')
    }
  },
  beforeCreate () {
    axios.patch(process.env.VUE_APP_BASE_URL + `user/activation?token=${this.$route.query.token}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    localData () {
      const parsed = JSON.stringify({
        id: this.local.id,
        token: this.local.token,
        role: this.local.role
      })
      localStorage.setItem('items', parsed)
    },
    submitEvent (e) {
      e.preventDefault()
      this.submitStatus = true
      console.log('Fill this form!')
      // console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        // eslint-disable-next-line no-useless-return
        return
      } else {
        console.log('Submit ok')
        axios.post(process.env.VUE_APP_BASE_URL + 'auth/signin', {
          email: this.email,
          password: this.password
        })
          .then(res => {
            console.log(res)
            if (res.data.status === 0) {
              this.code = 1
            } else if (res.data.password === 0) {
              this.code = 2
            } else if (res.data.id === 0) {
              this.code = 3
            } else {
              const parsed = JSON.stringify({
                id: res.data.id,
                token: res.data.token,
                role: res.data.role
              })
              localStorage.setItem('items', parsed)
              console.log(parsed)
              this.$router.push('/')
            }
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
      p{
        margin: 20px 0;
        color: white;
        .sign{
          color: #f1c40f;
        }
      }
    }
  }
}
.material-icons{
    position: absolute;
    margin-top: 7px;
    margin-left: 10px;
}
.alertdiv{
    background-color: #fff7f7;
    border-radius: 5px;
    width: 205px;
    height: 40px;
}
.color-red{
    border: 1px solid #f1c40f;
    position: absolute;
    top: 525px;
    width: 325px;
}
.color-orange{
    border: 1px solid #f1c40f;
    position: absolute;
    top: 525px;
}
.wrong{
    border: 1px solid #f1c40f;
    position: absolute;
    top: 525px;
    width:170px;
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
.material-icons{
    position: absolute;
    margin-top: 7px;
    margin-left: 10px;
}
.alertdiv{
    background-color: #fff7f7;
    border-radius: 5px;
    width: 205px;
    height: 40px;
}
.color-red{
    border: 1px solid #f1c40f;
    position: absolute;
    top: 555px;
    width: 325px;
}
.color-orange{
    border: 1px solid #f1c40f;
    position: absolute;
    top: 555px;
}
.wrong{
    border: 1px solid #f1c40f;
    position: absolute;
    top: 555px;
    width:170px;
}
}
</style>
