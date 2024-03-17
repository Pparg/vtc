<script setup>

  import { getAll as getRoles } from '@/utils/roles/roles.js'

  import Card from '@/components/Card.vue';

  let app_roles = await getRoles()

</script>

<template>
  <section class="px-3 ">
    <header class="flex flex-column mb-4">
      <h2 class="text-xl">Liste des rôles</h2>
      <p class="text-xs">Cette interface est dédiée au administrateur de l'application. Elle permet de visualiser tous les roles de l'interface. Bientôt de nouvelle fonctionnalitées seront ajoutées.</p>
    </header>
    <article class="flex flex-column gap-2">
      <Card v-for="role in app_roles" :key="role.id">
        <template #title>
          <h5 class="p-0 m-0">{{ role.name }}</h5>
        </template>
      </Card>
    </article>
  </section>
</template>

<style lang="scss" scoped></style>