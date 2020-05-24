<template>
  <div class="modal fade modal-custom-bg" :id="id" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content evn-secondary evn-shadow text-white">
        <div class="modal-header">
          <h5 class="modal-title evn-title" id="exampleModalScrollableTitle">{{ title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><i class="text-white fas fa-times-circle"></i></span>
          </button>
        </div>
        <div class="modal-body evn-desc">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <Button type="button" @btn-click="$emit('ticket')" :data-dismiss="dismiss">{{ button }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'Modal',
  components: {
    Button
  },
  props: [
    'title',
    'button',
    'id',
    'dismiss'
  ]
}
</script>

<style lang="scss" scoped>
.modal-custom-bg {
  background: rgb(0,0,0);
  background: linear-gradient(86deg, rgba(0,0,0,0.4) 100%, rgba(0,0,0,1) 100%);
  .modal-header {
    border-bottom: 1px solid darkgray;
  }
  .modal-footer {
    border-top: 1px solid darkgray;
  }
}
</style>
