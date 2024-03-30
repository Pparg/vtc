<script setup>
  
  import LoadableList from '@/components/LoadableList.vue';
  import Card from '@/components/Card.vue';
  import Icon from '@/components/Icon.vue';
  
  import { formatDate } from '@/utils/moment';
  import Link from '@/components/Link.vue';

</script>

<template>
  <section>
    <LoadableList api="/users">
      <template #content="slotProps">
        <Card>
          <template #title>
            <header class="flex flex-row align-items-center justify-content-between mb-2">
              <h5 class="m-0" >{{ slotProps.data.first_name }} {{ slotProps.data.last_name }}</h5>
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
            <h4 class="m-0">Vous n'avez pas encore d'utilisateurs.</h4>
        </aside>
      </template>
    </LoadableList>
  </section>
</template>

<style scoped lang="scss"></style>