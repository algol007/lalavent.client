<template>
  <div class="container my-5">
    <div class="row">
      <div class="col">
        <div class="my-3 text-white d-flex justify-content-center align-items-center evn-title">
          <h1>Data Event Baru</h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="photo" class="evn-title text-white">Foto / Poster<span class="star">*</span></label>
          <input type="file" ref="file" @change="upload" :class="$v.image.$error ? 'form-control-file border-danger bg-light p-2 rounded-lg is-invalid' : 'form-control-file bg-light p-2 rounded-lg'" class="">
          <p v-if="$v.image.$error" class="invalid-feedback">Foto event harus diisi!</p>
        </div>
      </div>
    </div>
    <hr class="border-light">
    <div class="row">
      <div class="col-md-6 text-white">
        <div class="form-group">
          <label for="title" class="evn-title">Nama Event<span class="star">*</span></label>
          <input type="text" :class="$v.title.$error ? 'form-control is-invalid' : 'form-control'" v-model="title">
          <p v-if="$v.title.$error" class="invalid-feedback">Nama event harus diisi!</p>
        </div>
        <div class="form-group">
          <label for="date" class="evn-title">Tanggal<span class="star">*</span></label>
          <input type="date" :class="$v.date.$error ? 'form-control is-invalid' : 'form-control'" v-model="date">
          <p v-if="$v.date.$error" class="invalid-feedback">Tanggal event harus diisi!</p>
        </div>
        <div class="row">
          <div class="col">
            <label for="time-start" class="evn-title">Waktu Mulai<span class="star">*</span></label>
            <input type="time" :class="$v.timeStart.$error ? 'form-control is-invalid' : 'form-control'" v-model="timeStart">
            <p v-if="$v.timeStart.$error" class="invalid-feedback">Waktu mulai event harus diisi!</p>
          </div>
          <div class="col">
            <label for="time-end" class="evn-title">Waktu Selesai</label>
            <input type="time" class="form-control" v-model="timeEnd">
          </div>
        </div>
      </div>
      <div class="col-md-6 text-white">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="category" class="evn-title">Kategori<span class="star">*</span></label>
              <select :class="$v.selectedCategory.$error ? 'form-control custom-select is-invalid' : 'form-control custom-select'" v-model="selectedCategory">
                <option v-for="data in category" :key="data.id" :value="data.id">{{ data.name }}</option>
              </select>
              <p v-if="$v.selectedCategory.$error" class="invalid-feedback">Kategori event harus diisi!</p>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label for="type" class="evn-title">Tipe<span class="star">*</span></label>
              <select :class="$v.selectedType.$error ? 'form-control custom-select is-invalid' : 'form-control custom-select'" v-model="selectedType">
                <option :value="true">Online</option>
                <option :value="false">Offline</option>
              </select>
              <p v-if="$v.selectedType.$error" class="invalid-feedback">Tipe event harus diisi!</p>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="location" class="evn-title">Lokasi<span class="star">*</span></label>
          <input type="text" :class="$v.location.$error ? 'form-control is-invalid' : 'form-control'" v-model="location">
          <p v-if="$v.location.$error" class="invalid-feedback">Lokasi event harus diisi!</p>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="price" class="evn-title">Harga</label>
              <input type="number" class="form-control" v-model="price">
              <p class="mt-2 text-warning">Jika harga tidak dimasukkan maka event ini akan dianggap event gratis</p>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label for="quota" class="evn-title">Kuota</label>
              <input type="number" class="form-control" v-model="quota">
              <p class="mt-2 text-warning">Jika kuota tidak dimasukkan maka Lalavent tidak bertanggung jawab atas terjadinya overload capacity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-light">
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="description" class="evn-title text-white">Deskripsi<span class="star">*</span></label>
          <textarea :class="$v.description.$error ? 'form-control is-invalid' : 'form-control'" v-model="description" rows="10"></textarea>
          <p v-if="$v.description.$error" class="invalid-feedback">Deskripsi event harus diisi!</p>
        </div>
      </div>
    </div>
    <div class="mt-5 d-flex flex-row-reverse">
      <Button @btn-click="submitEvent">Simpan</Button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Button from '@/components/Button'

export default {
  name: 'AddEvent',
  data () {
    return {
      title: '',
      date: '',
      timeStart: '',
      timeEnd: '',
      selectedCategory: '',
      selectedType: '',
      location: '',
      image: '',
      quota: '',
      price: '',
      description: '',
      status: 0,
      submitStatus: false
    }
  },
  validations: {
    image: { required },
    title: { required },
    date: { required },
    timeStart: { required },
    selectedCategory: { required },
    selectedType: { required },
    location: { required },
    description: { required }
  },
  components: {
    Button
  },
  methods: {
    upload () {
      const file = this.$refs.file.files[0]
      this.image = file
    },
    submitEvent () {
      console.log(this.$refs.file.files[0])
      this.submitStatus = true
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        // eslint-disable-next-line no-useless-return
        return
      } else {
        console.log('Submit ok')
        console.log(this.local.token)
        const formData = new FormData()
        formData.append('user_id', this.local.id)
        formData.append('image', this.image)
        formData.append('title', this.title)
        formData.append('date', this.date)
        formData.append('time_start', this.timeStart)
        formData.append('time_end', this.timeEnd)
        formData.append('category_id', this.selectedCategory)
        formData.append('type', this.selectedType)
        formData.append('location', this.location)
        formData.append('price', this.price)
        formData.append('quota', this.quota)
        formData.append('status', this.status)
        formData.append('description', this.description)
        axios
          .post(`${process.env.VUE_APP_BASE_URL}event`, formData, {
            headers: { 'baca-bismillah': this.local.token }
          })
          .then((res) => {
            console.log(res)
            this.$router.push(`/${this.local.id}/event-list`)
          })
          .catch((err) => {
            console.log(err + 'error')
          })
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1])
        // }
      }
    },
    ...mapActions('organizer', ['getCategory'])
  },
  mounted () {
    this.getCategory()
  },
  computed: {
    ...mapState('organizer', ['category']),
    ...mapState('user', ['local'])
  }
}
</script>

<style lang="scss" scoped>
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
</style>
