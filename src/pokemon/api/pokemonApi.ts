export const pokemonApi = {
  get: async <T>(url: string): Promise<T> => {
    const baseUrl = 'https://pokeapi.co/api/v2'
    const response = await fetch(`${baseUrl}${url}`)

    if (!response.ok) {
      throw new Error(`PokéAPI respondió con HTTP ${response.status}`)
    }

    return response.json() as Promise<T>
  },
}
