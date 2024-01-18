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
  <input type="text" :placeholder="placeholder" :value="modelValue" @input="updateValue" />
</template>

<style lang="scss" scoped>
</style>