<template>
  <div class="artwork-card">
    <div class="artwork-image-container">
      <img :src="imageUrl" :alt="data.title" class="artwork-image" />
      <div class="spotlight"></div>
    </div>
    <div class="artwork-info">
      <h3 class="artwork-title">{{ data.title }}</h3>
      <p class="artwork-artist">By {{ data.artist || 'Unknown Artist' }}</p>
      <p class="artwork-year">{{ data.date || 'Unknown Date' }}</p>
      </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const imageUrl = computed(() =>
  props.data.image && props.data.image !== ''
    ? props.data.image
    : 'https://via.placeholder.com/843x843.png?text=No+Image+Available'
);
</script>

<style scoped>
.artwork-card {
  background: #2a1f1c;
  border: 1px solid rgba(212, 176,102, 0.25);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  transition: transform 0.3s ease, box-shadow 0.2s ease, borser 0.2s ease;
}
.artwork-card:hover {
  transform: translateY(-4px);
  border: 1px solid #D4B066;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.9);
}

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
