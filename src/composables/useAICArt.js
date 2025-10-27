import { ref, onMounted, watch } from 'vue'

export function useAICArt(query = 'baroque') {
  const artworksData = ref([])
  const loading = ref(true)
  const error = ref(null)

  async function fetchArtworks() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,artist_display,date_display,image_id`)
      const data = await response.json()
      artworksData.value = data.data
    } catch (error) {
          error.value = 'Failed to fetch artworks.'
    } finally {
          loading.value = false
    }
  }
  onMounted(fetchArtworks)

  watch(() => query, fetchArtworks)

  return {
    artworksData,
    loading,
    error,
    fetchArtworks
  }
}
