<!-- <script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  value?: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
});

const counter = ref(props.value);

/**
 * 💡 ¿Qué hace computed()?
 *
 * 1. Reactividad Inteligente: Escucha los cambios de las variables reactivas que usa adentro
 *    (en este caso, 'counter.value'). Si 'counter' cambia, 'squareCounter' se recalcula solo.
 *
 * 2. Memoria Caché (Rendimiento): Si 'counter' NO cambia, Vue no vuelve a hacer la multiplicación.
 *    Devuelve el último resultado guardado en memoria. Esto ahorra procesador si la operación es compleja.
 *
 * 3. Solo Lectura: Por defecto, las propiedades computadas no se pueden modificar directamente
 *    (no puedes hacer 'squareCounter.value = 10'). Solo cambian si cambia su origen.
 */
const squareCounter = computed(() => counter.value * counter.value);

function add() {
  if (counter.value === 0) {
    return;
  }
  counter.value += 1;
}

function subtractNumber() {
  if (counter.value === 0) {
    return;
  }
  counter.value -= 1;
}
</script> -->

<script setup lang="ts">
import { useCounter } from '../composables/useCounter';

interface Props {
  value?: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
});

const { counter, squareCounter, add, subtractNumber } = useCounter(props.value);
</script>

<template>
  <section
    class="max-w-xs mx-auto my-12 p-8 bg-zinc-900 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center text-white"
  >
    <div class="mb-6 space-y-1">
      <p class="text-xs uppercase tracking-widest text-zinc-400 font-bold">
        Total
      </p>
      <h3 class="text-5xl font-black text-lime-400 tracking-tight">
        {{ counter }}
      </h3>
    </div>

    <div
      class="inline-block bg-zinc-800 px-4 py-1.5 rounded-full border border-zinc-700 mb-8"
    >
      <h3 class="text-xs font-semibold text-zinc-300">
        Square:
        <span class="text-white font-mono font-bold">{{ squareCounter }}</span>
      </h3>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        @click="add"
        class="py-4 bg-lime-400 hover:bg-lime-300 text-black font-black text-xl rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
      >
        +1
      </button>
      <button
        @click="subtractNumber"
        class="py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xl rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
      >
        -1
      </button>
    </div>
  </section>
</template>

<!-- <style scoped>
h1 {
  color: blueviolet;
}

h3 {
  color: #dadfdf;
  margin: 0 0 10px 0;
}

section {
  background-color: brown;
  width: 150px;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}
</style> -->
