<script setup>

  let props = defineProps({
    modelValue: {
      type: String,
      required: true
    }
  })

  let emit = defineEmits(['update:modelValue'])

  let onUpdate = (event) => {
    if (event.target.value) {
      emit('update:modelValue', event.target.value)
    }
  };

</script>

<template>
  <input type="time" :value="modelValue" @input="onUpdate" class="hour_picker border-round-sm p-1" />
</template>

<style lang="scss" scoped>
  
  @import '../assets/styles/global.scss';

  .hour_picker {
    outline: none;
    border: 2px solid transparent;
    transition: all 0.5s;
    cursor: pointer;
  }

  .date_picker:hover, .date_picker:focus {
    border: 2px solid $accent;
    cursor: text;
  }

</style>