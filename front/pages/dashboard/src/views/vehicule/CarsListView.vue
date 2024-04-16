<script setup>

  import { ref, onMounted } from 'vue';

  import LoadableList from '@/components/LoadableList.vue';
  import Card from '@/components/Card.vue';

</script>

<template>
  <section class="px-3">
    <header>
      <div class="flex flex-column align-items-center justify-content-between container">
        <h2 class="text-xl">Véhicules</h2>
        <Button :label="'Ajouter un véhicule'" :type="'navigation'" :to="{name: 'new_vehicule'}" v-if="true"/>
      </div>
      <p class="text-xs">Cette interface sert à administrer les véhicules du service</p>
    </header>
    <article class="mt-5">
      <LoadableList api="/cars" :per_page="5" ref="$loadable_list">
        <template #content="slotProps">
          <Card>
            <template #title>
              <div class="flex justify-content-between align-items-center">
                <h5 class="m-0">{{ slotProps.data.name}}</h5>
                <aside class="flex flex-row gap-3">
                  <Link :to="{name: 'edit_car', params: {id: slotProps.data.id}}">
                    <template #content>
                      <Icon name="pencil" :size="14" :color="'#459ECC'"/>
                    </template>
                  </Link>
                  <Link :to="{name: 'delete_car', params: {id: slotProps.data.id}}">
                    <template #content>
                      <Icon name="trash" :size="14" :color="'#FF5757'"/>
                    </template>
                  </Link>
                </aside>
              </div>
            </template>
            <template #content>
              <p class="m-0 mt-2 text-sm">{{ slotProps.data.description }}</p>
            </template>
          </Card>
        </template>
        <template #no_results>
          <aside class="flex flex-column align-items-center gap-2">
            <h4 class="m-0">Vous n'avez pas encore de voitures.</h4>
            <p class="m-0 text-sm">Elargissez le choix de vos utilisateurs.</p>
            <Button :label="'Ajouter un véhicule'" :type="'navigation'" :to="{name: 'new_vehicule'}"/>
        </aside>
        </template>
      </LoadableList>
    </article>
  </section>
</template>

<style lang="scss" scoped>
  @import '../../../../../src/assets/styles/responsive.scss';

  .container {
    @include medium-screen {
      flex-direction: row !important;
    }
  }
</style>