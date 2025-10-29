<template>
  <div class="artwork-card" @mousemove="moveLight" @mouseleave="resetLight" @click="examine" :style="{ '--card-index': cardIndex }">
    <div class="spotlight" :style="lightStyle"></div>
    <div class="frame-shine"></div>

    <div class="artwork-image-container">
      <img
        :src="imageUrl"
        :alt="data.title"
        class="artwork-image"
        @load="onImageLoad"
      />
      <div class="image-overlay">
        <div class="examine-prompt">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <span>Examine</span>
        </div>
      </div>
    </div>
    <div class="artwork-info">
      <h3 class="artwork-title">{{ data.title }}</h3>
      <p class="artwork-artist">By {{ data.artist || 'Unknown Artist' }}</p>
      <p class="artwork-date">{{ data.date || 'Unknown Date' }}</p>
      <div class="card-accent"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  data: Object
});
const emit = defineEmits(['examine']);

const lightX = ref(50);
const lightY = ref(50);
const imageLoaded = ref(false);
const cardIndex = ref(props.index || 0);
const lightStyle = computed(() => ({
  background: `radial-gradient(500px 350px at ${lightX.value}% ${lightY.value}%, rgba(212,176,102,0.15), transparent 70%)`
}));

function moveLight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  lightX.value = ((event.clientX - rect.left) / rect.width) * 100;
  lightY.value = ((event.clientY - rect.top) / rect.height) * 100;
}

function resetLight() {
  lightX.value = 20;
  lightY.value = 15;
}

const imageUrl = computed(() =>
  props.data.image && props.data.image !== ''
    ? props.data.image
    : 'https://via.placeholder.com/843x843.png?text=No+Image+Available'
);

function onImageLoad() {
  imageLoaded.value = true;
}

function examine() {
  emit('examine', props.data);
}

onMounted(() => {
  cardIndex.value = props.index || Math.floor(Math.random() * 20);
});

</script>

<style scoped>
.artwork-card {
  background: var(--surface);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4s, 0, 0.2,1);
  position: relative;
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  animation-delay: calc(var(--card-index) * 0.05s);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.artwork-card:hover {
  transform: translateY(-8px) scale(1.02);
  border: var(--gold);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(212, 176, 102, 0.3),
    inset 0 1px 0 rgba(212, 176, 102, 0.1);
}

.frame-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  pointer-events: none;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(212, 176, 102, 0.1) 50%,
    transparent 70%
  );
  transform: translateX(-100%) translateY(-100%) rotate(45deg);
  z-index: 2;;
}

.artwork-card:hover .frame-shine {
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  to {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
}

.spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.artwork-card:hover .frame-shine {
  opacity: 1;
}

.artwork-image-container {
  height: 280px;
  overflow: hidden;
  position: relative;
  background: #1a1412;
}

.artwork-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.85) contrast(1.05);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.artwork-card:hover .artwork-image {
  filter: brightness(1) contrast(1.1);
  transform: scale(1.02);
}

.artwork-info {
  padding: 14px;
  color: var(--muted);
}
.artwork-title {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: var(--gold);
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}
.artwork-card:hover .artwork-title {
  color: var(--highlight);
}
.artwork-artist {
  margin: 0 0 0.25rem;
  font-size: 0.95rem;
  color: var(--muted);
  font-weight: 500;
  opacity: 0.9;
}
.artwork-date {
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
  opacity: 0.7;
  font-style: italic;
}

.card-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--gold),
    transparent
  );
  transform: scaleX(0);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.artwork-card:hover .card-accent {
  transform: scaleX(1);
}
</style>
