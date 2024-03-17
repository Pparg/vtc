<script setup>

  import { ref } from 'vue'

  import Button from './Button.vue';

  let props = defineProps({
    config: {
      type: Object,
      required: true
    }
  });

  let show = ref(true)

  let emit = defineEmits(['confirmed'])
  
  let confirm = () => {
    emit('confirmed')
    show.value = false
  };

  let cancel = () => {
    show.value = false
  };
  
</script>

<template>
  <aside v-if="show" class="popup border-round-xl flex flex-column gap-3 p-2">
    <div class="flex flex-column gap-2">
      <h4 class="text-sm m-0">{{ config.title }}</h4>
      <p class="text-xs m-0">{{ config.description }}</p>
    </div>
    <div class="flex justify-content-between">
      <Button :label="config.cancel.label" @click="cancel" />
      <Button :label="config.confirm.label" @click="confirm" type="danger" />
    </div>
  </aside>
</template>

<style lang="scss">
  @import '../assets/styles/global.scss';

  .popup {
    position: absolute;
    left: 40%;
    top:40%;
    background-color: $background_light;
    border: 1px solid $accent;
    
  }
</style>