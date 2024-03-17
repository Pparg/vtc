<script setup>

  import { onMounted, ref } from 'vue';

  import { create as createAddress } from '@/utils/address';

  import { useRouter } from 'vue-router';

  import Link from '@/components/Link.vue';
  import Button from '@/components/Button.vue';
  import Icon from '@/components/Icon.vue';
  import InputText from '@/components/InputText.vue';

  let router = useRouter()
  let enabled = ref(false)

  let marker_coord = ref({lat: 45.7766, lng: 3.0821})
  let map_center = ref({ lat: 45.783329, lng: 3.08333 })
  let zoom_level = ref(12)

  let new_address = ref({
    name: '',
  })

  const markerDetails = ref({
    id: 1,
    position: marker_coord.value
  });

  let setPlace = (place) => {
    if (place.geometry) {
      let formated_address = [place.address_components[0].long_name, place.address_components[1].long_name].join(' ')
      new_address.value = {
        ...new_address.value,
        city: place.address_components[2].long_name,
        zip_code: place.address_components[6].long_name,
        country: place.address_components[5].short_name,
        longitude: place.geometry.location.lng(),
        latitude: place.geometry.location.lat(),
        address: formated_address
      }
      enabled.value = true
      markerDetails.value = {
        ...markerDetails.value,
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      }
      map_center.value = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      zoom_level.value = 15
    } else {
      enabled.value = false
    }
  };

  let handleSubmit = async () => {
    try {
      let request = await createAddress(new_address.value)
      if (request.status === 204) {
        router.push({name: 'user_address'})
      }
    } catch (error) {
      console.log(error)
    }
  };

</script>

<template>
  <section class="px-3">
    <header class="mt-2">
      <Link :to="{name: 'user_address'}">
        <template #content>
          <div class="flex align-items-center gap-2 cursor-pointer w-max">
            <Icon name="arrow-left" />
            <p class="p-0 m-0 text-xs">Retour</p>
          </div>
        </template>
      </Link >
      <div class="flex align-items-center justify-content-between">
        <h2 class="text-xl">Ajouter une nouvelle addresse</h2>
        <Button :label="'Sauvegarder'" @click="handleSubmit" v-if="enabled"></Button>
      </div>
    </header>
    <article class="flex flex-column gap-2">
      <InputText v-model="new_address.name" placeholder="Ex: Maison" />
      <GMapAutocomplete placeholder="Cherchez votre addresse" class="border-round-md w-full m-0 p-0 mb-3 text-md py-1" @place_changed="setPlace"/>
    </article>
    <article>
      <GMapMap :center="map_center" :zoom="zoom_level" map-type-id="terrain" style="width: 100%; height: 20rem" :options="{ zoomControl: true, mapTypeControl: true, scaleControl: true, streetViewControl: true, rotateControl: true, fullscreenControl: true }">
        <GMapMarker :key="markerDetails.id" :position="markerDetails.position" :draggable="false"></GMapMarker>
      </GMapMap>
    </article>
  </section>
</template>

<style lang="scss" scoped></style>