<script setup>

  import { onMounted, ref } from 'vue';

  import Button from '@/components/Button.vue';
  import LoadableList from '@/components/LoadableList.vue';
  import Card from '@/components/Card.vue';
  import Link from '@/components/Link.vue';
  import Icon from '@/components/Icon.vue';

  // TODO @orthographe

</script>

<template>
  <section class="px-3">
    <header>
      <div class="flex align-items-center justify-content-between">
        <h2 class="text-xl">Mes adresses</h2>
        <Button :label="'Ajouter une nouvelle addresse'" :type="'navigation'" :to="{name: 'new_address'}" v-if="true"/>
      </div>
      <p class="text-xs">Cette interface sert à enregistrer vos addresses favorites.</p>
    </header>
    <article class="mt-5">
      <LoadableList api="/adress" :per_page="5" ref="$loadable_list">
        <template #content="slotProps">
          <Card>
            <template #title>
              <div class="flex justify-content-between align-items-center">
                <h5 class="m-0" v-if="slotProps.data.name.length > 0">{{ slotProps.data.name}}</h5>
                <h5 class="m-0" v-else>{{ slotProps.data.address }}</h5>
                <aside class="flex flex-row gap-3">
                  <Link :to="{name: 'edit_address', params: {address_id: slotProps.data.id}}">
                    <template #content>
                      <Icon name="pencil" :size="14" :color="'#459ECC'"/>
                    </template>
                  </Link>
                  <Link :to="{name: 'remove_address', params: {address_id: slotProps.data.id} }">
                    <template #content>
                      <Icon name="trash" :size="14" :color="'#FF5757'" />
                    </template>
                  </Link>
                </aside>
              </div>
            </template>
            <template #content>
              <p class="m-0 mt-2 text-sm">{{ slotProps.data.city }}</p>
            </template>
          </Card>
        </template>
        <template #no_results>
          <aside class="flex flex-column align-items-center gap-2">
            <h4 class="m-0">Vous n'avez pas encore d'addresses favorites.</h4>
            <p class="m-0 text-sm">Simplifiez vos déplacement.</p>
            <Button :label="'Ajouter une addresse'" :type="'navigation'" :to="{name: 'new_address'}"/>
        </aside>
        </template>
      </LoadableList>
    </article>
  </section>
</template>

<style lang="scss" scoped></style>