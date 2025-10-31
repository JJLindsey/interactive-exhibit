<template>
  <div class="center">
    <button @click="toggleTheme" class="theme-toggle">
      {{  theme === 'gallery' ? 'Conservator Light' : 'Night Gallery' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted,watch } from 'vue';

const theme = ref('gallery');

onMounted(() => {
  const savedTheme = localStorage.getItem('exhibition-theme');
  if (savedTheme) theme.value = savedTheme;
  applyTheme();
});

function applyTheme() {
  const exhibitionEl = document.querySelector('.exhibition-caravaggio');
  if (exhibitionEl) {
    exhibitionEl.setAttribute('data-exhibition-theme', theme.value);
  }
  localStorage.setItem('exhibition-theme', theme.value);
}

function toggleTheme() {
  theme.value = theme.value === 'gallery' ? 'conservator' : 'gallery';
  applyTheme();
}
watch(theme, applyTheme);

</script>
<style scoped>
.theme-toggle {
background: var(--exhibition-surface);
color: var(--exhibition-text);
border: 1px solid var(--exhibition-border);
padding: 0.5rem 1rem;
margin-right: 3rem;
border-radius: var(--exhibition-radius);
font-family: var(--exhibition-font-sans );
cursor: pointer;
transition: all var(--exhibition-transition);
}

.theme-toggle:hover {
  background: var(--exhibition-glass);
  border-color: var(--exhibition-accent);
}
.center {
  display: flex;
  justify-content: right;
  padding: 1rem 0;
}
</style>
