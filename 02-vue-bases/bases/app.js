const app = Vue.createApp({
  // template: `
  // <h1>Hola Mundo</h1>
  // <p>Desde app.js</p>
  // `

  methods: {
    changeQuote() {
      console.log('Hola mundo');
      this.author = 'Alejandro Oliva';
      this.capitalize();
    },
    capitalize() {
      this.quote = this.quote.toUpperCase()
    }
  },
  data() {
    return {
      quote: "I'm Batman",
      author: 'Bruce Wayne'
    }
  }
})

app.mount('#myApp')