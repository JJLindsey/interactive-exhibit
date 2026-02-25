#  Interactive Exhibit — Caravaggio & the Drama of Light
An interactive virtual gallery built with Vue 3, exploring chiaroscuro and Baroque artistry through the Metropolitan Museum of Art's public API.

## Overview
This app pulls live data from The Met Collection API to present an immersive, museum-style experience centered on Caravaggio and the Baroque tradition. Visitors can explore artwork, examine details up close, and learn about the dramatic use of light that defines the period.

### Features

- Gallery Grid — Browse Baroque artworks fetched dynamically from The Met's open-access collection
- Artwork Detail Modal — Click any piece to open a full-screen view with:
  * Zoom & pan (click to toggle 2.5× magnification, mouse-tracking zoom)
  * Metadata: title, artist, date, medium, dimensions, culture, department
  * Credit line and direct link to the Met Museum website

- Light Study Mode — Adjust simulated lighting to explore chiaroscuro effects interactively
- Glossary / Exhibition Info Dialog — Contextual information about Baroque art and key terms
- Theme Toggle — Switch between light and dark exhibition themes
- Smooth transitions — Vue <Transition> animations on modal open/close and panel reveals

### Tech Stack
| Layer | Technology |
| ------ | ------------- |
Framework | Vue 3 (Composition API) 
Data | The Metropolitan Museum of Art Collection API
Styling | Scoped CSS with CSS custom properties
Animations | Vue Transitions + CSS keyframes

### API
This project uses The Metropolitan Museum of Art's free, open-access API — no API key required.
Base URL: https://collectionapi.metmuseum.org/public/collection/v1

### Project Structure
```
src/
├── components/
│   ├── GalleryGrid.vue       # Main artwork grid
│   ├── ArtworkModal.vue      # Detail view with zoom
│   ├── GlossaryDialog.vue    # Exhibition info & art terms
|   ├── ArtworkCard.vuw       # Artwork
│   └── ThemeToggle.vue       # Light/dark theme switcher
├── views/
│   └── GalleryPage.vue       # Main page layout
├── composables/
│   └── useMetArtAPI.js       # fetch & filter artwork from Met API
└── styles/
    └── exhibition-theme.css  # CSS variables & themes
```

### License
© Jennifer Lindsey. All rights reserved.
Artwork data and images are provided by The Metropolitan Museum of Art under their Open Access policy.