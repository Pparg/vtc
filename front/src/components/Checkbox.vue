<script setup>

  let props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  });

  let emit = defineEmits(['update:modelValue'])

  let updateValue = () => {
    emit('update:modelValue', !props.modelValue )
  };

</script>

<template>
  <input type="checkbox" :checked="modelValue" @change="updateValue" class="custom-checkbox"/>
</template>

<style scoped lang="scss">

@import '../assets/styles/global.scss';
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid $accent;
  border-radius: 40%;
  outline: none;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
}

.custom-checkbox::before {
  content: "\e909"; /* Code Unicode pour la coche dans PrimeIcons */
  font-family: 'PrimeIcons';
  font-size: 12px;
  color: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.custom-checkbox:checked::before {
  color: $text; /* Couleur de l'icône lorsque la checkbox est cochée */
}

.custom-checkbox:checked {
  background-color: $accent; /* Couleur de fond de la checkbox cochée */
}

</style>