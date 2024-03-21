<script setup>

  import Image1 from '@/assets/images/home_1.jpg'
  import Image2 from '@/assets/images/home_2.jpg'
  import Image3 from '@/assets/images/home_3.jpg'

</script>

<template>
  <section class="flex flex-column align-items-center w-12">
    <article>
      <h2 class="flex m-0">Réservez Votre Trajet en Toute Simplicité</h2>
      <img :src="Image1" class="image_default image"/>
    </article>
    <article class="flex flex-column align-items-center w-12">
      <h2 class="">Bienvenue à 63VTC</h2>
      <Card :border="false">
        <template #content>
          <aside class="flex w-12"> 
            <img :src="Image2" class="w-6 image_default"/>
            <div class="w-6 flex flex-column align-items-center justify-content-center ml-4">
              <h4>Votre partenaire de confiance pour des trajets exceptionnels</h4>
              <p>Bienvenue sur VTC Express Clermont, votre service de réservation de VTC de premier choix à Clermont-Ferrand et ses environs (63000). Nous nous engageons à vous offrir une expérience de voyage exceptionnelle, alliant confort, fiabilité et professionnalisme.</p>
            </div>
          </aside>
        </template>
      </Card>
    </article>
    <article class="flex flex-column align-items-center w-12">
      <h2>Pourquoi chosir 63VTC ?</h2>
      <div class="flex gap-4 mx-4">
        <Card class="bg-accent flex flex-column align-items-center w-4">
          <template #title>
            <h3 class="m-0 text-base w-max">Confort et élégance</h3>
          </template>
          <template #content>
            <p class="text-sm p-0">Voyagez dans le luxe et le confort de nos véhicules haut de gamme. Que ce soit pour un déplacement professionnel, une escapade en ville ou un transfert vers l'aéroport, notre flotte de VTC répond à toutes vos exigences.</p>
          </template>
        </Card>
        <Card class="bg-accent flex flex-column align-items-center w-4">
          <template #title>
            <h3 class="m-0 text-base w-max">Réservation Facile et Rapide</h3>
          </template>
          <template #content>
            <p class="text-sm p-0">Notre plateforme de réservation conviviale vous permet de réserver votre VTC en quelques clics. Indiquez votre lieu de départ, votre destination, et choisissez le véhicule qui correspond à vos besoins.</p>
          </template>
        </Card>
        <Card class="bg-accent flex flex-column align-items-center w-4">
          <template #title>
            <h3 class="m-0 text-base w-max">Chauffeurs Professionnels</h3>
          </template>
          <template #content>
            <p class="text-sm p-0">Nos chauffeurs expérimentés et courtois sont à votre service. Ils connaissent la région de Clermont-Ferrand et vous assurent un trajet agréable et sécurisé.</p>
          </template>
        </Card>
      </div>
    </article>
    <article class="my-5">
      <Card :border="false">
        <template #content>
          <aside class="flex flex-row ">
            <img :src="Image3" class="w-6 image_default" />
            <div class="w-6 flex flex-column align-items-center justify-content-center ml-4">
              <h4>Réservez Votre VTC dès Aujourd'hui !</h4>
              <p>VTC Express Clermont vous offre une solution de transport fiable, élégante et facile d'utilisation. Réservez votre VTC dès aujourd'hui et découvrez la différence.</p>
              <p>Bienvenue à bord de VTC Express Clermont - Votre Destination, Notre Priorité.</p>
              <Button :to="{name: 'dashboard'}" :label="'Connexion'"/>
            </div>
          </aside>
        </template>
      </Card>
    </article>
  </section>
</template>

<style lang="scss" scoped>

.image {
  width: 100vw;
}

.image_default {
  height: calc(100vh - 60px);
  object-fit: cover;
}

</style>