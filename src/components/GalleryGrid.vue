<template>
  <div>
    <p v-if="loading">Loading gallery...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else class="gallery-grid">
      <ArtworkCard
        v-for="item in artworks"
        :key="item.id"
        :data="item"
      />
    </div>
    <!-- <div v-if="totalPages > 1" class="pagination">
      <button @click="prevPage" :disabled="page === 1">Prev</button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages">Next</button>
    </div> -->
  </div>
</template>

<script setup>
import { useMetArtAPI } from '@/composables/useMetArtAPI.js';
import ArtworkCard from './ArtworkCard.vue';

const {artworks, loading, error} = useMetArtAPI('baroque');
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background: var(--highlight);
  color: var(--surface);
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
