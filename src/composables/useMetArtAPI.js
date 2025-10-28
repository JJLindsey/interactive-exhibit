import { ref, onMounted } from 'vue';


export function useMetArtAPI() {
  const artworks = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchArtworks = async () => {
    loading.value = true;
    error.value = null;

    try {
      const searchRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&q=Caravaggio%20Baroque`
      );
      const searchData = await searchRes.json();

      if (!searchRes.ok || !searchData.objectIDs?.length) {
        artworks.value = [];
        return;
      }

      const firstIDs = searchData.objectIDs.slice(0, 20);

      const artworksData = await Promise.all(
        firstIDs.map(async (id) => {
          try {
            const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
            if (!res.ok) throw new Error(`Object ${id} not found`);
            return res.json();
          } catch (err) {
            console.warn(err.message);
            return null;
          }
        })
      );

      // Filter Baroque oil paintings
  artworks.value = artworksData
  // .filter(item =>
  //   item.objectBeginDate >= 1600 &&
  //   item.objectEndDate <= 1750 &&
  //   item.primaryImageSmall
  // )
  .map(item => ({
    id: item.objectID,
    title: item.title || 'Untitled',
    artist: item.artistDisplayName || 'Unknown Artist',
    date: item.objectDate || `${item.objectBeginDate}–${item.objectEndDate}`,
    image: item.primaryImageSmall,
    medium: item.medium,
  }));
  console.log('All fetched artworks:', artworksData.map(a => ({
  id: a.objectID,
  period: a.period,
  medium: a.medium,
  title: a.title,
  artist: a.artistDisplayName,
  date: a.objectDate,
  classification: a.classification
})));
    } catch (err) {
      console.error(err);
      error.value = 'Failed to load artworks.';
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchArtworks);

  return { artworks, loading, error };
}
