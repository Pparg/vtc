<script setup>

  let props = defineProps({
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 12
    },
    color: {
      type: String,
      default: '#EFF2F4'
    }
  });

</script>

<template>
  <i :class="['pi', 'pi-' + name, 'icon']" :style="{'font-size': size + 'px', 'color': color}"></i>
</template>

<style scoped lang="scss">
  @import 'primeicons/primeicons.css';

  .icon {
    cursor: pointer;
    font-weight: 900;
  }
</style>