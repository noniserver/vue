import { ref, computed } from "vue";

export function useCounter(initialValue = 0) {
  const counter = ref(initialValue);

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
    counter.value += 1;
  }

  function subtractNumber() {
    if (counter.value === 0) {
      return;
    }
    counter.value -= 1;
  }
  // 4. Expones lo que los componentes van a necesitar
  return {
    counter,
    squareCounter,
    add,
    subtractNumber,
  };
}
