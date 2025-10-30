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
      // Always include 'Baroque'
      const finalQuery = searchQuery.toLowerCase().includes('baroque')
        ? searchQuery
        : `${searchQuery} Baroque`;

      const searchParams = new URLSearchParams({
        departmentId: departmentId,
        q: finalQuery,
        ...(hasImages && { hasImages: true })
      });

      const searchRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${searchParams}`
      );
      const searchData = await searchRes.json();

      if (!searchRes.ok || !searchData.objectIDs?.length) {
        artworks.value = [];
        error.value = `No Baroque artworks found for “${finalQuery}”.`;
        return;
      }

      totalAvailable.value = searchData.total;

      let objectIDs = searchData.objectIDs;
      if (randomize) objectIDs = [...objectIDs].sort(() => Math.random() - 0.5);

      const selectedIDs = objectIDs.slice(0, limit * 3);

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

      // Filter for Baroque-period works
      const baroqueFiltered = artworksData.filter(item => {
        if (!item) return false;
        const isBaroquePeriod =
          item.period?.toLowerCase().includes('baroque') ||
          (item.objectBeginDate >= 1580 && item.objectBeginDate <= 1750) ||
          (item.objectEndDate >= 1580 && item.objectEndDate <= 1750);
        return isBaroquePeriod && item.primaryImageSmall;
      });

      artworks.value = baroqueFiltered
        .slice(0, limit)
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
          artistBio: item.artistDisplayBio,
          artistNationality: item.artistNationality,
          objectBeginDate: item.objectBeginDate,
          objectEndDate: item.objectEndDate,
          isHighlight: item.isHighlight,
          accessionYear: item.accessionYear
        }));

      if (!artworks.value.length) {
        error.value = 'No confirmed Baroque artworks found — try another keyword like “Rembrandt” or “Rubens”.';
      }

      console.log(`Fetched ${artworks.value.length} Baroque artworks from ${totalAvailable.value} available`);
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

//Baroque-themed searches
export const BAROQUE_SEARCHES = [
  'Caravaggio',
  'Rembrandt',
  'Baroque chiaroscuro',
  'Vermeer',
  'Rubens',
  'Velázquez',
  'Gentileschi',
  'Bernini'
];

export function getRandomBaroqueSearch() {
  return BAROQUE_SEARCHES[Math.floor(Math.random() * BAROQUE_SEARCHES.length)];
}

// Artwork fun facts
export function getArtworkFact(artwork) {
  const facts = [];

  if (artwork.isHighlight)
    facts.push(`This is one of the Met’s highlighted masterpieces!`);

  if (artwork.accessionYear) {
    const yearsInCollection = new Date().getFullYear() - parseInt(artwork.accessionYear);
    if (yearsInCollection > 100)
      facts.push(`This artwork has been in the Met’s collection for over ${yearsInCollection} years.`);
  }

  if (artwork.objectBeginDate < 1650)
    facts.push(`Created during the Early Baroque period, when dramatic lighting and realism reshaped art.`);

  if (artwork.artist === 'Caravaggio')
    facts.push(`Caravaggio was a fugitive when he painted many of his masterpieces.`);

  if (artwork.artist === 'Rembrandt')
    facts.push(`Rembrandt painted over 80 self-portraits, each capturing a different stage of his life.`);

  if (artwork.medium?.toLowerCase().includes('oil'))
    facts.push(`Oil paint gave Baroque artists unmatched control over light and shadow.`);

  return facts.length ? facts[Math.floor(Math.random() * facts.length)] : null;
}
