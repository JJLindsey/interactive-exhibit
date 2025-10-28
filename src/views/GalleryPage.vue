<template>
  <section class="gallery-page">
    <header class="gallery-header">
      <h1 class="gallery-heading">Caravaggio & the Drama of Light</h1>
      <h3>Baroque Collection </h3>
      <p class="gallery-sub">
        Exploring chiaroscuro and the drama of light in the works of Caravaggio and other Baroque artists.
      </p>
    </header>

    <!-- Need filter and/or search -->
    <!-- <FilterPanel /> -->
    <!-- <SearchBar /> -->

    <!-- The dynamic grid of artworks -->
    <GalleryGrid />
  </section>
</template>

<script setup>
import GalleryGrid from '@/components/GalleryGrid.vue';
</script>

<style scoped>
.gallery-page {
  padding: 2rem;
  background: var(--bg);
  color: var(--muted);
  transition: background var(--transition), color var(--transition);
}

.gallery-header {
  text-align: center;
  margin-bottom: 2rem;
}

.gallery-heading {
  font-family: var(--font-serif);
  color: var(--gold);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.gallery-sub {
  color: var(--muted);
  opacity: 0.9;
  font-size: 1rem;
}
</style>
