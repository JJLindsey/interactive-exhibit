<template>
  <div class="gallery-container">
<!-- Light Study Mode -->
    <div class="controls-bar">
      <button
        class="light-mode-toggle"
        :class="{ active: lightStudyMode }"
        @click="toggleLightMode"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <span>Light Study Mode</span>
      </button>
      <Transition name="slide-down">
        <div v-if="lightStudyMode" class="light-controls">
          <p>Adjust lighting to explore chiaroscuro effects:</p>
          <div class="control-group">
            <label>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Brightness
            </label>
            <input
              type="range"
              v-model="brightness"
              min="0.5"
              max="1.5"
              step="0.1"
              class="light-slider"
            />
            <span class="value-display">{{ brightness }}</span>
          </div>
          <div class="control-group">
            <label>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M2 12h20"></path>
              </svg>
              Contrast
            </label>
            <input
              type="range"
              v-model="contrast"
              min="0.5"
              max="2"
              step="0.1"
              class="light-slider"
            />
            <span class="value-display">{{ contrast }}</span>
          </div>
          <button class="reset-button" @click="resetLighting">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M3 21v-5h5"></path>
            </svg>
            Reset
          </button>
        </div>
      </Transition>
    </div>

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

    <div v-else-if="error" class="error-state">
      <p class="error-message">{{ error }}</p>
      <button class="retry-button" @click="refetch">Try Again</button>
    </div>
    <div v-else class="gallery-grid">
      <ArtworkCard
        v-for="item in artworks"
        :key="item.id"
        :data="getLightAdjustedData(item)"
        @examine="openModal(item)"
      />
    </div>
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

</template>

<script setup>
import { ref } from 'vue';
import { useMetArtAPI } from '@/composables/useMetArtAPI.js';
import ArtworkCard from './ArtworkCard.vue';
import ArtworkModal2 from './ArtworkModalv2.vue';

const {artworks, loading, error} = useMetArtAPI('baroque');
const modalVisible = ref(false);
const selectedArtwork = ref(null);
const lightStudyMode = ref(false);
const brightness = ref(1);
const contrast = ref(1);

function toggleLightMode() {
  lightStudyMode.value = !lightStudyMode.value;
  if (!lightStudyMode.value) {
    resetLighting();
  }
}

function getLightAdjustedData(item) {
  if (!lightStudyMode.value) return item;

  // Add filter style to the data for the card to use
  return {
    ...item,
    imageStyle: {
      filter: `brightness(${brightness.value}) contrast(${contrast.value})`
    }
  };
}
function resetLighting() {
  brightness.value = 1;
  contrast.value = 1;
}
function openModal(artwork) {
  selectedArtwork.value = artwork;
  modalVisible.value = true;
}
</script>

<style scoped>
.gallery-container {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.controls-bar {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.light-mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(212, 176, 102, 0.1);
  border: 2px solid var(--card-border);
  border-radius: 50px;
  color: var(--muted);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  align-self: flex-start;
}

.light-mode-toggle:hover {
  background: rgba(212, 176, 102, 0.15);
  border-color: var(--gold);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 176, 102, 0.2);
}

.light-mode-toggle.active {
  background: var(--gold);
  color: #1a1412;
  border-color: var(--gold);
}

.light-mode-toggle svg {
  transition: transform 0.3s ease;
}

.light-mode-toggle.active svg {
  transform: rotate(180deg);
}

/* Light Controls */
.light-controls {
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1.5rem;
  background: var(--glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  flex-wrap: wrap;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.control-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 250px;
}

.control-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gold);
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
}

.light-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(212, 176, 102, 0.2);
  outline: none;
  -webkit-appearance: none;
}

.light-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--gold);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(212, 176, 102, 0.4);
}

.light-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(212, 176, 102, 0.6);
}

.light-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--gold);
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.value-display {
  color: var(--muted);
  font-weight: 600;
  font-size: 0.9rem;
  min-width: 2.5rem;
  text-align: center;
}

.reset-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(212, 176, 102, 0.1);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  color: var(--gold);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
}

.reset-button:hover {
  background: var(--gold);
  color: #1a1412;
  transform: translateY(-2px);
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
