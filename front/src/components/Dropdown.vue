<script setup>

  let props = defineProps({
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  });

  let selectedValue = ref(props.modelValue)
  
  let emit = defineEmits(['update:modelValue']);

  let updateValue = (event) => {
    selectedValue.value = event.target.value
    emit('update:modelValue', event.target.value)
  };

</script>

<template>
  <select :value="selectedValue" @change="updateValue">
    <option v-for="option in options" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<style lang="scss" scoped>
</style>