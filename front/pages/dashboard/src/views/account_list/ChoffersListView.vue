<script setup>

  import LoadableList from '@/components/LoadableList.vue';
  import Icon from '@/components/Icon.vue';
  import Card from '@/components/Card.vue';
  import Button from '@/components/Button.vue';
  import Link from '@/components/Link.vue';

  import { formatDate } from '@/utils/moment';

</script>

<template>
  <section>
    <header class="flex flex-column align-items-center mb-3">
      <Button :label="'Créer un compte chauffeur.'" :type="'navigation'" :to="{ name: 'users_new_choffer' }" />
    </header>
    <LoadableList api="/choffers">
      <template #content="slotProps">
        <Card class="mb-2">
          <template #title>
            <header class="flex flex-row align-items-center justify-content-between mb-2">
              <h5 class="m-0">{{ slotProps.data.first_name }} {{ slotProps.data.last_name }}</h5>
              <div>
                <Link :to="{name: 'user_details', params: {user_id: slotProps.data.id}}">
                <template #content>
                  <Icon name="plus" />
                </template>
                </Link>
              </div>
            </header>
          </template>
          <template #content>
            <aside>
              <div class="flex gap-2">
                <span class="m-0 text-sm font-semibold">Client depuis: </span>
                <p class="m-0 text-sm">{{ formatDate(slotProps.data.created_at)}}</p>
              </div>
              <div class="flex gap-2">
                <span class="m-0 text-sm font-semibold">Dernieres connexion: </span>
                <p class="m-0 text-sm" v-if="slotProps.data.last_login">{{ formatDate(slotProps.data.last_login)}}</p>
                <p class="m-0 text-sm" v-else>Pas encore connecté</p>
              </div>
            </aside>
          </template>
        </Card>
      </template>
      <template #no_results>
        <aside class="flex flex-column align-items-center gap-2">
          <h4 class="m-0">Vous n'avez pas encore de chauffers.</h4>
          <Button :label="'Créer un compte chauffeur.'" :type="'navigation'" :to="{ name: 'users_new_choffer' }" />
        </aside>
      </template>
    </LoadableList>
  </section>
</template>

<style scoped lang="scss"></style>