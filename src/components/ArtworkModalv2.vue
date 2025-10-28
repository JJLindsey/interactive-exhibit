<template>
  <Transition name="modal">
    <div v-if="visible" class="modal-backdrop" @click="closeModal">
      <div class="modal-container" @click.stop>
        <button class="close-btn" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="modal-content">
          <div class="image-section" @mousemove="handleZoom" @mouseleave="resetZoom">
            <div class="image-wrapper" :class="{ 'zoomed': isZoomed }">
              <img
                ref="imageRef"
                :src="imageUrl"
                :alt="data?.title"
                class="modal-image"
                :style="imageStyle"
                @click="toggleZoom"
              />
              <div v-if="!isZoomed" class="zoom-hint">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <span>Click to examine details</span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <div class="info-header">
              <h2>{{ data?.title || 'Untitled' }}</h2>
              <div class="metadata">
                <p class="artist">{{ data?.artist || 'Unknown Artist' }}</p>
                <p class="date">{{ data?.date || 'Date Unknown' }}</p>
              </div>
            </div>

            <div class="details-grid">
              <div v-if="data?.medium" class="detail-item">
                <span class="detail-label">Medium</span>
                <span class="detail-value">{{ data.medium }}</span>
              </div>
              <div v-if="data?.dimensions" class="detail-item">
                <span class="detail-label">Dimensions</span>
                <span class="detail-value">{{ data.dimensions }}</span>
              </div>
              <div v-if="data?.department" class="detail-item">
                <span class="detail-label">Department</span>
                <span class="detail-value">{{ data.department }}</span>
              </div>
              <div v-if="data?.culture" class="detail-item">
                <span class="detail-label">Culture</span>
                <span class="detail-value">{{ data.culture }}</span>
              </div>
            </div>

            <div v-if="data?.creditLine" class="credit">
              {{ data.creditLine }}
            </div>

            <a
              v-if="data?.objectURL"
              :href="data.objectURL"
              target="_blank"
              class="met-link"
            >
              View on Met Museum Website →
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emit = defineEmits(['close']);

const imageRef = ref(null);
const isZoomed = ref(false);
const zoomX = ref(50);
const zoomY = ref(50);

const imageUrl = computed(() =>
  props.data?.image && props.data.image !== ''
    ? props.data.image
    : 'https://via.placeholder.com/800x800.png?text=No+Image+Available'
);

const imageStyle = computed(() => {
  if (!isZoomed.value) return {};
  return {
    transform: `scale(2.5)`,
    transformOrigin: `${zoomX.value}% ${zoomY.value}%`,
    cursor: 'zoom-out'
  };
});

function handleZoom(event) {
  if (!isZoomed.value) return;

  const rect = event.currentTarget.getBoundingClientRect();
  zoomX.value = ((event.clientX - rect.left) / rect.width) * 100;
  zoomY.value = ((event.clientY - rect.top) / rect.height) * 100;
}

function toggleZoom() {
  isZoomed.value = !isZoomed.value;
}

function resetZoom() {
  if (isZoomed.value) {
    isZoomed.value = false;
  }
}

function closeModal() {
  isZoomed.value = false;
  emit('close');
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(8px);
}

.modal-container {
  background: linear-gradient(135deg, #1a1412 0%, #2a1f1c 100%);
  border: 1px solid rgba(212, 176, 102, 0.3);
  border-radius: 16px;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--highlight);
  color: var(--surface);
  border: 1px solid rgba(212, 176, 102, 0.3);
  border-radius: var(--radius);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-btn:hover {
  background: var(--gold);
  color: #1a1412;
  transform: rotate(90deg);
}

.modal-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  overflow-y: auto;
  max-height: 90vh;
}

.image-section {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d0a09;
  position: relative;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  background: #1a1412;
}

.image-wrapper.zoomed {
  cursor: move;
}

.modal-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  cursor: zoom-in;
  transition: transform 0.1s ease-out;
  border-radius: 4px;
}

.zoom-hint {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(212, 176, 102, 0.95);
  color: #1a1412;
  padding: 0.75rem 1.5rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
  50% { opacity: 0.7; transform: translateX(-50%) scale(1.05); }
}

.info-section {
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-header h2 {
  margin: 0 0 1rem;
  font-size: 2rem;
  color: var(--gold);
  font-weight: 700;
  line-height: 1.2;
}

.metadata {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.artist {
  font-size: 1.2rem;
  color: var(--muted);
  font-weight: 500;
  margin: 0;
}

.date {
  font-size: 1rem;
  color: var(--gold);
  opacity: 0.8;
  margin: 0;
}

.details-grid {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(212, 176, 102, 0.05);
  border: 1px solid rgba(212, 176, 102, 0.15);
  border-radius: 8px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gold);
  font-weight: 600;
}

.detail-value {
  font-size: 0.95rem;
  color: var(--muted);
}

.credit {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-left: 3px solid #D4B066;
  font-size: 0.85rem;
  color: var(--muted);
  opacity: 0.7;
  font-style: italic;
}

.met-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--highlight);
  color: #1a1412;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.met-link:hover {
  background: var(--muted);
  transform: translateX(4px);
}

/* Modal transitions */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container {
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
}

/* Responsive */
@media (max-width: 968px) {
  .modal-content {
    grid-template-columns: 1fr;
  }

  .modal-image {
    max-height: 50vh;
  }
}
</style>
