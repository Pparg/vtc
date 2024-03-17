<script setup>
  let props = defineProps({
    label: {
      type: String,
      required: false
    },
    to: {
      type: Object,
      required: false
    },
    href: {
      type: String,
      required: false
    }
  });

</script>

<template>
  <aside>
    <div v-if="href">
      <a :href="href" class="link">
        <span v-if="label">{{ label }}</span>
        <slot name="content"/>
      </a>
    </div>
    <router-link v-else :to="to" class="link" :props="true">
      <div>
        <span v-if="label">{{ label }}</span>
        <slot name="content"/>
      </div>
      
    </router-link>
  </aside>


</template>

<style scoped lang="scss">

  @import '../assets/styles/global.scss';

  .link {
    font-size: 14px;
    font-weight: 900;
    color: $text;
    text-decoration: none;
    cursor: pointer;
  }
</style>