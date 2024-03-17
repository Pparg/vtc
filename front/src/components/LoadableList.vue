<script setup>
  import api from '@/utils/api';
  import { computed, onMounted, ref, watch } from 'vue';
  import Icon from './Icon.vue';

  import { useLoadableList } from '@/composables/useLoadableList';


  let props = defineProps({
    api: {
      type: String,
      required: true
    },
    per_page: {
      type: Number,
      default: 10
    },
    cache: {
      type: Boolean,
      default: false
    }
  });

  let { getPage, no_results, handleNext, handlePrevious, reloadData, count, current_page, store} = useLoadableList({
    api: props.api,
    per_page: props.per_page
  })

  let items = ref([])

  onMounted(async () => {
    await getPage()
    items.value = store.value
    watch(store, () => {
      items.value = store.value
    })

  });

  defineExpose({
    reloadData
  });
</script>

<template>
  <section>
    <article  v-if="!no_results" class="flex flex-column gap-2">
      <div v-for="item in items" :key="item.id">
        <slot name="content" :data="item"/>
      </div>
      <aside class="flex flex-column align-items-center gap-2">
        <p class="m-0">Total: {{ count }}</p>
        <div class="flex flex-row align-items-center gap-3 justify-content-center">
          <Icon name="chevron-left" @click="handlePrevious" :size="16" />
          <p class="m-0">Page: {{ current_page }}</p>
          <Icon name="chevron-right" @click="handleNext" :size="16"/>
        </div>
      </aside>
    </article>
    <aside v-else>
      <slot name="no_results" />
    </aside>
  </section>
</template>

<style lang="scss" scoped>
</style>