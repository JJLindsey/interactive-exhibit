<template>
  <div>
    <div v-if="loading" class="loading-state">
      <div class="loading content">
        <div class="gallery loader">
          <div class="frame frame-1"></div>
          <div class="frame frame-2"></div>
          <div class="frame frame-3"></div>
          <div class="frame frame-4"></div>
        </div>
        <p class="loading-text">Curating gallery...</p>
      </div>
    </div>
    <p v-else-if="error">{{ error }}</p>

    <div v-else class="gallery-grid">
      <ArtworkCard
        v-for="item in artworks"
        :key="item.id"
        :data="item"
        @examine="openModal(item)"
      />

      <ArtworkModal2
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
import ArtworkModal2 from './ArtworkModalv2.vue';

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

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.loading-content {
  text-align: center;
}
.gallery-loader {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
}

.frame {
  position: absolute;
  border: 3px solid var(--gold);
  animation: rotateFrames 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
.frame-1 {
  width: 80px;
  height: 80px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0s;
}
.frame-2 {
  width: 70px;
  height: 70px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0.2s;
}
.frame-3 {
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0.4s;
}
.frame-4 {
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0.6s;
}
@keyframes rotateFrames {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
    opacity: 1;
  }
  25% {
    transform: translate(-50%, -50%) rotate(90deg) scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg) scale(1);
    opacity: 1;
  }
  75% {
    transform: translate(-50%, -50%) rotate(270deg) scale(0.9);
    opacity: 0.7;
  }
}

.loading-text {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--gold);
  margin: 0 0 1rem;
  animation: pulse 3s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
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
