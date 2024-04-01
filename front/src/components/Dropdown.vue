<script setup>

  import { ref } from 'vue';

  let props = defineProps({
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: [String, null],
      required: true
    },
    placeholder: {
      type: String,
      default: null
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
  <select :value="selectedValue" @input="updateValue" class="select border-round-sm p-1">
    <option value="" v-if="props.placeholder" disabled>{{ props.placeholder }}</option>
    <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
  </select>
</template>

<style lang="scss" scoped>
  @import '../assets//styles/global.scss';
  .select {
    outline: none;
    border: 2px solid transparent;
    background-color: $text;
    transition: all 0.5s;
  }
  .select:focus {
    border: 2px solid $accent;
  }

</style>