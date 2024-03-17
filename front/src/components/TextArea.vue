<script setup>

  let props = defineProps({
    modelValue: {
      type: String,
      required: true
    }
  });

  let emit = defineEmits(['update:modelValue'])

  let updateValue = (event) => {
    emit('update:modelValue', event.target.value)
  };

</script>

<template>
  <textarea :value="modelValue" @input="updateValue" class="text_area border-round-sm"></textarea>
</template>

<style lang="scss">
  @import '../assets/styles/global.scss';

  .text_area{
    outline: none;
    border: 2px solid transparent;
    background-color: $text;
    transition: all 0.5s
  }

  .text_area:hover, .text_area:focus {
    border: 2px solid $accent;
    background-color: white
  }
</style>