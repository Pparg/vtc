<script setup>

  let props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    min: {
      type: String,
      required: false
    },
    max: {
      type: String,
      required: false
    }
  })

  let emit = defineEmits(['update:modelValue'])

  let onUpdate = (event) => {
    if (event.target.value) {
      emit('update:modelValue', event.target.value)
    }
  };

  let minWeek = () => {
    if (!props.min) {
      let current_date = new Date()
      return `${current_date.getFullYear()}-W${current_date.getWeek()}`
    } else {
      return props.min
    }
  };

  let maxWeek = () => {
    if (!props.max) {
      let current_date = new Date()
      let maxDate = new Date(current_date.getFullYear(), current_date.getMonth() + 4, 0);
      return `${maxDate.getFullYear()}-W${maxDate.getWeek()}`
    } else {
      return props.max
    }
  };

  Date.prototype.getWeek = function () {
    let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

</script>

<template>
  <input type="week" :value="modelValue" @input="onUpdate" class="week_picker border-round-sm p-1" :min="minWeek()" :max="maxWeek() "/>
</template>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';

.week_picker {
  outline: none;
  border: 2px solid transparent;
  transition: all 0.5s;
  cursor: pointer;
}

.week_picker:hover,
.week_picker:focus {
  border: 2px solid $accent;
  cursor: text;
}
</style>