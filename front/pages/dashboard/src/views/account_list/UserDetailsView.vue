<script setup>

  import { adminGet as getUser } from '@/utils/user'
  import { formatDate } from '@/utils/moment';

  let props = defineProps({
    user_id: {
      type: String,
      required: true
    }
  });

  let user = await getUser(props.user_id);

</script>


<template>
  <section class="flex flex-column mx-3 mt-3">
    <header>
      <Link :to="{ name: 'list_of_users' }">
        <template #content>
          <div class="flex align-items-center gap-2 cursor-pointer w-max">
            <Icon name="arrow-left" />
            <p class="p-0 m-0 text-xs">Retour</p>
          </div>
        </template>
      </Link>
      <h3>Fiche utilisateur</h3>
    </header>
    <article class="flex flex-column gap-3">
      <div>
        <p class="m-0">{{ user.first_name }} {{ user.last_name }}</p>
        <p class="m-0" v-if="user.birthday">Date de naissance: {{ user.birthday }}</p>
      </div>
      <p class="m-0 " v-if="parseInt(user_id)">Chauffeur depuis le : {{ formatDate(user.created_at) }}</p>
      <p class="m-0 " v-else>Client depuis le : {{ formatDate(user.created_at) }}</p>
      <p class="m-0" v-if="user.last_login">Dernieres connexion: {{ formatDate(user.last_login) }}</p>
      <div class="flex flex-column gap-3">
        <span>Contact: </span>
        <div>
          <li>{{ user.email }}</li>
          <li v-if="user.phone_number">{{ user.phone_number }}</li>
        </div>
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
</style>