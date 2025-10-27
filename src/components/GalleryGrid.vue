<template>
  <div>
    <p v-if="loading">Loading gallery...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else class="gallery-grid">
      <ArtworkCard
        v-for="art in artworks"
        :key="art.id"
        :data="art"
      />
    </div>
  </div>
</template>

<script setup>
import { useAICArt } from '@/composables/useAICArt';
import ArtworkCard from './ArtworkCard.vue';

const {artworks, loading, error} = useAICArt();
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}
</style>
