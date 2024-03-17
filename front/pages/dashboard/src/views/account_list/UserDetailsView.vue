<script setup>

  import { get as getUser } from '@/utils/user'

  let props = defineProps({
    user_id: {
      type: String,
      required: true
    }
  });

  let test = await getUser(props.user_id);

</script>


<template>
  <p>{{ user_id }}</p>
</template>

<style lang="scss" scoped>
</style>