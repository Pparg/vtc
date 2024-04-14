<script setup>

  import InputNumber from '@/components/InputNumber.vue';
  import TextArea from '@/components/TextArea.vue';

  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import { setMapDefault, handleMap } from '@/utils/address.js'
  import { edit as editReservation, adressAreValid, get as getReservation, reservationIsEditable } from '@/utils/rides.js'

  import Calendar from '@/components/Calendar.vue';
  import InputHour from '@/components/InputHour.vue';

  let props = defineProps({
    reservation_id: {
      type: Number,
      required: true
    }
  })

  let reservation = await getReservation(props.reservation_id)

  let can_edit = reservationIsEditable(reservation)
  let new_reservation = ref(reservation)

  let router = useRouter()
  let enabled = ref(false)
  let minDate = (new Date()).toISOString().split('T')[0]
  let maxDate = () => {
    return (new Date( new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate())).toISOString().split('T')[0]
  }

  let handleSubmit = async () => {
    try {
      let request = await editReservation(props.reservation_id, new_reservation.value)
      if (request.status === 204) {
        router.push({name: 'user_reservation'})
      }
    } catch (error) {
      console.log(error)
    }
  };

  let invalid_city = ref(false)

  let setPlace = (place, index) => {
    let place_details = handleMap(place, index)
    if (place_details.error) {
      invalid_city.value = true
      enabled.value = false
      if (index === 0) {
        new_reservation.value.destination = '',
        markerDetails.value[0] = {}
      } else {
        new_reservation.value.departure = ''
        markerDetails.value[1] = {}
      }
    } else {
      invalid_city.value = false
      if (index === 0) {
        new_reservation.value = {
          ...new_reservation.value,
          destination: place_details.destination
        }
        markerDetails.value[0] = {
          id: 0,
          position: place_details.destination_position,
          test: 'test'
        }
      } else {
        new_reservation.value = {
          ...new_reservation.value,
          departure: place_details.departure
        }
        markerDetails.value[1] = {
          id: 1,
          position :place_details.departure_position
        }
      }
    }
  };

  watch(new_reservation, () => {
    enabled.value = adressAreValid(new_reservation.value.destination, new_reservation.value.departure)
  });

  let getTime = (time) => {
    let array_time = time.split(':')
    return [array_time[0], array_time[1]].join('h')
  };
  let getDate = (date) => {
    let new_date = new Date(date)
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new_date.toLocaleDateString('fr-FR', options);
  };

</script>

<template>
  <section class="p-3">
    <header class="mt-2">
      <Link :to="{ name: 'user_reservation' }" class="w-max">
      <template #content>
        <div class="flex align-items-center gap-2 cursor-pointer w-max">
          <Icon name="arrow-left" />
          <p class="p-0 m-0 text-xs">Retour</p>
        </div>
      </template>
      </Link>
      <div class="flex align-items-center justify-content-between">
        <h2 class="text-xl">Modification d'une réservation</h2>
        <Button :label="'Sauvegarder'" @click="handleSubmit" v-if="enabled" />
      </div>
    </header>
    <article class="flex flex-column gap-2 mb-4">
      <aside class="flex flex-row gap-2" v-if="can_edit">
        <div class="flex flex-column gap-2">
          <label>Jour: </label>
          <Calendar v-model="new_reservation.date" :min="minDate" :max="maxDate()"/>
        </div>
        <div class="flex flex-column gap-2">
          <label>Heure: </label>
          <InputHour v-model="new_reservation.hour" />
        </div>
        <div class="flex flex-column gap-2">
          <label>Passagers:</label>
          <InputNumber v-model="new_reservation.number_of_people" :min="1" :max="4" class="h-full"/>
        </div>
      </aside>
      <aside v-else>
        Date de reservation: {{ getDate(reservation.date) }} {{ getTime(reservation.hour) }}
      </aside>
      <aside class="flex flex-column gap-2">
        <label v-if="can_edit">Destination: </label>
        <span>Destination sauvegardée : {{ reservation.destination }}</span>
        <GMapAutocomplete placeholder="Cherchez votre addresse" class="border-round-md w-full text-md p-1" @place_changed="setPlace( $event , 0)" v-if="can_edit"/>
        <label v-if="can_edit">Depart: </label>
        <span>Depart sauvegardée : {{ reservation.departure }}</span>
        <GMapAutocomplete placeholder="Cherchez votre addresse" class="border-round-md w-full text-md p-1" @place_changed="setPlace( $event, 1)" v-if="can_edit"/>
      </aside>
    </article>
      <p v-if="invalid_city" class="p_errors">Le service de réservation est dédié uniquement à la ville de Clermont-Ferrand.</p>
    <article>
      <div class="flex flex-column gap-2" v-if="can_edit">
        <label>Details de la reservation: </label>
        <TextArea v-model="new_reservation.comments" />
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped></style>