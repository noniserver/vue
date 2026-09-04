const { createApp, ref } = Vue;

createApp({
  template: `
    <h3>{{ message }}</h3>
    <blockquote>- {{ quote }}</blockquote>
    <button @click="changeQuote">Cambiar frase</button>
  `,
  setup() {
    const message = ref("I'm Batman");
    const quote = ref("Batman");

    function changeQuote() {
      message.value = "Wiwi";
      quote.value = "Wiliwonka";
    }

    return {
      message,
      quote,
      changeQuote,
    };
  },
}).mount("#app");
