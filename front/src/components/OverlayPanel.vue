<script setup>

  import { ref, onMounted, onBeforeUnmount } from 'vue';

  let props = defineProps({
    config: {
      type: Object,
      required: false
    }
  });

  let visible = ref(false)
  let $overlayPanel = ref()

  let show = () => {
    visible.value = true
  };

  let hide = () => {
    visible.value = false
  }

  let toggle = () => {
    visible.value = !visible.value
  }

  defineExpose({
    show,
    hide,
    toggle,
  });

</script>

<template>
  <aside v-if="visible" class="border-1 border-round-xl p-3 absolute panel flex flex-column gap-2 " ref="$overlayPanel" >
    <slot name="content"/>
  </aside>
</template>

<style lang="scss">
  @import '../assets/styles/global.scss';

.panel {
  position: absolute;
  top: 10px;
  right: 10px;
  min-width: 180px;
  width: fit-content;
  background-color: $background_light;
}
</style>