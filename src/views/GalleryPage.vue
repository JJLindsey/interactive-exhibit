<template>
  <div class="exhibition-caravaggio">
  <ThemeToggle/>
  <section class="gallery-page">
    <header class="gallery-header">
      <!-- <div class="header-ornament top"></div> -->
      <h1 class="gallery-heading">
        <span class="heading-word" style="--word-index: 0">Caravaggio</span>
        <span class="heading-word" style="--word-index: 1">&</span>
        <span class="heading-word" style="--word-index: 2">the</span>
        <span class="heading-word" style="--word-index: 3">Drama</span>
        <span class="heading-word" style="--word-index: 4">of</span>
        <span class="heading-word" style="--word-index: 5">Light</span>
      </h1>
      <div class="collection-badge">
        <div class="badge-shine"></div>
        <h3>Baroque Collection</h3>
      </div>
      <p class="gallery-sub">
        Exploring chiaroscuro and the drama of light in the works of Caravaggio and other Baroque artists.
      </p>
      <button class="glossary-cta" @click="showGlossary = true">
        Exhibition Info
      </button>
    </header>

    <!-- Need filter and/or search -->
    <!-- <FilterPanel /> -->
    <!-- <SearchBar /> -->
    <!-- <button
      class="glossary-fab"
      @click="showGlossary = true"
      title="Glossary / Learn more"
    >
      ?
    </button> -->
    <GlossaryDialog :visible="showGlossary" @close="closeGlossary" />
    <GalleryGrid />
    <span>© Jennifer Lindsey</span>
  </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GalleryGrid from '@/components/GalleryGrid.vue';
import GlossaryDialog from '@/components/GlossaryDialog.vue';
import '@/styles/exhibition-theme.css';
import ThemeToggle from '@/components/ThemeToggle.vue';

const showGlossary = ref(false);

function closeGlossary() {
  showGlossary.value = false;
}
</script>

<style scoped>
.gallery-page {
  padding: 2rem;
  background: var(--exhibition-bg);
  color: var(--exhibition-gold);
  transition: background var(--exhibition-transition), color var(--exhibtion-transition);
}

.gallery-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.header-ornament {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold) 20%), var(--gold) 80%, transparent;
  margin: 2rem auto;
  max-width: 300px;
  position: relative;
  animation: expandWidth 1.2s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

.header-ornament.top {
  animation-delay: 0.2s;
}

.header-ornament.bottom {
  animation-delay: 1s;
}

@keyframes expandWidth {
  from {
    max-width: 0;
    opacity: 0;
  }
  to {
    max-width: 300px;
    opacity: 1;
  }
}

.header-ornament::before,
.header-ornament::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--exhibition-gold);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  animation: pulse 2s ease-in-out infinite;
}

.header-ornament::before {
  left: 0;
}

.header-ornament::after {
  right: 0;
  animation-delay: 1s;
}

.gallery-heading {
  font-family: var(--font-serif);
  color: var(--exhibition-gold);
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.02em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.heading-word {
  display: inline-block;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  animation-delay: calc(0.4s + (var(--word-index) * 0.2s));
  position: relative;
}

.heading-word::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--exhibition-gold), transparent);
  transform: scaleX(0);
  animation: underlineExpand 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: calc(1s + (var(--word-index) * 0.2s));
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes underlineExpand {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Collection badge */
.collection-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, rgba(212, 176, 102, 0.15), rgba(199, 143, 69, 0.1));
  border: 1px solid var(--exhibition-highlight);
  border-radius: 50px;
  margin: 1.5rem auto;
  position: relative;
  overflow: hidden;
  animation: scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s backwards;
  box-shadow: 0 4px 20px rgba(212, 176, 102, 0.2);
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.badge-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.263) 50%,
    transparent 70%
  );
  animation: badgeShine 3s ease-in-out infinite;
}

@keyframes badgeShine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.collection-badge h3 {
  margin: 0;
  font-family: var(--font-serif);
  color: var(--exhibition-highlight);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.gallery-sub {
  color: var(--exhibition-text);
  opacity: 0.9;
  font-size: 1.25rem;
}

.glossary-section {
  margin: 1rem auto;
  max-width: 800px;
  background: var(--exhibition-glass);
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.glossary-item {
  margin-bottom: 1rem;
}
.glossary-item summary {
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--exhibition-text);
  margin-bottom: 0.5rem;
}
.glossary-item p {
  margin-top: 0.5rem;
  line-height: 1.6;
  color: var(--exhibition-text);
}
.glossary-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: transform 0.2s;
  overflow: visible;
}
.glossary-fab:hover {
  transform: scale(1.1);
}

.glossary-cta {
  display: inline-block;
  margin-top: 1rem;
  background: var(--exhibition-accent);
  color: white;
  font-size: large;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.glossary-cta:hover {
  background: var(--exhibition-gold);
  transform: scale(1.05);
}

/* mobile media queris */
@media (max-width: 480px) {
  .gallery-page {
    padding: 1rem 0.75rem;
  }

  .gallery-header {
    margin-bottom: 2rem;
  }

  .gallery-heading {
    font-size: clamp(1.25rem, 7vw, 1.8rem);
    gap: 0.25rem;
    line-height: 1.5;
  }

  h3 {
    font-size: 0.9rem;
    margin: 0.75rem 0;
  }
}
</style>
