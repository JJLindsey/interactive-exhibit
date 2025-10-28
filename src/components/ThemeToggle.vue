<template>
  <div class="center">
    <button @click="toggleTheme" class="theme-toggle">
      {{  theme === 'gallery' ? 'Conservator Light' : 'Night Gallery' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const theme = ref('gallery');

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.value = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', theme.value);
  }
});

function toggleTheme() {
  theme.value = theme.value === 'gallery' ? 'conservator' : 'gallery';
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem('theme', theme.value);
}
</script>
<style scoped>
.theme-toggle {
background: var(--surface);
color: var(--gold);
border: 1px solid var(--card-border);
padding: 0.5rem 1rem;
margin-right: 3rem;
border-radius: var(--radius);
font-family: var(--font-sans );
cursor: pointer;
transition: all var(--transition);
}

.theme-toggle:hover {
  background: var(--glass);
  border-color: var(--gold);
}
</style>
