<script setup>

  import { getRidesSummary } from '@/utils/rides.js'
  import { useAuthStore } from '@/store/auth/authStore';

  let authStore = useAuthStore();
  let current_user = authStore.getUser

  let activity = await getRidesSummary();

  let setAdress = (adress) => {
    return adress.split(', 6')[0]
  };

  let getTime = (time) => {
    let array_time = time.split(':')
    return [array_time[0], array_time[1]].join('h')
  };

</script>

<template>
  <section class="px-3">
    <header>
      <h2>Mon activité</h2>
    </header>
    <article class="flex flex-column gap-3">
      <Card v-if="activity.passed.length > 0">
        <template #title>
          <h4 class="m-0">Dernieres reservation</h4>
        </template>
        <template #content>
          <aside>
            <table class="w-12 mt-2" >
              <thead class="">
                <th class="text-xs text-left pb-2">Date</th>
                <th class="text-xs text-left pb-2">Heure</th>
                <th class="text-xs text-left pb-2">Départ</th>
                <th class="text-xs text-left pb-2">Destination</th>
              </thead>
              <tbody>
                <tr v-for="reservation in activity.passed">
                  <th class="text-xxs text-left">{{ reservation.date }}</th>
                  <th class="text-xxs text-left">{{ getTime(reservation.hour) }}</th>
                  <th class="text-xxs text-left">{{ setAdress(reservation.departure) }}</th>
                  <th class="text-xxs text-left">{{ setAdress(reservation.destination) }}</th>
                </tr>
              </tbody>
            </table>
            <Link :to="{name: 'user_reservation'}" v-if="['admin', 'user'].includes(current_user.role)">
              <template #content>
                <div class="flex align-items-center gap-2 my-2">
                  <p class="text-accent text-xs m-0">Toutes mes reservation</p>
                  <Icon :name="'arrow-right'" :color="'#459ECC'" />
                </div>
              </template>
            </Link>
            <Link :to="{name: 'chofer_reservations'}" v-else-if="['chofer'].includes(current_user.role)">
              <template #content>
                <div class="flex align-items-center gap-2 my-2">
                  <p class="text-accent text-xs m-0">Toutes mes reservation</p>
                  <Icon :name="'arrow-right'" :color="'#459ECC'" />
                </div>
              </template>
            </Link>
          </aside>
        </template>
      </Card>
      <Card>
        <template #title>
          <h4 class="m-0">À venir</h4>
        </template>
        <template #content>
          <aside v-if="activity.pending.length > 0">
            <table class="w-12 mt-2" >
              <thead class="">
                <th class="text-xs text-left pb-2">Date</th>
                <th class="text-xs text-left pb-2">Heure</th>
                <th class="text-xs text-left pb-2">Départ</th>
                <th class="text-xs text-left pb-2">Destination</th>
              </thead>
              <tbody>
                <tr v-for="reservation in activity.pending">
                  <th class="text-xxs text-left">{{ reservation.date }}</th>
                  <th class="text-xxs text-left">{{ getTime(reservation.hour) }}</th>
                  <th class="text-xxs text-left">{{ setAdress(reservation.departure) }}</th>
                  <th class="text-xxs text-left">{{ setAdress(reservation.destination) }}</th>
                </tr>
              </tbody>
            </table>
            <Link :to="{name: 'user_reservation'}" v-if="['admin', 'user'].includes(current_user.role)">
              <template #content>
                <div class="flex align-items-center gap-2 my-2">
                  <p class="text-accent text-xs m-0">Toutes mes reservation</p>
                  <Icon :name="'arrow-right'" :color="'#459ECC'" />
                </div>
              </template>
            </Link>
            <Link :to="{name: 'chofer_reservations'}" v-else-if="['chofer'].includes(current_user.role)">
              <template #content>
                <div class="flex align-items-center gap-2 my-2">
                  <p class="text-accent text-xs m-0">Toutes mes reservation</p>
                  <Icon :name="'arrow-right'" :color="'#459ECC'" />
                </div>
              </template>
            </Link>
          </aside>
          <aside v-else-if="['admin', 'user'].includes(current_user.role)" class="flex flex-column align-items-center gap-2">
            <p class="text-xs">Commencer dès maintenant</p>
            <Button :label="'Faire un déplacement'" :to="{name: 'new_reservation'}" v-if="true" />
          </aside>
          <aside v-else class="flex flex-column align-items-center gap-2">
            <p class="text-xs">Pas de reservation effectué</p>
          </aside>
        </template>
      </Card>
    </article>
    <article>
      <h4>Actualitées</h4>
      <aside class="flex gap-3">
        <Card class="bg-primary text-reverse-color " :border="false">
          <template #title>
            <h5 class="m-0">Clermont accueille un concert en plein air avec des artistes locaux</h5>
          </template>
          <template #content>
            <div>
              <p class="text-xs">Clermont organise un concert gratuit en plein air avec des artistes locaux au parc
                central. Venez profiter de la musique locale dans un cadre agréable.</p>
            </div>
          </template>
        </Card>
        <Card class="bg-primary text-reverse-color " :border="false">>
          <template #title>
            <h5 class="m-0">Ouverture d'un nouveau parc urbain pour les familles</h5>
          </template>
          <template #content>
            <div>
              <p class="text-xs"> Clermont ouvre un parc urbain avec aires de jeux, pistes cyclables et zones de
                pique-nique pour améliorer la qualité de vie des résidents.</p>
            </div>
          </template>
        </Card>
      </aside>
    </article>
  </section>
</template>

<style lang="scss" scoped></style>