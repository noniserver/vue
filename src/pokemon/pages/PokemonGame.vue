<script setup lang="ts">
import PokemonOptions from '@/pokemon/components/PokemonOption.vue'
import PokemonPicture from '@/pokemon/components/PokemonPicture.vue'
import { usePokemonGame } from '@/pokemon/composables/usePokemonGame'
import { GameStatus } from '@/pokemon/interfaces'

const {
  randomPokemon,
  error,
  isLoading,
  gameStatus,
  pokemonOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame()
</script>

<template>
  <section v-if="error" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">No se pudieron cargar los Pokémon</h1>
    <p>{{ error }}</p>
  </section>

  <section
    v-else-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este Pokémon?</h1>

    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(4)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
      >
        ¿Jugar de nuevo?
      </button>
    </div>

    <!-- Pokemon Picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <!-- Pokemon Options -->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />
  </section>
</template>
