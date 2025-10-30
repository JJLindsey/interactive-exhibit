import { ref, onMounted } from 'vue';

export function useMetArtAPI(searchQuery = 'Caravaggio Baroque', options = {}) {
  const artworks = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const totalAvailable = ref(0);

  const {
    limit = 16,
    departmentId = 11, // European Paintings
    randomize = false,
    hasImages = true
  } = options;

  const fetchArtworks = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Build search URL with parameters
      const searchParams = new URLSearchParams({
        departmentId: departmentId,
        q: searchQuery,
        ...(hasImages && { hasImages: true })
      });

      const searchRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${searchParams}`
      );
      const searchData = await searchRes.json();

      if (!searchRes.ok || !searchData.objectIDs?.length) {
        artworks.value = [];
        error.value = 'No artworks found for this search.';
        return;
      }

      totalAvailable.value = searchData.total;

      // Get object IDs - randomize if requested
      let objectIDs = searchData.objectIDs;
      if (randomize) {
        // Shuffle the array
        objectIDs = [...objectIDs].sort(() => Math.random() - 0.5);
      }

      // Take only the amount we need
      const selectedIDs = objectIDs.slice(0, limit);

      // Fetch detailed data for each artwork
      const artworksData = await Promise.all(
        selectedIDs.map(async (id) => {
          try {
            const res = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            if (!res.ok) throw new Error(`Object ${id} not found`);
            return res.json();
          } catch (err) {
            console.warn(err.message);
            return null;
          }
        })
      );

      // Map with all necessary fields, filter out nulls and items without images
      artworks.value = artworksData
        .filter(item => item && item.primaryImageSmall)
        .map(item => ({
          id: item.objectID,
          title: item.title || 'Untitled',
          artist: item.artistDisplayName || 'Unknown Artist',
          date: item.objectDate || `${item.objectBeginDate}–${item.objectEndDate}`,
          image: item.primaryImage || item.primaryImageSmall,
          thumbnail: item.primaryImageSmall,
          medium: item.medium || 'Medium not specified',
          dimensions: item.dimensions || 'Dimensions not available',
          department: item.department,
          culture: item.culture,
          creditLine: item.creditLine,
          objectURL: item.objectURL,
          period: item.period,
          classification: item.classification,
          // Fun facts potential
          artistBio: item.artistDisplayBio,
          artistNationality: item.artistNationality,
          objectBeginDate: item.objectBeginDate,
          objectEndDate: item.objectEndDate,
          isHighlight: item.isHighlight,
          accessionYear: item.accessionYear
        }));

      console.log(`Fetched ${artworks.value.length} artworks from ${totalAvailable.value} available`);
    } catch (err) {
      console.error('API Error:', err);
      error.value = 'Failed to load artworks. Please try again.';
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchArtworks);

  return {
    artworks,
    loading,
    error,
    totalAvailable,
    refetch: fetchArtworks
  };
}

// Preset searches for variety
export const BAROQUE_SEARCHES = [
  'Caravaggio',
  'Rembrandt light',
  'Baroque dramatic',
  'chiaroscuro',
  'Vermeer',
  'Rubens',
  'Velázquez'
];

// Helper to get random baroque search
export function getRandomBaroqueSearch() {
  return BAROQUE_SEARCHES[Math.floor(Math.random() * BAROQUE_SEARCHES.length)];
}

// "Did You Know" facts generator
export function getArtworkFact(artwork) {
  const facts = [];

  if (artwork.isHighlight) {
    facts.push(`This is one of the Met's highlighted masterpieces!`);
  }

  if (artwork.accessionYear) {
    const yearsInCollection = new Date().getFullYear() - parseInt(artwork.accessionYear);
    if (yearsInCollection > 100) {
      facts.push(`This artwork has been in the Met's collection for over ${yearsInCollection} years.`);
    }
  }

  if (artwork.objectBeginDate < 1650) {
    facts.push(`Created during the Early Baroque period, when dramatic lighting techniques were revolutionary.`);
  }

  if (artwork.artist === 'Caravaggio') {
    facts.push(`Caravaggio was a fugitive when he painted many of his masterpieces.`);
  }

  if (artwork.artist === 'Rembrandt') {
    facts.push(`Rembrandt was a master of self-portraiture, creating over 80 self-portraits in his lifetime.`);
  }

  if (artwork.medium?.toLowerCase().includes('oil')) {
    facts.push(`Oil painting allowed Baroque artists to achieve unprecedented depth in their shadows.`);
  }

  return facts.length > 0 ? facts[Math.floor(Math.random() * facts.length)] : null;
}
