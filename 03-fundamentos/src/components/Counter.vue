<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }} <sup>2</sup> = {{ counter * counter }} </p>
  <p>{{ counter }} <sup>2</sup> = {{ getSquareValue() }} </p>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }} </p>
  <!-- <button v-on:click="decrease"> -1 </button> -->
  <!-- <button v-on:click="increase"> +1 </button> -->
  <button @click="decrease"> +1 </button> <!-- new form -->
  <button @click="increase"> +1 </button> <!-- new form -->
</template>

<script>
export default {
  // props: ['title', 'start'],
  props: {
    title: String,
    start: {
      type: Number,
      default: 10,
      // required: true,
      validator(value) {
        return value > 25
      }
    }
  },
  name: "Counter",
  data() {
    return {
      counter: 6
    }
  },
  methods: {
    getSquareValue() {
      console.log('getSquareValue')
      return this.counter * this.counter
    },
    decrease() {
      this.counter = this.counter - 1
    },
    increase() {
      this.counter = this.counter + 1
    }
  },
  computed: {
    squareCounter() {
      console.log('squareCounter')
      return this.counter * this.counter
    },
    customTitle() {
      return this.title ? this.title : 'Counter'
    }
  }
}
</script>

<style>
</style>