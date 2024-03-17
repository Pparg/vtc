<script setup>

  import { ref } from 'vue'

  import { useRouter } from 'vue-router';

  import { edit as editAddress, get as getAddress} from '@/utils/address.js'
  
  let props = defineProps({
    address_id: {
      type: Number,
      required: true
    }
  });

  let enabled = ref(false)
  let router = useRouter()
  let address = await getAddress(props.address_id)

  let edited_address = ref(address)

  let map_center = ref({
    lat: address.latitude,
    lng: address.longitude
  })
  let zoom_level = ref(15)
  let marker_details = ref({
    id: 1,
    position: {
      lat: address.latitude,
      lng: address.longitude
    }
  })

  let setPlace = (place) => {
    if (place.geometry) {
     
    }
  }

  let handleEdit = async () => {
    try {

    } catch (error) {
      console.log(error)
    }
  };

</script>

<template>
  <section class="mx-3">
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
        <h2 class="text-xl">Modification d'une addresse</h2>
        <Button :label="'Sauvegarder'" @click="handleEdit" v-if="enabled"></Button>
      </div>
    </header>
    <article class="flex flex-column gap-2" >
      <InputText v-model="edited_address.name" />
      <GMapAutocomplete placeholder="Cherchez votre addresse" class="border-round-md w-full m-0 p-0 mb-3 text-md py-1" @place_changed="setPlace"/>
    </article>
    <article>
      <GMapMap :center="map_center" :zoom="zoom_level" map-type-id="terrain" style="width: 100%; height: 20rem" :options="{ zoomControl: true, mapTypeControl: true, scaleControl: true, streetViewControl: true, rotateControl: true, fullscreenControl: true }">
        <GMapMarker :key="marker_details.id" :position="marker_details.position" :draggable="false"></GMapMarker>
      </GMapMap>
    </article>
  </section>
</template>

<style lang="scss" scoped>

</style>