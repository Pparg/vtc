<script setup>
  import { RouterView } from 'vue-router'

</script>

<template>
  <div>
    <Suspense>
      <RouterView v-slot="{ Component }">
        <component :is="Component" ></component>
      </RouterView>
    </Suspense>
  </div>

</template>

<style scoped>

</style>
