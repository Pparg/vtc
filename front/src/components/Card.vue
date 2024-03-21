<script setup>

  let props = defineProps({
    bg_color: {
      type: String,
      required: false
    },
    border: {
      type: Boolean,
      default: true
    }
  });

</script>

<template>
  <aside class="p-2 border-round-lg" :class="{'bg-ligh': !props.bg_color, [props.bg_color]: props.bg_color, 'card': props.border}">
    <slot name="title" />
    <slot name="content" />
  </aside>
</template>

<style scoped lang="scss">
  @import '../assets/styles/global.scss';
  .card {
    border: 2px solid $accent;
  }

</style>