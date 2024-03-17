<script setup>

  import { computed } from 'vue';

  let props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    max: {
      type: String,
      required: false
    }
  });

  // Always send date in ISO format

  let maxDate = () => {
    if (props.max) {
      return props.max
    } else {
      return new Date().toISOString().split('T')[0]
    }
  };

  let minDate = () => {
    if (props.min) {
      return props.min
    } else {
      let current_date = new Date()
      let current_year = current_date.getFullYear()
      current_date.setFullYear(current_year - 80)
      return current_date.toISOString().split('T')[0]
    }
  }

  let emit = defineEmits(['update:modelValue'])

  let onUpdate = (event) => {
    if (event.target.value &&  new Date(event.target.value)) {
      emit('update:modelValue', new Date(event.target.value).toISOString())
    }
  };

  let formattedDate = computed(() => {
    return props.modelValue.split('T')[0]
  });

</script>

<template>
  <input type="date" class="date_picker border-round-sm p-1" :value="formattedDate" @input="onUpdate" :max="maxDate()" :min="minDate()" />
</template>

<style lang="scss">

  @import '../assets/styles/global.scss';

  .date_picker {
    outline: none;
    border: 2px solid transparent;
    transition: all 0.5s;
    cursor: pointer;
    font-family: 'Montserrat';
    font-weight: 600;
    background-color: $text;
  }

  .date_picker:hover, .date_picker:focus {
    border: 2px solid $accent;
    cursor: text;
  }

  .date_picker::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
</style>