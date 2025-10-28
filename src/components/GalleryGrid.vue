<template>
  <div>
    <p v-if="loading">Loading gallery...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else class="gallery-grid">
      <ArtworkCard
        v-for="item in artworks"
        :key="item.id"
        :data="item"
        @examine="openModal(item)"
      />

      <ArtworkModal
        v-if="modalVisible"
        :visible="modalVisible"
        :data="selectedArtwork"
        @close="modalVisible = false"
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
import { ref } from 'vue';
import { useMetArtAPI } from '@/composables/useMetArtAPI.js';
import ArtworkCard from './ArtworkCard.vue';
import ArtworkModal from './ArtworkModal.vue';

const {artworks, loading, error} = useMetArtAPI('baroque');
const modalVisible = ref(false);
const selectedArtwork = ref(null);

function openModal(artwork) {
  selectedArtwork.value = artwork;
  modalVisible.value = true;
}
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
