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
      <h3>{{ data.title }}</h3>
      <p>By {{ data.artist || 'Unknown Artist' }}</p>
      <p>{{ data.date || 'Unknown Date' }}</p>
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
  transform: translateY(-4px);
  border: var(--gold) 1.5px solid;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.9);
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

/* .spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  transition: background 0.15s ease;
} */

.artwork-image-container {
  height: 220px;
  overflow: hidden;
}
.artwork-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.88);
  transition: filter 0.3s ease;
}
.artwork-card:hover .artwork-image {
  filter: brightness(1);
}
.artwork-info {
  padding: 14px;
  color: #E8DCCA;
}
.artwork-info h3 {
  margin: 0 0 6px;
  font-size: 1.1rem;
  color: #D4B066;
}
.artwork-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #E8DCCA;
  opacity: 0.85;
}
</style>
