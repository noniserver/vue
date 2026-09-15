import { computed, onMounted, ref } from 'vue'
import {
  GameStatus,
  type Pokemon,
  type PokemonListResponse,
  type Result,
} from '@/pokemon/interfaces'
import { pokemonApi } from '../api/pokemonApi'
import confetti from 'canvas-confetti'

export const usePokemonGame = () => {
  // Estado actual de la partida: jugando, ganada o perdida.
  const gameStatus = ref<GameStatus>(GameStatus.Playing)

  // Lista de Pokémon pendientes de utilizar en las siguientes rondas.
  const pokemons = ref<Pokemon[]>([])

  // Opciones que se muestran en la ronda actual.
  const pokemonOptions = ref<Pokemon[]>([])

  // Mensaje de error cuando la API no responde correctamente.
  const error = ref<string | null>(null)

  // El Pokémon que el usuario debe identificar en la ronda actual.
  // Se selecciona una opción aleatoria de las cuatro disponibles.
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length)
    return pokemonOptions.value[randomIndex] ?? { id: 0, name: '' }
  })

  // Mientras no haya Pokémon cargados, la vista muestra el estado de carga.
  const isLoading = computed(() => pokemons.value.length === 0)

  // Obtiene los primeros 151 Pokémon desde PokéAPI y los transforma
  // al formato reducido que necesita el juego: nombre e identificador.
  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/pokemon?limit=151')

    const results = response.results ?? []

    // Una respuesta vacía no permite iniciar una partida.
    if (results.length === 0) {
      throw new Error('PokéAPI no devolvió ningún Pokémon.')
    }

    const pokemonsArray = results.map((pokemon: Result) => {
      const urlParts = pokemon.url.split('/')
      const id = urlParts.at(-2) ?? 0
      return {
        name: pokemon.name,
        id: +id,
      }
    })

    // Mezclamos la lista para que las rondas sean diferentes en cada partida.
    return pokemonsArray.sort(() => Math.random() - 0.5)
  }

  // Crea una nueva ronda tomando opciones de la lista pendiente.
  // Por defecto, cada ronda tiene cuatro opciones.
  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing
    pokemonOptions.value = pokemons.value.slice(0, howMany)
    pokemons.value = pokemons.value.slice(howMany)
  }

  // Comprueba si la opción seleccionada coincide con el Pokémon correcto.
  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id

    if (hasWon) {
      gameStatus.value = GameStatus.Won

      // Efecto visual cuando el jugador acierta.
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      })
      return
    }

    gameStatus.value = GameStatus.Lost
  }

  // onMounted se ejecuta cuando el componente ya está montado.
  // Aquí cargamos los Pokémon y comenzamos la primera ronda.
  onMounted(async () => {
    try {
      pokemons.value = await getPokemons()
      getNextRound()
    } catch (exception) {
      error.value =
        exception instanceof Error ? exception.message : 'No se pudieron cargar los Pokémon.'
      console.error(error.value)
    }
  })

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    error,

    // Methods
    getNextRound,
    checkAnswer,
  }
}
