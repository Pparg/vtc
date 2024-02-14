<script setup>

  import { ref, defineExpose } from 'vue';

  let props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    }
  });

  let emit = defineEmits(['update:modelValue'])

  let updateValue = (event) => {
    emit('update:modelValue', event.target.value)
  };
  

</script>

<template>
  <input type="text" :placeholder="placeholder" :value="modelValue" @input="updateValue" class="input_text border-round-sm p-1" />
</template>

<style lang="scss" scoped>

  @import '../assets/styles/global.scss';
  .input_text {
    outline: none;
    border: 2px solid transparent;
    background-color: $text;
    transition: all 0.5s;
  }

  .input_text:hover, .input_text:focus {
  border: 2px solid $accent;
  background-color: white;
}
  
</style>