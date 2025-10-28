<template>
  <div v-show="visible" class="modal-overlay" @click.self="close">
      <div class="spotlight"></div>
    <div class="modal-content">
      <img :src="data.image" :alt="data.title" class="modal-image" />
      <div class="modal-info">
        <h2>{{ data.title }}</h2>
        <p><strong>Artist:</strong> {{ data.artist }}</p>
        <p><strong>Year:</strong>{{ data.date }}</p>
        <p><strong>Gallery:</strong>{{ data.gallery }}</p>
        <p v-if="data.commentary">{{ data.commentary }}</p>
        <button @click="close" class="close-button">Close</button>
      </div>
      <div class="spotlight"></div>
    </div>
  </div>
</template>

<script setup>
//import {onMounted} from 'vue';

const {data, visible} = defineProps({
  data: Object,
  visible: Boolean
});
const emit = defineEmits(['close']);

function close() {
  emit('close');
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-content {
  position: relative;
  background: var(--surface);
  padding: 2rem;
  border-radius: var(--radius);
  max-width: 800px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  overflow: hidden;
}

/* Modal info panel */
.modal-info h2 {
  margin: 0 0 0.5rem;
  color: var(--highlight);
}
.modal-info p {
  margin: 0.25rem 0;
  color: var(--muted);
}
.close-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--highlight);
  color: var(--surface);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
}

/* Spotlight */
.spotlight {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    600px 300px at 20% 15%,
    rgba(255,220,160,0.06),
    rgba(0,0,0,0.3)
  );
  mix-blend-mode: overlay;
  transition: opacity var(--transition);
}
</style>
