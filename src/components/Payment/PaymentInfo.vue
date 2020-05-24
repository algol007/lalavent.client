<template>
  <div>
    <div class="card mb-5 evn-secondary text-light">
      <div class="card-body">
        <div class="row payment-info d-flex flex-wrap">
          <div class="payment-card col-md-6">
            <div class="tittle-payment mb-3">
              <h3 class="evn-title">Metode Pembayaran</h3>
            </div>
            <div class="card-name d-flex flex-wrap">
              <div class="one item-card" @click="applyPayment">
                <span>
                  <img src="../../assets/img/payment/gopay_v2.png" alt="">
                </span>
                <div class="checked hide">
                  <i class="far fa-check-circle"></i>
                </div>
              </div>
              <div class="item-card">
                <span>
                  <img src="../../assets/img/payment/bca.png" alt="">
                </span>
                <div class="checked">
                  <i class="far fa-check-circle"></i>
                </div>
              </div>
              <div class="item-card">
                <span>
                  <img src="../../assets/img/payment/bank-transfer.jpg" alt="">
                </span>
                <div class="checked">
                  <i class="far fa-check-circle"></i>
                </div>
              </div>
              <div class="item-card">
                <span>
                  <img src="../../assets/img/payment/logo-linkaja.png" alt="">
                </span>
                <div class="checked">
                  <i class="far fa-check-circle"></i>
                </div>
              </div>
              <div class="item-card">
                <span>
                  <img src="../../assets/img/payment/alfamart.png" alt="">
                </span>
                <div class="checked">
                  <i class="far fa-check-circle"></i>
                </div>
              </div>
              <div class="item-card">
                <span>
                  <img src="../../assets/img/payment/indomaret.png" alt="">
                </span>
                <div class="checked">
                  <i class="far fa-check-circle"></i>
                </div>
              </div>
              <div class="item-card">
                <span>
                  <img src="../../assets/img/payment/visa-mastercard-logo.jpg" alt="">
                </span>
                <div class="checked">
                  <i class="far fa-check-circle"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="payment-total col-md-6">
            <h3 class="mb-3 evn-title">Pembelian Kamu</h3>
            <table class="table mb-5 text-light">
              <thead class="evn-title">
                <tr>
                  <th scope="col" colspan="3" class="text-center">Rincian Pembayaran</th>
                </tr>
              </thead>
              <tbody class="evn-desc">
                <tr>
                  <td colspan="2">Harga Tiket</td>
                  <td class="text-center">Rp {{events.price}}</td>
                </tr>
                <tr>
                  <td colspan="2">Admin fee</td>
                  <td class="text-center">Rp {{this.adminFee}}</td>
                </tr>
                <tr>
                  <td colspan="2">Total Pembayaran</td>
                  <td class="text-center">Rp {{this.adminFee + events.price}}</td>
                </tr>
              </tbody>
            </table>
            <Button @btn-click="createTiket" data-toggle="modal" data-target="#success-payment">Beli Tiket</Button>
          </div>
        </div>
      </div>
    </div>
    <modal title="Update Personal Profil" button="Ok" id="success-payment" dismiss="modal" v-on:ticket="ticket">
      <p>Tiket Created!</p>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import Button from '@/components/Button'
import modal from '@/components/Modal.vue'
export default {
  name: 'PaymentInfo',
  props: ['events'],
  data () {
    return {
      adminFee: 5000,
      harga: 0
    }
  },
  components: {
    Button,
    modal
  },
  methods: {
    ticket () {
      this.$router.push('/dashboard')
    },
    applyPayment () {
      const cardName = document.querySelector('.one')
      const check = document.querySelector('.checked')
      cardName.classList.toggle('border-check')
      check.classList.toggle('hide')
    },
    createTiket () {
      axios
        .post(process.env.VUE_APP_BASE_URL + 'ticket', {
          event_id: this.events.id,
          user_id: this.local.id,
          price: this.events.price
        },
        {
          headers: { 'baca-bismillah': this.local.token }
        })
        .then(res => {
          console.log(res)
          // setTimeout(() => {
          //   this.$router.push('/dashboard')
          // }, 2000)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    ...mapState('user', ['local'])
  }
}
</script>

<style lang="scss" scoped>
.payment-info{
  padding: 10px 40px 40px 40px;
}
.item-card{
  width: 110px;
  height: 60px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}
.item-card img{
  width: 65px;
  height: 30px;
  margin-top: 15px;
  margin-left: 20px;
}
.border-check{
  border: 3px solid #f39c12;
}
.payment-total{
  border-left: 1px solid #ffff;
}
.checked{
  position: absolute;
  top: -5px;
  left: 85px;
  color: #f39c12;
  font-weight: bold;
  font-size: 18px;
  display: none;
}
.hide{
  display: none;
}
@media screen and (max-width: 414px) {
  .payment-total{
  border-left: none;
  border-top: 1px solid #ffff;
  padding-top: 5px;
}
}
</style>>
