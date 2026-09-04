<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  value?: number;
}

const props = defineProps<Props>();

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
</script>

<template>
  <section>
    <h3>Counter: {{ counter }}</h3>
    <h3>Square: {{ squareCounter }}</h3>
    <div>
      <button @click="add">+1</button>
      <button @click="subtractNumber">-1</button>
    </div>
  </section>
</template>

<style scoped>
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
</style>
