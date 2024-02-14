<script setup>

  import Icon from './Icon.vue';

  let props = defineProps({
    label: {
      type: String,
      required: false
    },
    size: {
      type: Number,
      default: 12
    },
    shape: {
      type: String,
      default: 'square'
    },
    icon: {
      type: String,
      required: false
    }
  });

</script>

<template>
  <div :class="shape" class="p-1 flex justify-content-center">
    <Icon :name="icon" v-if="icon" :size="size"></Icon>
    <i v-else>{{ label }}</i>
  </div>

</template>

<style lang="scss">

  @import '../assets/styles/global.scss';

  .square{
    border-radius: 5px;
    background-color: $primary;
    font-weight: 800;
    height: 20px;
    width: 20px;
  }

  .circle {
    background-color: $primary;
    font-weight: 800;
  }

</style>