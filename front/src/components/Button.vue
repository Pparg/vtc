<script setup>

  import { RouterLink } from 'vue-router';
  import Icon from '../components/Icon.vue'

  let props = defineProps({
    type: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    to: {
      type: Object,
      required: false
    },
    before_icon: {
      type: String,
      required: false
    },
    after_icon: {
      type: String,
      required: false
    }
  });

</script>

<template>
  <aside>
    <div v-if="to">
      <RouterLink :to="to">
        <span>{{ label }}</span>
      </RouterLink>
    </div>
    <div>
      <Icon v-if="before_icon" :name="before_icon"></Icon>
      <button>{{ label }}</button>
      <Icon v-if="after_icon" :name="after_icon"/>
    </div>
  </aside>
</template>

<style lang="scss" scoped>

</style>