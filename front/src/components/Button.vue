<script setup>

  import { RouterLink } from 'vue-router';
  import Icon from '../components/Icon.vue'
  import Link from './Link.vue';

  let props = defineProps({
    type: {
      type: String,
      default: 'navigation'
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
    <div v-if="to" class="button navigation">
      <Link :to="to" :label="label"></Link>
    </div>
    <div v-else :class="['button', type]">
      <Icon v-if="before_icon" :name="before_icon"></Icon>
      <button >{{ label }}</button>
      <Icon v-if="after_icon" :name="after_icon"/>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/global.scss';

  button{
    all: unset;
    font-size: 14px;
    font-weight: 900;
  }

  .button{
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all .6s  ease;
    gap: 10px;
    border-radius: 5px;
    padding: 7px 14px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    &:hover {
      box-shadow: 0 4px 30px  rgba(4, 175, 255, .1), 0 2px 30px rgba(11, 158, 255, 0.06);
    }
  }

  .navigation {
    background-color: $accent;
  }

  .danger {
    background-color: $delete-button;
  }
  .success {
    background-color: $confirm-button;
  }

</style>