<script setup>

  import { computed, ref } from 'vue';
  import Icon from './Icon.vue';

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

  let type = ref('password');
  let icon_name = computed(() => {
    return type.value === 'password' ? 'eye' : 'eye-slash'
  });

  let toggleVisibility = () => {
    type.value = type.value === 'password' ? 'text' : 'password'
  };

</script>

<template>
  <div class="w-12 flex align-items-center">
    <input :type="type" :placeholder="placeholder" :value="modelValue" @input="updateValue" class="input_text border-round-sm p-1 w-11 border-noround-right" />
    <div class="border-round-sm bg-text w-1 text-center p-1 cursor-pointer border-noround-left" @click="toggleVisibility">
      <Icon :name="icon_name" :size="12" :color="'#050809'" />
    </div>
  </div>
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