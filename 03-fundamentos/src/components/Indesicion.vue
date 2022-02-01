<template>
  <img v-if="img" :src="img" alt="img not found" />
  <div class="bg-dark"></div>

  <div class="indecision-container">
    <input type="text" placeholder="Ask me a question" v-model="question"/>
    <p>Remember finish your question with interrogative sign (?)</p>

    <div v-if="isValidateQuestion">
      <h2>{{ question }} </h2>
      <h1>{{ answer }}</h1>
      <!-- <h1>{{ answer === 'yes' ? 'Si' : 'No!' }}</h1> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Indecision",
  data() {
    return {
      question: '',
      answer: '',
      img: '',
      isValidateQuestion: false
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'thinking'

      const { answer, image } = await fetch("https://yesno.wtf/api").then(res => res.json())

      this.answer = answer
      // this.answer = answer === 'yes' ? 'Si' : 'No!'
      this.img = image
    }
  },
  watch: {
    question(newValue, oldValue) {
      this.isValidateQuestion = false

      if(!newValue.includes('?')) return

      this.isValidateQuestion = true

      this.getAnswer()
    }
  }
};
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  /* margin-top: 0px; */
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}</style
>>
