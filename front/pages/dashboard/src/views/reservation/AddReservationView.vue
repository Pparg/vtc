<script setup>

  import InputNumber from '@/components/InputNumber.vue';
  import TextArea from '@/components/TextArea.vue';

  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import { setMapDefault, handleMap } from '@/utils/address.js'
  import { create as createReservation, adressAreValid } from '@/utils/rides.js'

  import Calendar from '@/components/Calendar.vue';
  import InputHour from '@/components/InputHour.vue';

  let new_reservation = ref({
    departure: '',
    destination: '',
    number_of_people: 1,
    comments: '',
    date: '',
    hour: '',
  })

  let router = useRouter()
  let map = ref(setMapDefault())
  let enabled = ref(false)
  let minDate = (new Date()).toISOString().split('T')[0]
  let maxDate = () => {
    return (new Date( new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate())).toISOString().split('T')[0]
  }

  let markerDetails = ref([{
    id: 0,
    position: map.value.coord
  }]);


  let handleSubmit = async () => {
    try {
      let request = await createReservation(new_reservation.value)
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
        <h2 class="text-xl">Nouvelle réservation</h2>
        <Button :label="'Sauvegarder'" @click="handleSubmit" v-if="enabled" />
      </div>
    </header>
    <article class="flex flex-column gap-2 mb-4">
      <aside class="flex flex-row gap-2">
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
      <aside class="flex flex-column gap-2">
        <label>Destination: </label>
        <GMapAutocomplete placeholder="Cherchez votre addresse" class="border-round-md w-full text-md p-1" @place_changed="setPlace( $event , 0)" />
        <label>Depart: </label>
        <GMapAutocomplete placeholder="Cherchez votre addresse" class="border-round-md w-full text-md p-1" @place_changed="setPlace( $event, 1)" />
      </aside>
    </article>
      <p v-if="invalid_city" class="p_errors">Le service de réservation est dédié uniquement à la ville de Clermont-Ferrand.</p>
    <article>
      <GMapMap :center="map.center" :zoom="map.zoom" map-type-id="terrain" style="width: 100%; height: 20rem" :options="{ zoomControl: true, mapTypeControl: true, scaleControl: true, streetViewControl: true, rotateControl: true, fullscreenControl: true }">
        <GMapMarker v-for="marker in markerDetails" :key="marker.id" :position="marker.position" :draggable="true" :clickable="true"></GMapMarker>
      </GMapMap>
      <div class="flex flex-column gap-2">
        <label>Souhaitez vous precisez d'autre details ?</label>
        <TextArea v-model="new_reservation.comments" />
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped></style>