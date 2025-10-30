<template>
  <transition name="fade">
    <div v-if="visible" class="glossary-overlay" @click.self="$emit('close')">
      <div class="glossary-content">
        <button class="close-btn" @click="$emit('close')">×</button>
        <h2>Exhibition Information</h2>
        <p class="info-item">
          The <strong>Baroque</strong> era (1600–1750) was defined by drama,
          movement, and intense contrasts of light and shadow. The term was originally derogatory and may be derived from the Portuguese word barroco, meaning an irregular pearl.
        </p>
        <p class="info-item">
          <strong>Chiaroscuro</strong> means “light-dark” in Italian and describes
          the dramatic lighting technique that gives depth and realism to scenes. While the use of chiaroscuro dates back to the Renaissance, it was popular during the Baroque period by artists like Caravaggio, who used it to heighten emotional intensity.
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
  defineProps({
    visible: Boolean
  });
</script>

<style scoped>

.glossary-overlay {
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.glossary-content {
  background: var(--glass-strong);
  border: 0.5px solid var(--card-border);
  padding: 3rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  color: var(--gold);
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.info-item {
  margin-bottom: 1rem;
  color: var(--muted);
  line-height: 1.5;
  font-size: 1.25rem;
}
</style>
