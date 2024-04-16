<script setup>
  
  import { ref, onMounted } from 'vue';

  import { getNotificationStyle } from '@/utils/notifications.js'

  import LoadableList from '@/components/LoadableList.vue';
  import Card from '@/components/Card.vue';

</script>

<template>
  <section class="px-3">
    <header>
      <div class="flex flex-column align-items-center justify-content-between container">
        <h2 class="text-xl">Centre de notifications</h2>
        <Button :label="'Ajouter une notification'" :type="'navigation'" :to="{name: 'new_notification'}" v-if="true" />
      </div>
      <p class="text-xs">Cette interface sert à administrer les notifications de l'application.</p>
    </header>
    <article class="mt-5">
      <LoadableList api="/notifications" :per_page="5" ref="$loadable_list">
        <template #content="slotProps">
          <Card>
            <template #title>
              <div class="flex justify-content-between align-items-center">
                <div class="flex align-items-center gap-3">
                  <h5 class="m-0">{{ slotProps.data.title}}</h5>
                  <span v-if="slotProps.data.type" class="p-1 border-circle flex" :style="{backgroundColor: getNotificationStyle[slotProps.data.type].bg_color}">
                    <Icon :name="getNotificationStyle[slotProps.data.type].icon" />
                  </span>
                </div>
                <aside class="flex flex-row gap-3">
                  <Link :to="{name: 'edit_notification', params: {id: slotProps.data.id}}">
                  <template #content>
                    <Icon name="pencil" :size="14" :color="'#459ECC'" />
                  </template>
                  </Link>
                  <Link :to="{name: 'delete_notification', params: {id: slotProps.data.id}}">
                  <template #content>
                    <Icon name="trash" :size="14" :color="'#FF5757'" />
                  </template>
                  </Link>
                </aside>
              </div>
            </template>
            <template #content>
              <p class="m-0 mt-2 text-sm">{{ slotProps.data.content }}</p>
            </template>
          </Card>
        </template>
        <template #no_results>
          <aside class="flex flex-column align-items-center gap-2">
            <h4 class="m-0">Vous n'avez pas encore de notifications définie.</h4>
            <p class="m-0 text-sm">Partagez des informations à vos utilisateurs.</p>
            <Button :label="'Ajouter une notification'" :type="'navigation'" :to="{name: 'new_notification'}" />
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